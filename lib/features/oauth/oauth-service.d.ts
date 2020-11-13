import { IFleuryHttp } from '../../interfaces/ifleury-http';
import { IHttpClientService } from '../httpClient/interfaces/ihttp-client';
import { IStorageService } from '../storage/interfaces/istorage';
import { FleuryHttpEvents } from '../events/fleury-http-events';
export declare class OauthService {
    private config;
    private fleuryHttpEvents;
    private httpClientService;
    private storageService;
    private oauthProvider;
    private clientId;
    private static MILLISECONDS;
    private currentToken;
    constructor(config: IFleuryHttp, fleuryHttpEvents: FleuryHttpEvents, httpClientService: IHttpClientService, storageService: IStorageService);
    private grantFlow;
    private implicitFlow;
    isTokenValid(): boolean;
    getAccessToken(): string;
    getApplicationId(): string;
    refreshToken(): void;
}
