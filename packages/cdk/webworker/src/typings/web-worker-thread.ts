import { Any, Nullable } from '@angular-ru/cdk/typings';

import { WorkerData } from './worker-data';
import { WorkerResolver } from './worker-resolver';

export interface WebWorkerThread<K = Any, U = Any> {
    run<T>(resolver: WorkerResolver<T, K>, data: WorkerData<K>, options?: WorkerOptions): Promise<T>;

    terminate<T>(promise: Promise<T>): Promise<T>;

    getWorker(promise: Promise<Any>): Nullable<Worker>;

    runUrl(url: string, data: WorkerData<K>): Promise<U>;
}
