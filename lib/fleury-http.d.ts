import { IFleuryHttp, IFleuryHttpConnector } from './interfaces/ifleury-http';
import { OauthService } from './features/oauth/oauth-service';
import { InterceptorService } from './features/interceptors/interceptor-service';
import { FleuryHttpEvents } from './features/events/fleury-http-events';
export declare class FleuryHttp {
    private config;
    fleuryHttpEvents: FleuryHttpEvents;
    private httpClientService;
    private storageService;
    oauthService: OauthService;
    interceptorService: InterceptorService;
    constructor(config: IFleuryHttp);
}
export declare class FleuryHttpFactory {
    static createFleuryHttp(config: IFleuryHttp): IFleuryHttpConnector;
}
