import {MethodArgsRegistry} from '@angular-ru/cdk/runtime';
import {Fn, Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

import {getMethodArgsRegistry} from './get-method-args-registry';

export function ensureMethodArgsRegistry(
    method: Fn,
    metaKey: string,
): MethodArgsRegistry {
    let registry: Nullable<MethodArgsRegistry> = getMethodArgsRegistry(method, metaKey);

    if (isNil(registry)) {
        registry = new MethodArgsRegistry();

        Object.defineProperties(method, {
            [metaKey]: {
                enumerable: true,
                configurable: true,
                value: registry,
            },
        });
    }

    return registry;
}
