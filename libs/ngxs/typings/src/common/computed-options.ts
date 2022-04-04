import { Observable } from 'rxjs';

export interface ComputedOptions {
    sequenceId: number;
    isObservable: boolean;
    value: any | Observable<any>;
}
