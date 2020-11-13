export declare enum StorageType {
    LocalStorage = 0,
    SessionStorage = 1,
    Memory = 2
}
export interface IStorageService {
    get(key: string): any;
    set(key: string, value: string): void;
}
