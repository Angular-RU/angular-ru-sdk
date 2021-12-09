import { Any, Descriptor } from '@angular-ru/cdk/typings';

import { WebWorkerThreadService as Thread } from './worker-thread.service';

export function WebWorker() {
    return function (_target: Any, _key: string, descriptor: Descriptor): Descriptor {
        const originalMethod: Any = descriptor.value;

        descriptor.value = async function (...args: Any[]): Promise<Any> {
            return new Thread().run(originalMethod, args);
        };

        return descriptor;
    };
}
