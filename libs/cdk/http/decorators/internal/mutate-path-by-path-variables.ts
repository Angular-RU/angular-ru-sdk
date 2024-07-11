import {ensurePathByPathVariables} from '@angular-ru/cdk/http/utils';
import {MethodArgsRegistry} from '@angular-ru/cdk/runtime';
import {Fn, Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {ensureMethodArgsRegistry} from './ensure-method-args-registry';
import {META_PATH_VARIABLE} from './meta-keys.config';

interface MutatePathByPathVariablesOptions {
    path: string;
    originalMethod: Fn;
    args: any[];
    pathVariables: Nullable<PlainObject>;
}

// eslint-disable-next-line max-lines-per-function
export function mutatePathByPathVariables(
    options: MutatePathByPathVariablesOptions,
): string {
    const {originalMethod, args, path, pathVariables}: MutatePathByPathVariablesOptions =
        options;
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(
        originalMethod,
        META_PATH_VARIABLE,
    );
    const definedVariables: PlainObject = pathVariables ?? {};
    const variableMap = new Map<string, any>();

    mutateMapByMethodArgsRegistry(variableMap, args, registry);
    mutateMapByDefinedVariables(variableMap, definedVariables);

    let interpolationPath: string = path.toString(); // copy without mutation

    if (variableMap.size > 0) {
        interpolationPath = ensurePathByPathVariables(interpolationPath, variableMap);
    }

    return interpolationPath;
}

function mutateMapByMethodArgsRegistry(
    variableMap: Map<string, any>,
    args: any[],
    registry: MethodArgsRegistry,
): void {
    if (registry.size > 0) {
        for (const [index, value] of args.entries()) {
            const key: Nullable<string> = registry.getNameByIndex(index);

            if (isNotNil(key)) {
                variableMap.set(key, value);
            }
        }
    }
}

function mutateMapByDefinedVariables(
    variableMap: Map<string, any>,
    definedVariables: PlainObject,
): void {
    if (Object.keys(definedVariables).length > 0) {
        for (const key in definedVariables) {
            if (definedVariables.hasOwnProperty(key)) {
                const value: any = definedVariables[key];

                variableMap.set(key, value);
            }
        }
    }
}
