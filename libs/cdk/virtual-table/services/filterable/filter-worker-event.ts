import {Fn} from '@angular-ru/cdk/typings';

export interface FilterWorkerEvent<T> {
    source: T[];
    fireSelection: Fn;
}
