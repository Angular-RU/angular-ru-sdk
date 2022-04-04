import { MethodArgsRegistry } from '@angular-ru/cdk/runtime';
import { Fn } from '@angular-ru/cdk/typings';

import { ensureMethodArgsRegistry } from './internal/ensure-method-args-registry';
import { KEY_REQUEST_BODY, META_REQUEST_BODY } from './internal/meta-keys.config';

// eslint-disable-next-line max-lines-per-function
export function RequestBody(): ParameterDecorator {
    return (target: any, methodName: string | symbol, parameterIndex: number): void => {
        const originalMethod: Fn = target?.[methodName as any];
        const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_REQUEST_BODY);

        registry.putIndexByName(KEY_REQUEST_BODY, methodName as string, parameterIndex);
    };
}
