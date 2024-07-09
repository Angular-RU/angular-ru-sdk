import {Injectable} from '@angular/core';
import {deepClone} from '@angular-ru/cdk/object';

@Injectable()
export class MockWebWorkerService {
    public run<T, K>(workerFunction: (input?: K) => T, data?: K): Promise<T> {
        return Promise.resolve(workerFunction(deepClone(data)!));
    }
}
