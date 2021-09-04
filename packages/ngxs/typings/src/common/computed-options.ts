import { Any } from '@angular-ru/cdk/typings';
import { Observable } from 'rxjs';

export interface ComputedOptions {
    sequenceId: number;
    isObservable: boolean;
    value: Any | Observable<Any>;
}
