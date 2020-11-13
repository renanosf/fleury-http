import { IFleuryHttp, IFleuryHttpConnector } from './interfaces/ifleury-http';
export declare class FleuryHttpFactory {
    static createFleuryHttp(config: IFleuryHttp): IFleuryHttpConnector;
}
