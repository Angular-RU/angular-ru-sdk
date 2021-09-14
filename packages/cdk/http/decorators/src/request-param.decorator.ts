import { MethodArgsRegistry } from '@angular-ru/cdk/runtime';
import { Any, Fn } from '@angular-ru/cdk/typings';

import { ensureMethodArgsRegistry } from './internal/ensure-method-args-registry';
import { META_REQUEST_PARAM } from './internal/meta-keys.config';

// eslint-disable-next-line max-lines-per-function
export function RequestParam(name: string): ParameterDecorator {
    return (target: Any, methodName: string | symbol, parameterIndex: number): void => {
        const key: string = name.trim();

        if (!key) {
            throw new Error(`@RequestParam name should be initialized`);
        }

        const originalMethod: Fn = (target as Any)?.[methodName as Any];
        const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_REQUEST_PARAM);

        registry.putIndexByName(key, methodName as string, parameterIndex);
    };
}
