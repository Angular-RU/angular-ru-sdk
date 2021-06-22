import { Any, Nullable } from '@angular-ru/common/typings';

export interface WebWorkerThread<R = Any, U = Any> {
    run<T>(workerFunction: (input: R) => T, data?: Any): Promise<T>;
    runUrl(url: string, data?: R): Promise<U>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<Any>): Nullable<Worker>;
}
