import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IInterceptorService } from '../interfaces/iintercetors';
import { FleuryHttpEvents } from '../../events/fleury-http-events';
import { OauthService } from '../../oauth/oauth-service';
import { IFleuryHttp } from '../../../interfaces/ifleury-http';
import { FleuryInterceptorRequest } from '../interfaces/iintercetors';
export declare class AxiosInterceptor implements IInterceptorService {
    private config;
    private fleuryHttpEvents;
    private oauthService;
    constructor(config: IFleuryHttp, fleuryHttpEvents: FleuryHttpEvents, oauthService: OauthService);
    requestTransformation(httpRequest: AxiosRequestConfig): FleuryInterceptorRequest;
    handle(instance: AxiosInstance): void;
    private preModifiers;
    private preValidators;
    private posValidators;
}
