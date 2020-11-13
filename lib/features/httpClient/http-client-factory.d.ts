import { IFleuryHttp } from '../../interfaces/ifleury-http';
import { HttpAxios } from './implementations/http-axios';
export default class HttpClientFactory {
    static createHttpService(config: IFleuryHttp): HttpAxios;
}
