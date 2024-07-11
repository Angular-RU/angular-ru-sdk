import {Injectable} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {WebWorkerThread} from './worker-thread';

@Injectable()
export class WebWorkerThreadService implements WebWorkerThread {
    private readonly workerFunctionToUrlMap = new WeakMap<Fn, string>();
    private readonly promiseToWorkerMap = new WeakMap<Promise<any>, Worker>();

    private static createWorkerUrl(resolve: Fn): string {
        const resolveString: string = resolve.toString();

        const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;

        const blob: Blob = new Blob([webWorkerTemplate], {type: 'text/javascript'});

        return URL.createObjectURL(blob);
    }

    public async run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
        const url: string | undefined = this.getOrCreateWorkerUrl(workerFunction);

        return this.runUrl(url, data);
    }

    public async runUrl(url: string | undefined, data?: any | unknown): Promise<any> {
        const worker: Worker = new Worker(url!);
        const promise: Promise<any> = this.createPromiseForWorker(worker, data);
        const promiseCleaner: any = this.createPromiseCleaner(promise);

        this.promiseToWorkerMap.set(promise, worker);

        promise.then(promiseCleaner).catch(promiseCleaner);

        return promise;
    }

    public async terminate<T>(promise: Promise<T>): Promise<T> {
        return this.removePromise(promise);
    }

    public getWorker(promise: Promise<any>): Nullable<Worker> {
        return this.promiseToWorkerMap.get(promise);
    }

    private async createPromiseForWorker<T>(worker: Worker, data: any): Promise<T> {
        return new Promise<T>((resolve: Fn, reject: Fn): void => {
            worker.addEventListener('message', (event: MessageEvent): boolean =>
                resolve(event.data),
            );
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

    private createPromiseCleaner<T>(promise: Promise<T>): (input: any) => T {
        return (event: T): T => {
            this.removePromise(promise);

            return event;
        };
    }

    private async removePromise<T>(promise: Promise<T>): Promise<T> {
        const worker: Nullable<Worker> = this.promiseToWorkerMap.get(promise);

        if (isNotNil(worker)) {
            worker?.terminate();
        }

        this.promiseToWorkerMap.delete(promise);

        return promise;
    }
}
