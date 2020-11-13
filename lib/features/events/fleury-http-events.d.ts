import { BehaviorSubject, Subject, Observable } from "rxjs";
export interface IFleuryHttpEvents {
    onError: Observable<any>;
    isReady: Observable<boolean>;
}
export declare class FleuryHttpEvents {
    onError: Subject<any>;
    isReady: BehaviorSubject<boolean>;
}
