import { Any, Fn, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

import { WebWorkerThread } from './typings/web-worker-thread';
import { WorkerData } from './typings/worker-data';
import { WorkerResolver } from './typings/worker-resolver';
import { createWorkerUrl } from './utils/create-worker-url';

export class WorkerThread implements WebWorkerThread {
    private readonly workerFunctionToUrlMap: WeakMap<Fn, string> = new WeakMap();
    private readonly promiseToWorkerMap: WeakMap<Promise<Any>, Worker> = new WeakMap();

    public run<T, K>(worker: WorkerResolver<T, K>, input: WorkerData<K>, options?: WorkerOptions): Promise<T> {
        const url: Nullable<string> = this.getOrCreateWorkerUrl(worker);

        return this.runUrl(url!, input, options);
    }

    public terminate<T>(promise: Promise<T>): Promise<T> {
        return this.removePromise(promise);
    }

    public getWorker(promise: Promise<Any>): Nullable<Worker> {
        return this.promiseToWorkerMap.get(promise);
    }

    public runUrl(url: string, data?: Any, options?: WorkerOptions): Promise<Any> {
        const worker: Worker = new Worker(url, options);
        const promise: Promise<Any> = this.createPromiseForWorker(worker, data);
        const promiseCleaner: Any = this.createPromiseCleaner(promise);

        this.promiseToWorkerMap.set(promise, worker);

        // @note: don't use finally (because worker will be terminated before)
        promise.then(promiseCleaner).catch(promiseCleaner);

        return promise;
    }

    private createPromiseForWorker<T>(worker: Worker, data: Any): Promise<T> {
        return new Promise<T>((resolve: Fn, reject: Fn): void => {
            worker.addEventListener('message', (event: MessageEvent): boolean => resolve(event.data));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        });
    }

    private getOrCreateWorkerUrl(worker: Fn): Nullable<string> {
        if (!this.workerFunctionToUrlMap.has(worker)) {
            const url: string = createWorkerUrl(worker);

            this.workerFunctionToUrlMap.set(worker, url);

            return url;
        }

        return this.workerFunctionToUrlMap.get(worker);
    }

    private createPromiseCleaner<T>(promise: Promise<T>): (input: Any) => T {
        return (event: T): T => {
            // noinspection JSIgnoredPromiseFromCall
            this.removePromise(promise);

            return event;
        };
    }

    private removePromise<T>(promise: Promise<T>): Promise<T> {
        const worker: Nullable<Worker> = this.promiseToWorkerMap.get(promise);

        if (isNotNil(worker) as boolean) {
            worker?.terminate();
        }

        this.promiseToWorkerMap.delete(promise);

        return promise;
    }
}
