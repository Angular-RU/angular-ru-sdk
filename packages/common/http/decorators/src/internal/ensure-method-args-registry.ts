import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Fn, Nullable } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

import { getMethodArgsRegistry } from './get-method-args-registry';

export function ensureMethodArgsRegistry(method: Fn, metaKey: string): MethodArgsRegistry {
    let registry: Nullable<MethodArgsRegistry> = getMethodArgsRegistry(method, metaKey);

    if (isNil(registry)) {
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
