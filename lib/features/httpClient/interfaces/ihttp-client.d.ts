export interface FleuryHttpResponse {
    body: any;
    headers: any;
    status: number;
    statusText: string;
}
export interface IHttpClientService {
    post(uri: string, data?: any, headers?: {
        [key: string]: string;
    }): Promise<FleuryHttpResponse>;
}
