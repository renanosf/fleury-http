import { __awaiter } from 'tslib';
import axios from 'axios';
import { filter, take } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

class HttpAxios {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl
        });
    }
    post(uri, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post(uri, data, {
                headers,
            });
            const fleuryResponse = {
                body: response.data,
                headers: response.headers,
                status: response.status,
                statusText: response.statusText,
            };
            return fleuryResponse;
        });
    }
}

class HttpClientFactory {
    static createHttpService(config) {
        return new HttpAxios(config.baseUrl);
    }
}

var OauthFlows;
(function (OauthFlows) {
    OauthFlows[OauthFlows["GRANT"] = 0] = "GRANT";
    OauthFlows[OauthFlows["IMPLICIT"] = 1] = "IMPLICIT";
})(OauthFlows || (OauthFlows = {}));

const extractCode = (key, redirectUrl) => {
    const index = redirectUrl.indexOf(key) + key.length;
    return redirectUrl.substring(index);
};

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
const toBase64 = (str) => {
    if (isBrowser())
        return btoa(str);
    else
        return new Buffer(str).toString('base64');
};

class OauthSensediaService {
    constructor(config, http) {
        this.config = config;
        this.http = http;
        this.appConfig = this.config.oauth.application;
    }
    callGrantCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post('/oauth/grant-code', {
                client_id: this.appConfig.clientId,
                redirect_uri: `${this.config.baseUrl}/oauth/access-token`,
            });
            if (response.status === 201) {
                const code = extractCode('?code=', response.body.redirect_uri);
                return code;
            }
            else {
                throw new Error('Unable to call grant');
            }
        });
    }
    callAccessToken(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `${this.appConfig.clientId}:${this.appConfig.secret}`;
            const authorization = `Basic ${toBase64(key)}`;
            const response = yield this.http.post('/oauth/access-token', {
                grant_type: 'authorization_code',
                code,
            }, {
                client_id: this.appConfig.clientId,
                Authorization: authorization,
            });
            if (response.status === 201) {
                return response.body;
            }
            else {
                throw new Error('Unable to call access token');
            }
        });
    }
    callAccessTokenImplicit() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.http.post('/oauth/access-token', {
                client_id: this.appConfig.clientId,
                grant_type: 'implicit',
                recaptcha: true,
                redirect_uri: `${this.config.baseUrl}/oauth/access-token`
            });
            if (response.status === 201) {
                response.body.access_token = extractCode('?access_token=', response.body.redirect_uri);
                return response.body;
            }
            else {
                throw new Error('Unable to call access token');
            }
        });
    }
}

class OauthService {
    constructor(config, fleuryHttpEvents, httpClientService, storageService) {
        this.config = config;
        this.fleuryHttpEvents = fleuryHttpEvents;
        this.httpClientService = httpClientService;
        this.storageService = storageService;
        this.oauthProvider = new OauthSensediaService(this.config, this.httpClientService);
        this.clientId = this.config.oauth.application.clientId;
        const token = this.storageService.get(this.clientId);
        if (token)
            this.currentToken = JSON.parse(token);
        if (this.config.lazyAuhtorization) {
            this.fleuryHttpEvents.isReady.next(true);
        }
        else {
            if (!this.currentToken)
                this.refreshToken();
            else
                this.fleuryHttpEvents.isReady.next(true);
        }
    }
    grantFlow() {
        return __awaiter(this, void 0, void 0, function* () {
            const code = yield this.oauthProvider.callGrantCode();
            const response = yield this.oauthProvider.callAccessToken(code);
            this.currentToken = {
                accessToken: response.access_token,
                expires: new Date().getTime() + (response.expires_in * OauthService.MILLISECONDS),
                refreshToken: response.refresh_token
            };
            console.log(this.currentToken);
            this.storageService.set(this.clientId, JSON.stringify(this.currentToken));
            return this.currentToken.accessToken;
        });
    }
    implicitFlow() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.oauthProvider.callAccessTokenImplicit();
            this.currentToken = {
                accessToken: response.access_token,
                expires: new Date().getTime() + (response.expires_in * OauthService.MILLISECONDS),
            };
            this.storageService.set(this.clientId, JSON.stringify(this.currentToken));
            return this.currentToken.accessToken;
        });
    }
    isTokenValid() {
        return this.currentToken ? new Date().getTime() < this.currentToken.expires : false;
    }
    getAccessToken() {
        return this.currentToken.accessToken;
    }
    getApplicationId() {
        return this.clientId;
    }
    refreshToken() {
        let promise = null;
        this.fleuryHttpEvents.isReady.next(false);
        switch (this.config.oauth.flow) {
            case OauthFlows.IMPLICIT:
                promise = this.implicitFlow();
                break;
            case OauthFlows.GRANT:
            default:
                promise = this.grantFlow();
                break;
        }
        promise.then(() => {
            this.fleuryHttpEvents.isReady.next(true);
        }).catch((err) => {
            this.fleuryHttpEvents.onError.next(err);
        });
    }
}
OauthService.MILLISECONDS = 1000;

var StorageType;
(function (StorageType) {
    StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
    StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
    StorageType[StorageType["Memory"] = 2] = "Memory";
})(StorageType || (StorageType = {}));

class StorageLocal {
    get(key) {
        return localStorage.getItem(key);
    }
    set(key, value) {
        localStorage.setItem(key, value);
    }
}

class StorageSession {
    get(key) {
        return sessionStorage.getItem(key);
    }
    set(key, value) {
        sessionStorage.setItem(key, value);
    }
}

class StorageMemory {
    constructor() {
        this.data = {};
    }
    get(key) {
        return this.data[key];
    }
    set(key, value) {
        this.data[key] = value;
    }
}

const providers = {};
class StorageFactory {
    static createStorageService(config) {
        switch (config.storageType) {
            case StorageType.Memory:
                return new StorageMemory();
            case StorageType.SessionStorage:
                return new StorageSession();
            case StorageType.LocalStorage:
            default:
                return new StorageLocal();
        }
    }
}

var InstanceType;
(function (InstanceType) {
    InstanceType[InstanceType["Axios"] = 0] = "Axios";
})(InstanceType || (InstanceType = {}));

// Se dominio eh o mesmo do gateway entao continuar interceptor
// Se nao possuir dominio incluir a url base
const verifyDomain = (req) => {
    if (req.url.indexOf("http://") == 0 || req.url.indexOf("https://") == 0) {
        return req.url.indexOf(req.baseUrl) !== -1;
    }
    else {
        return true;
    }
};
// Se nao encontra whitelabel entao continuar interceptor
const whiteLabelUris = (req) => {
    const WHITE_LIST = ['/oauth/'];
    return !WHITE_LIST.filter(uri => {
        return req.url.indexOf(uri) !== -1;
    }).length;
};
const preValidators = [
    verifyDomain,
    whiteLabelUris
];

const insertBaseUrl = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.url = req.url.indexOf(req.baseUrl) === -1 ? req.baseUrl + req.url : req.url;
        resolve(req);
    });
});
// This function refresh the token if necessary
const isTokenValid = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.fleuryHttpEvents.isReady
            .pipe(filter(value => value), take(1)).subscribe(() => {
            if (!req.oauthService.isTokenValid())
                req.oauthService.refreshToken();
            resolve(req);
        });
    });
});
// Se dominio eh o mesmo do gateway entao continuar interceptor
const insertAccessToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.fleuryHttpEvents.isReady
            .pipe(filter(value => value), take(1)).subscribe(() => {
            req.headers['access_token'] = req.oauthService.getAccessToken();
            req.headers['client_id'] = req.oauthService.getApplicationId();
            resolve(req);
        });
    });
});
const preModifiers = [
    insertBaseUrl,
    isTokenValid,
    insertAccessToken
];

const verifyResponseStatus = (res) => {
    if (res.status === 401)
        res.oauthService.refreshToken();
    return true;
};
const posValidators = [
    verifyResponseStatus
];

class AxiosInterceptor {
    constructor(config, fleuryHttpEvents, oauthService) {
        this.config = config;
        this.fleuryHttpEvents = fleuryHttpEvents;
        this.oauthService = oauthService;
    }
    requestTransformation(httpRequest) {
        const hasBaseUrl = httpRequest.url.indexOf(this.config.baseUrl);
        const addBaseUrl = hasBaseUrl === -1 ? this.config.baseUrl : '';
        return {
            baseUrl: this.config.baseUrl,
            headers: httpRequest.headers,
            url: addBaseUrl + httpRequest.url,
            body: httpRequest.data,
            fleuryHttpEvents: this.fleuryHttpEvents,
            oauthService: this.oauthService
        };
    }
    handle(instance) {
        instance.interceptors.request.use((req) => this.preValidators(req));
        instance.interceptors.response.use((req) => this.posValidators(req));
    }
    preModifiers(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let req = this.requestTransformation(httpRequest);
            for (let fn of preModifiers) {
                req = yield fn(req);
            }
            httpRequest.headers = req.headers;
            httpRequest.data = req.body;
            httpRequest.url = req.url;
            return httpRequest;
        });
    }
    preValidators(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = this.requestTransformation(httpRequest);
            const error = preValidators.find(fn => {
                return fn(req) === false;
            });
            return error ? httpRequest : this.preModifiers(httpRequest);
        });
    }
    posValidators(httpResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            posValidators.forEach((fn) => {
                fn({
                    oauthService: this.oauthService,
                    status: httpResponse.status
                });
            });
            return httpResponse;
        });
    }
}

class InterceptorService {
    constructor(config, fleuryHttpEvents, ouathService) {
        this.config = config;
        this.fleuryHttpEvents = fleuryHttpEvents;
        this.ouathService = ouathService;
        this.axiosInterceptor = new AxiosInterceptor(this.config, this.fleuryHttpEvents, this.ouathService);
        if (Array.isArray(this.config.instances))
            this.config.instances.forEach(i => this.handleInstance(i));
    }
    handleInstance(instance) {
        switch (instance.type) {
            case InstanceType.Axios:
            default:
                this.axiosInterceptor.handle(instance.value);
        }
    }
    checkIfInstanceAlreadyExists(instance) {
        const found = this.config.instances.find((i) => {
            return i.value === instance.value;
        });
        return !!found;
    }
    addInstance(instance) {
        if (!Array.isArray(this.config.instances))
            this.config.instances = [];
        if (this.checkIfInstanceAlreadyExists(instance))
            return;
        this.handleInstance(instance);
        this.config.instances.push(instance);
    }
}

class FleuryHttpEvents {
    constructor() {
        // Event to emit when Oauth fails
        this.onError = new Subject();
        // Event to know if client is ready to make request
        // Get the oauth token if ready
        this.isReady = new BehaviorSubject(false);
    }
}

class FleuryHttp {
    constructor(config) {
        this.config = config;
        this.fleuryHttpEvents = new FleuryHttpEvents();
        this.httpClientService = HttpClientFactory.createHttpService(this.config);
        this.storageService = StorageFactory.createStorageService(this.config);
        this.oauthService = new OauthService(this.config, this.fleuryHttpEvents, this.httpClientService, this.storageService);
        this.interceptorService = new InterceptorService(this.config, this.fleuryHttpEvents, this.oauthService);
    }
}
const FleuryHttpSingleton = (function () {
    let fleuryhttpConnector;
    let instance = null;
    let events;
    return function (fleuryHttp) {
        if (instance)
            return fleuryhttpConnector;
        instance = fleuryHttp;
        if (!instance)
            return null;
        events = {
            isReady: instance.fleuryHttpEvents.isReady.asObservable(),
            onError: instance.fleuryHttpEvents.onError.asObservable()
        };
        fleuryhttpConnector = {
            addInstance: (httpInstance) => {
                instance.interceptorService.addInstance(httpInstance);
            },
            events: events
        };
        return fleuryhttpConnector;
    };
})();
class FleuryHttpFactory {
    static createFleuryHttp(config) {
        if (!FleuryHttpSingleton(null)) {
            FleuryHttpSingleton(new FleuryHttp(config));
        }
        return FleuryHttpSingleton(null);
    }
}

/*
 * Public API Surface of fleury-http
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FleuryHttpFactory as FleuryHttp, InstanceType, OauthFlows, StorageType };
//# sourceMappingURL=fleury-http.js.map
