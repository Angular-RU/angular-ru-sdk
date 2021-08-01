import { ensurePathByPathVariables } from '@angular-ru/common/http/utils';
import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn, Nullable, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { META_PATH_VARIABLE } from './meta-keys.config';

interface MutatePathByPathVariablesOptions {
    path: string;
    originalMethod: Fn;
    args: Any[];
    pathVariables: Nullable<PlainObject>;
}

// eslint-disable-next-line max-lines-per-function
export function mutatePathByPathVariables(options: MutatePathByPathVariablesOptions): string {
    const { originalMethod, args, path, pathVariables }: MutatePathByPathVariablesOptions = options;
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_PATH_VARIABLE);
    const definedVariables: PlainObject = pathVariables ?? {};
    const variableMap: Map<string, Any> = new Map();

    mutateMapByMethodArgsRegistry(variableMap, args, registry);
    mutateMapByDefinedVariables(variableMap, definedVariables);

    let interpolationPath: string = path.toString(); // copy without mutation
    if (variableMap.size > 0) {
        interpolationPath = ensurePathByPathVariables(interpolationPath, variableMap);
    }

    return interpolationPath;
}

function mutateMapByMethodArgsRegistry(variableMap: Map<string, Any>, args: Any[], registry: MethodArgsRegistry): void {
    if (registry.size > 0) {
        args.forEach((value: Any, index: number): void => {
            const key: Nullable<string> = registry.getNameByIndex(index);
            if (isNotNil(key)) {
                variableMap.set(key, value);
            }
        });
    }
}

function mutateMapByDefinedVariables(variableMap: Map<string, Any>, definedVariables: PlainObject): void {
    if (Object.keys(definedVariables).length > 0) {
        for (const key in definedVariables) {
            if (definedVariables.hasOwnProperty(key)) {
                const value: Any = definedVariables[key];
                variableMap.set(key, value);
            }
        }
    }
}
