import { Injectable } from '@angular/core';
import { Any, Fn, Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

import { WebWorkerThread } from './worker-thread';

@Injectable()
export class WebWorkerThreadService implements WebWorkerThread {
    private readonly workerFunctionToUrlMap: WeakMap<Fn, string> = new WeakMap();
    private readonly promiseToWorkerMap: WeakMap<Promise<Any>, Worker> = new WeakMap();

    private static createWorkerUrl(resolve: Fn): string {
        const resolveString: string = resolve.toString();

        const webWorkerTemplate: string = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;

        const blob: Blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });

        return URL.createObjectURL(blob);
    }

    public run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
        const url: string | undefined = this.getOrCreateWorkerUrl(workerFunction);

        return this.runUrl(url, data);
    }

    public runUrl(url: string | undefined, data?: Any): Promise<Any> {
        const worker: Worker = new Worker(url!);
        const promise: Promise<Any> = this.createPromiseForWorker(worker, data);
        const promiseCleaner: Any = this.createPromiseCleaner(promise);

        this.promiseToWorkerMap.set(promise, worker);

        promise.then(promiseCleaner).catch(promiseCleaner);

        return promise;
    }

    public terminate<T>(promise: Promise<T>): Promise<T> {
        return this.removePromise(promise);
    }

    public getWorker(promise: Promise<Any>): Nullable<Worker> {
        return this.promiseToWorkerMap.get(promise);
    }

    private createPromiseForWorker<T>(worker: Worker, data: Any): Promise<T> {
        return new Promise<T>((resolve: Fn, reject: Fn): void => {
            worker.addEventListener('message', (event: MessageEvent): boolean => resolve(event.data));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        });
    }

    private getOrCreateWorkerUrl(fn: Fn): string | undefined {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            const url: string = WebWorkerThreadService.createWorkerUrl(fn);

            this.workerFunctionToUrlMap.set(fn, url);

            return url;
        }

        return this.workerFunctionToUrlMap.get(fn);
    }

    private createPromiseCleaner<T>(promise: Promise<T>): (input: Any) => T {
        return (event: T): T => {
            this.removePromise(promise);

            return event;
        };
    }

    private removePromise<T>(promise: Promise<T>): Promise<T> {
        const worker: Nullable<Worker> = this.promiseToWorkerMap.get(promise);

        if (isNotNil(worker)) {
            worker?.terminate();
        }

        this.promiseToWorkerMap.delete(promise);

        return promise;
    }
}
