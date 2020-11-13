import { IOauth } from '../features/oauth/interfaces/ioauth';
import { StorageType } from '../features/storage/interfaces/istorage';
import { AxiosInstance } from 'axios';
import { IFleuryHttpEvents } from '../features/events/fleury-http-events';
export declare enum InstanceType {
    Axios = 0
}
export interface IInstance {
    type?: InstanceType;
    value: AxiosInstance;
}
export interface IFleuryHttp {
    oauth: IOauth;
    baseUrl: string;
    instances?: Array<IInstance>;
    storageType?: StorageType;
    lazyAuhtorization?: boolean;
}
export interface IFleuryHttpConnector {
    addInstance(instance: IInstance): void;
    events: IFleuryHttpEvents;
}
