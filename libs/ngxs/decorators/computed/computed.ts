import {Descriptor} from '@angular-ru/cdk/typings';
import {isNil, isTrue} from '@angular-ru/cdk/utils';
import {
    ensureComputedCache,
    globalSequenceId,
    itObservable,
    validateComputedMethod,
} from '@angular-ru/ngxs/internals';
import {ComputedCacheMap, ComputedOptions} from '@angular-ru/ngxs/typings';
import {Observable} from 'rxjs';

// eslint-disable-next-line max-lines-per-function
export function Computed(): MethodDecorator {
    // eslint-disable-next-line max-lines-per-function
    return (target: any, key: string | symbol, descriptor: Descriptor): Descriptor => {
        validateComputedMethod(target, key);
        const originalMethod: any = descriptor.get;

        descriptor.get = function (...args: any[]): Observable<any> | any {
            const cacheMap: ComputedCacheMap = ensureComputedCache(this);
            const cache: ComputedOptions | undefined = cacheMap?.get(originalMethod);

            if (isTrue(cache?.isObservable)) {
                return cache?.value as Observable<any>;
            }

            const invalidCache: boolean =
                isNil(cache) || cache.sequenceId !== globalSequenceId();

            if (invalidCache) {
                cacheMap.delete(originalMethod);
                const value: Observable<any> | any = originalMethod.apply(this, args);

                cacheMap.set(originalMethod, {
                    value,
                    sequenceId: globalSequenceId(),
                    isObservable: itObservable(value),
                });

                return value;
            } else {
                return cache?.value;
            }
        };

        return descriptor;
    };
}
