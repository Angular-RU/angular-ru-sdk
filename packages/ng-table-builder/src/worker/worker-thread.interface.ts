import { Any } from '../interfaces/table-builder.internal';

export interface WebWorkerThread<R = Any, U = Any> {
    run<T>(workerFunction: (input: R) => T, data?: Any): Promise<T>;
    runUrl(url: string, data?: R): Promise<U>;
    terminate<T>(promise: Promise<T>): Promise<T>;
    getWorker(promise: Promise<Any>): Worker | undefined;
}

export type Executor<T = void> = (...args: Any[]) => T;
