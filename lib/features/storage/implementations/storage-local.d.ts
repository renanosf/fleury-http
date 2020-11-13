import { IStorageService } from '../interfaces/istorage';
export declare class StorageLocal implements IStorageService {
    get(key: string): string;
    set(key: string, value: string): void;
}
