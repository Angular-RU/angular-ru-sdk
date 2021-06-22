import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Fn, Nullable } from '@angular-ru/common/typings';

import { getMethodArgsRegistry } from './get-method-args-registry';

export function ensureMethodArgsRegistry(method: Fn, metaKey: string): MethodArgsRegistry {
    let registry: Nullable<MethodArgsRegistry> = getMethodArgsRegistry(method, metaKey);

    if (!registry) {
        registry = new MethodArgsRegistry();

        Object.defineProperties(method, {
            [metaKey]: {
                enumerable: true,
                configurable: true,
                value: registry
            }
        });
    }

    return registry;
}
