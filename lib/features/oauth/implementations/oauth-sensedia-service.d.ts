import { IOauthService } from '../interfaces/ioauth';
import { IFleuryHttp } from '../../../interfaces/ifleury-http';
import { IHttpClientService } from '../../httpClient/interfaces/ihttp-client';
export declare class OauthSensediaService implements IOauthService {
    private config;
    private http;
    private appConfig;
    constructor(config: IFleuryHttp, http: IHttpClientService);
    callGrantCode(): Promise<string>;
    callAccessToken(code: string): Promise<any>;
    callAccessTokenImplicit(): Promise<any>;
}
