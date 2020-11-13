(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('rxjs/operators'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('fleury-http', ['exports', 'axios', 'rxjs/operators', 'rxjs'], factory) :
    (global = global || self, factory(global['fleury-http'] = {}, global.axios, global.rxjs.operators, global.rxjs));
}(this, (function (exports, axios, operators, rxjs) { 'use strict';

    axios = axios && Object.prototype.hasOwnProperty.call(axios, 'default') ? axios['default'] : axios;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var HttpAxios = /** @class */ (function () {
        function HttpAxios(baseUrl) {
            this.baseUrl = baseUrl;
            this.axiosInstance = axios.create({
                baseURL: this.baseUrl
            });
        }
        HttpAxios.prototype.post = function (uri, data, headers) {
            return __awaiter(this, void 0, void 0, function () {
                var response, fleuryResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.axiosInstance.post(uri, data, {
                                headers: headers,
                            })];
                        case 1:
                            response = _a.sent();
                            fleuryResponse = {
                                body: response.data,
                                headers: response.headers,
                                status: response.status,
                                statusText: response.statusText,
                            };
                            return [2 /*return*/, fleuryResponse];
                    }
                });
            });
        };
        return HttpAxios;
    }());

    var HttpClientFactory = /** @class */ (function () {
        function HttpClientFactory() {
        }
        HttpClientFactory.createHttpService = function (config) {
            return new HttpAxios(config.baseUrl);
        };
        return HttpClientFactory;
    }());

    (function (OauthFlows) {
        OauthFlows[OauthFlows["GRANT"] = 0] = "GRANT";
        OauthFlows[OauthFlows["IMPLICIT"] = 1] = "IMPLICIT";
    })(exports.OauthFlows || (exports.OauthFlows = {}));

    var extractCode = function (key, redirectUrl) {
        var index = redirectUrl.indexOf(key) + key.length;
        return redirectUrl.substring(index);
    };

    var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
    var toBase64 = function (str) {
        if (isBrowser())
            return btoa(str);
        else
            return new Buffer(str).toString('base64');
    };

    var OauthSensediaService = /** @class */ (function () {
        function OauthSensediaService(config, http) {
            this.config = config;
            this.http = http;
            this.appConfig = this.config.oauth.application;
        }
        OauthSensediaService.prototype.callGrantCode = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response, code;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http.post('/oauth/grant-code', {
                                client_id: this.appConfig.clientId,
                                redirect_uri: this.config.baseUrl + "/oauth/access-token",
                            })];
                        case 1:
                            response = _a.sent();
                            if (response.status === 201) {
                                code = extractCode('?code=', response.body.redirect_uri);
                                return [2 /*return*/, code];
                            }
                            else {
                                throw new Error('Unable to call grant');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        OauthSensediaService.prototype.callAccessToken = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                var key, authorization, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = this.appConfig.clientId + ":" + this.appConfig.secret;
                            authorization = "Basic " + toBase64(key);
                            return [4 /*yield*/, this.http.post('/oauth/access-token', {
                                    grant_type: 'authorization_code',
                                    code: code,
                                }, {
                                    client_id: this.appConfig.clientId,
                                    Authorization: authorization,
                                })];
                        case 1:
                            response = _a.sent();
                            if (response.status === 201) {
                                return [2 /*return*/, response.body];
                            }
                            else {
                                throw new Error('Unable to call access token');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        OauthSensediaService.prototype.callAccessTokenImplicit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.http.post('/oauth/access-token', {
                                client_id: this.appConfig.clientId,
                                grant_type: 'implicit',
                                recaptcha: true,
                                redirect_uri: this.config.baseUrl + "/oauth/access-token"
                            })];
                        case 1:
                            response = _a.sent();
                            if (response.status === 201) {
                                response.body.access_token = extractCode('?access_token=', response.body.redirect_uri);
                                return [2 /*return*/, response.body];
                            }
                            else {
                                throw new Error('Unable to call access token');
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return OauthSensediaService;
    }());

    var OauthService = /** @class */ (function () {
        function OauthService(config, fleuryHttpEvents, httpClientService, storageService) {
            this.config = config;
            this.fleuryHttpEvents = fleuryHttpEvents;
            this.httpClientService = httpClientService;
            this.storageService = storageService;
            this.oauthProvider = new OauthSensediaService(this.config, this.httpClientService);
            this.clientId = this.config.oauth.application.clientId;
            var token = this.storageService.get(this.clientId);
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
        OauthService.prototype.grantFlow = function () {
            return __awaiter(this, void 0, void 0, function () {
                var code, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.oauthProvider.callGrantCode()];
                        case 1:
                            code = _a.sent();
                            return [4 /*yield*/, this.oauthProvider.callAccessToken(code)];
                        case 2:
                            response = _a.sent();
                            this.currentToken = {
                                accessToken: response.access_token,
                                expires: new Date().getTime() + (response.expires_in * OauthService.MILLISECONDS),
                                refreshToken: response.refresh_token
                            };
                            console.log(this.currentToken);
                            this.storageService.set(this.clientId, JSON.stringify(this.currentToken));
                            return [2 /*return*/, this.currentToken.accessToken];
                    }
                });
            });
        };
        OauthService.prototype.implicitFlow = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.oauthProvider.callAccessTokenImplicit()];
                        case 1:
                            response = _a.sent();
                            this.currentToken = {
                                accessToken: response.access_token,
                                expires: new Date().getTime() + (response.expires_in * OauthService.MILLISECONDS),
                            };
                            this.storageService.set(this.clientId, JSON.stringify(this.currentToken));
                            return [2 /*return*/, this.currentToken.accessToken];
                    }
                });
            });
        };
        OauthService.prototype.isTokenValid = function () {
            return this.currentToken ? new Date().getTime() < this.currentToken.expires : false;
        };
        OauthService.prototype.getAccessToken = function () {
            return this.currentToken.accessToken;
        };
        OauthService.prototype.getApplicationId = function () {
            return this.clientId;
        };
        OauthService.prototype.refreshToken = function () {
            var _this = this;
            var promise = null;
            this.fleuryHttpEvents.isReady.next(false);
            switch (this.config.oauth.flow) {
                case exports.OauthFlows.IMPLICIT:
                    promise = this.implicitFlow();
                    break;
                case exports.OauthFlows.GRANT:
                default:
                    promise = this.grantFlow();
                    break;
            }
            promise.then(function () {
                _this.fleuryHttpEvents.isReady.next(true);
            }).catch(function (err) {
                _this.fleuryHttpEvents.onError.next(err);
            });
        };
        return OauthService;
    }());
    OauthService.MILLISECONDS = 1000;

    (function (StorageType) {
        StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
        StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
        StorageType[StorageType["Memory"] = 2] = "Memory";
    })(exports.StorageType || (exports.StorageType = {}));

    var StorageLocal = /** @class */ (function () {
        function StorageLocal() {
        }
        StorageLocal.prototype.get = function (key) {
            return localStorage.getItem(key);
        };
        StorageLocal.prototype.set = function (key, value) {
            localStorage.setItem(key, value);
        };
        return StorageLocal;
    }());

    var StorageSession = /** @class */ (function () {
        function StorageSession() {
        }
        StorageSession.prototype.get = function (key) {
            return sessionStorage.getItem(key);
        };
        StorageSession.prototype.set = function (key, value) {
            sessionStorage.setItem(key, value);
        };
        return StorageSession;
    }());

    var StorageMemory = /** @class */ (function () {
        function StorageMemory() {
            this.data = {};
        }
        StorageMemory.prototype.get = function (key) {
            return this.data[key];
        };
        StorageMemory.prototype.set = function (key, value) {
            this.data[key] = value;
        };
        return StorageMemory;
    }());

    var providers = {};
    var StorageFactory = /** @class */ (function () {
        function StorageFactory() {
        }
        StorageFactory.createStorageService = function (config) {
            switch (config.storageType) {
                case exports.StorageType.Memory:
                    return new StorageMemory();
                case exports.StorageType.SessionStorage:
                    return new StorageSession();
                case exports.StorageType.LocalStorage:
                default:
                    return new StorageLocal();
            }
        };
        return StorageFactory;
    }());

    (function (InstanceType) {
        InstanceType[InstanceType["Axios"] = 0] = "Axios";
    })(exports.InstanceType || (exports.InstanceType = {}));

    // Se dominio eh o mesmo do gateway entao continuar interceptor
    // Se nao possuir dominio incluir a url base
    var verifyDomain = function (req) {
        if (req.url.indexOf("http://") == 0 || req.url.indexOf("https://") == 0) {
            return req.url.indexOf(req.baseUrl) !== -1;
        }
        else {
            return true;
        }
    };
    // Se nao encontra whitelabel entao continuar interceptor
    var whiteLabelUris = function (req) {
        var WHITE_LIST = ['/oauth/'];
        return !WHITE_LIST.filter(function (uri) {
            return req.url.indexOf(uri) !== -1;
        }).length;
    };
    var preValidators = [
        verifyDomain,
        whiteLabelUris
    ];

    var insertBaseUrl = function (req) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    req.url = req.url.indexOf(req.baseUrl) === -1 ? req.baseUrl + req.url : req.url;
                    resolve(req);
                })];
        });
    }); };
    // This function refresh the token if necessary
    var isTokenValid = function (req) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    req.fleuryHttpEvents.isReady
                        .pipe(operators.filter(function (value) { return value; }), operators.take(1)).subscribe(function () {
                        if (!req.oauthService.isTokenValid())
                            req.oauthService.refreshToken();
                        resolve(req);
                    });
                })];
        });
    }); };
    // Se dominio eh o mesmo do gateway entao continuar interceptor
    var insertAccessToken = function (req) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    req.fleuryHttpEvents.isReady
                        .pipe(operators.filter(function (value) { return value; }), operators.take(1)).subscribe(function () {
                        req.headers['access_token'] = req.oauthService.getAccessToken();
                        req.headers['client_id'] = req.oauthService.getApplicationId();
                        resolve(req);
                    });
                })];
        });
    }); };
    var preModifiers = [
        insertBaseUrl,
        isTokenValid,
        insertAccessToken
    ];

    var verifyResponseStatus = function (res) {
        if (res.status === 401)
            res.oauthService.refreshToken();
        return true;
    };
    var posValidators = [
        verifyResponseStatus
    ];

    var AxiosInterceptor = /** @class */ (function () {
        function AxiosInterceptor(config, fleuryHttpEvents, oauthService) {
            this.config = config;
            this.fleuryHttpEvents = fleuryHttpEvents;
            this.oauthService = oauthService;
        }
        AxiosInterceptor.prototype.requestTransformation = function (httpRequest) {
            var hasBaseUrl = httpRequest.url.indexOf(this.config.baseUrl);
            var addBaseUrl = hasBaseUrl === -1 ? this.config.baseUrl : '';
            return {
                baseUrl: this.config.baseUrl,
                headers: httpRequest.headers,
                url: addBaseUrl + httpRequest.url,
                body: httpRequest.data,
                fleuryHttpEvents: this.fleuryHttpEvents,
                oauthService: this.oauthService
            };
        };
        AxiosInterceptor.prototype.handle = function (instance) {
            var _this = this;
            instance.interceptors.request.use(function (req) { return _this.preValidators(req); });
            instance.interceptors.response.use(function (req) { return _this.posValidators(req); });
        };
        AxiosInterceptor.prototype.preModifiers = function (httpRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var req, preModifiers_1, preModifiers_1_1, fn, e_1_1;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            req = this.requestTransformation(httpRequest);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            preModifiers_1 = __values(preModifiers), preModifiers_1_1 = preModifiers_1.next();
                            _b.label = 2;
                        case 2:
                            if (!!preModifiers_1_1.done) return [3 /*break*/, 5];
                            fn = preModifiers_1_1.value;
                            return [4 /*yield*/, fn(req)];
                        case 3:
                            req = _b.sent();
                            _b.label = 4;
                        case 4:
                            preModifiers_1_1 = preModifiers_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (preModifiers_1_1 && !preModifiers_1_1.done && (_a = preModifiers_1.return)) _a.call(preModifiers_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            httpRequest.headers = req.headers;
                            httpRequest.data = req.body;
                            httpRequest.url = req.url;
                            return [2 /*return*/, httpRequest];
                    }
                });
            });
        };
        AxiosInterceptor.prototype.preValidators = function (httpRequest) {
            return __awaiter(this, void 0, void 0, function () {
                var req, error;
                return __generator(this, function (_a) {
                    req = this.requestTransformation(httpRequest);
                    error = preValidators.find(function (fn) {
                        return fn(req) === false;
                    });
                    return [2 /*return*/, error ? httpRequest : this.preModifiers(httpRequest)];
                });
            });
        };
        AxiosInterceptor.prototype.posValidators = function (httpResponse) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    posValidators.forEach(function (fn) {
                        fn({
                            oauthService: _this.oauthService,
                            status: httpResponse.status
                        });
                    });
                    return [2 /*return*/, httpResponse];
                });
            });
        };
        return AxiosInterceptor;
    }());

    var InterceptorService = /** @class */ (function () {
        function InterceptorService(config, fleuryHttpEvents, ouathService) {
            var _this = this;
            this.config = config;
            this.fleuryHttpEvents = fleuryHttpEvents;
            this.ouathService = ouathService;
            this.axiosInterceptor = new AxiosInterceptor(this.config, this.fleuryHttpEvents, this.ouathService);
            if (Array.isArray(this.config.instances))
                this.config.instances.forEach(function (i) { return _this.handleInstance(i); });
        }
        InterceptorService.prototype.handleInstance = function (instance) {
            switch (instance.type) {
                case exports.InstanceType.Axios:
                default:
                    this.axiosInterceptor.handle(instance.value);
            }
        };
        InterceptorService.prototype.checkIfInstanceAlreadyExists = function (instance) {
            var found = this.config.instances.find(function (i) {
                return i.value === instance.value;
            });
            return !!found;
        };
        InterceptorService.prototype.addInstance = function (instance) {
            if (!Array.isArray(this.config.instances))
                this.config.instances = [];
            if (this.checkIfInstanceAlreadyExists(instance))
                return;
            this.handleInstance(instance);
            this.config.instances.push(instance);
        };
        return InterceptorService;
    }());

    var FleuryHttpEvents = /** @class */ (function () {
        function FleuryHttpEvents() {
            // Event to emit when Oauth fails
            this.onError = new rxjs.Subject();
            // Event to know if client is ready to make request
            // Get the oauth token if ready
            this.isReady = new rxjs.BehaviorSubject(false);
        }
        return FleuryHttpEvents;
    }());

    var FleuryHttp = /** @class */ (function () {
        function FleuryHttp(config) {
            this.config = config;
            this.fleuryHttpEvents = new FleuryHttpEvents();
            this.httpClientService = HttpClientFactory.createHttpService(this.config);
            this.storageService = StorageFactory.createStorageService(this.config);
            this.oauthService = new OauthService(this.config, this.fleuryHttpEvents, this.httpClientService, this.storageService);
            this.interceptorService = new InterceptorService(this.config, this.fleuryHttpEvents, this.oauthService);
        }
        return FleuryHttp;
    }());
    var FleuryHttpSingleton = (function () {
        var fleuryhttpConnector;
        var instance = null;
        var events;
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
                addInstance: function (httpInstance) {
                    instance.interceptorService.addInstance(httpInstance);
                },
                events: events
            };
            return fleuryhttpConnector;
        };
    })();
    var FleuryHttpFactory = /** @class */ (function () {
        function FleuryHttpFactory() {
        }
        FleuryHttpFactory.createFleuryHttp = function (config) {
            if (!FleuryHttpSingleton(null)) {
                FleuryHttpSingleton(new FleuryHttp(config));
            }
            return FleuryHttpSingleton(null);
        };
        return FleuryHttpFactory;
    }());

    /*
     * Public API Surface of fleury-http
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.FleuryHttp = FleuryHttpFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=fleury-http.umd.js.map
