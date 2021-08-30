import { Fn } from '@angular-ru/common/typings';

export interface FilterWorkerEvent<T> {
    source: T[];
    fireSelection: Fn;
}
