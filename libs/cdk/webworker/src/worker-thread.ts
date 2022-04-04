import { Nullable } from '@angular-ru/cdk/typings';

export interface WebWorkerThread<R = any, U = any> {
    run<T>(workerFunction: (input: R) => T, data?: any): Promise<T>;
    runUrl(url: string, data?: R): Promise<U>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<any>): Nullable<Worker>;
}
