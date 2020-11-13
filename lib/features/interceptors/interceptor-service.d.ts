import { IFleuryHttp, IInstance } from '../../interfaces/ifleury-http';
import { FleuryHttpEvents } from '../events/fleury-http-events';
import { OauthService } from '../oauth/oauth-service';
export declare class InterceptorService {
    private config;
    private fleuryHttpEvents;
    private ouathService;
    private axiosInterceptor;
    constructor(config: IFleuryHttp, fleuryHttpEvents: FleuryHttpEvents, ouathService: OauthService);
    private handleInstance;
    private checkIfInstanceAlreadyExists;
    addInstance(instance: IInstance): void;
}
