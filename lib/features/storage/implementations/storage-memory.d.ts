import { IStorageService } from '../interfaces/istorage';
export declare class StorageMemory implements IStorageService {
    private data;
    get(key: string): any;
    set(key: string, value: string): void;
}
