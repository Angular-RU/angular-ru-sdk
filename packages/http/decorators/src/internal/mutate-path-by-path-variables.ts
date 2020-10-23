import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn } from '@angular-ru/common/typings';
import { ensurePathByPathVariables } from '@angular-ru/http/utils';

import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { META_PATH_VARIABLE } from './meta-keys.config';

export function mutatePathByPathVariables(path: string, originalMethod: Fn, args: Any[]): string {
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_PATH_VARIABLE);

    if (registry.size) {
        const variableMap: Map<string, Any> = new Map();

        args.forEach((value: Any, index: number): void => {
            const key: string | null = registry.getNameByIndex(index);
            if (key) {
                variableMap.set(key, value);
            }
        });

        path = ensurePathByPathVariables(path, variableMap);
    }

    return path;
}
