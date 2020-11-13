import { IHttpClientService, FleuryHttpResponse } from '../interfaces/ihttp-client';
export declare class HttpAxios implements IHttpClientService {
    private baseUrl;
    private axiosInstance;
    constructor(baseUrl: string);
    post(uri: string, data?: any, headers?: {
        [key: string]: string;
    }): Promise<FleuryHttpResponse>;
}
