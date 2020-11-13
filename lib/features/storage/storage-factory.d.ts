import { IFleuryHttp } from '../../interfaces/ifleury-http';
import { IStorageService } from './interfaces/istorage';
export declare class StorageFactory {
    static createStorageService(config: IFleuryHttp): IStorageService;
}
