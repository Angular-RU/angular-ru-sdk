import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn, Nullable } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { ensurePathByPathVariables } from '@angular-ru/http/utils';

import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { META_PATH_VARIABLE } from './meta-keys.config';

export function mutatePathByPathVariables(path: string, originalMethod: Fn, args: Any[]): string {
    let interpolationPath: string = path.toString();
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_PATH_VARIABLE);

    if (registry.size) {
        const variableMap: Map<string, Any> = new Map();

        args.forEach((value: Any, index: number): void => {
            const key: Nullable<string> = registry.getNameByIndex(index);

            if (isNotNil(key)) {
                variableMap.set(key, value);
            }
        });

        interpolationPath = ensurePathByPathVariables(interpolationPath, variableMap);
    }

    return interpolationPath;
}
