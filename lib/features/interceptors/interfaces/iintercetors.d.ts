import { OauthService } from '../../oauth/oauth-service';
import { FleuryHttpEvents } from '../../events/fleury-http-events';
import { AxiosInstance } from 'axios';
export interface IInterceptorService {
    handle(instace: AxiosInstance): void;
}
export interface FleuryInterceptorRequest {
    baseUrl: string;
    url: string;
    body: any;
    headers: {
        [key: string]: string;
    };
    oauthService: OauthService;
    fleuryHttpEvents: FleuryHttpEvents;
}
export interface FleuryInterceptorResponse {
    status: number;
    oauthService: OauthService;
}
