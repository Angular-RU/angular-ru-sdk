import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn, PlainObject } from '@angular-ru/common/typings';

import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { META_REQUEST_PARAM } from './meta-keys.config';

export function mutateQueryParams(
    queryParams: PlainObject | undefined,
    originalMethod: Fn,
    args: Any[]
): PlainObject | undefined {
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_REQUEST_PARAM);

    if (registry.size) {
        const newParams: PlainObject = {};

        args.forEach((value: Any, index: number): void => {
            const key: string | null = registry.getNameByIndex(index);
            if (key) {
                newParams[key] = value;
            }
        });

        queryParams = { ...newParams, ...queryParams };
    }

    return queryParams;
}
