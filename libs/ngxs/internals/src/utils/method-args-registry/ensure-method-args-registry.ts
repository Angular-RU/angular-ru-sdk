import { Fn } from '@angular-ru/cdk/typings';
import { isNil } from '@angular-ru/cdk/utils';
import { NGXS_ARGUMENT_REGISTRY_META } from '@angular-ru/ngxs/tokens';

import { getMethodArgsRegistry } from './get-method-args-registry';
import { MethodArgsRegistry } from './method-args-registry';

export function ensureMethodArgsRegistry(target: any, propertyKey: any): MethodArgsRegistry {
    const originMethod: Fn = target[propertyKey];
    const registry: MethodArgsRegistry | undefined = getMethodArgsRegistry(originMethod);

    if (isNil(registry)) {
        Object.defineProperties(originMethod, {
            [NGXS_ARGUMENT_REGISTRY_META]: {
                enumerable: true,
                configurable: true,
                value: new MethodArgsRegistry()
            }
        });
    }

    return getMethodArgsRegistry(originMethod)!;
}
