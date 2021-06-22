import { MethodArgsRegistry } from '@angular-ru/common/runtime';
import { Any, Fn, Nullable, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

import { ensureMethodArgsRegistry } from './ensure-method-args-registry';
import { META_REQUEST_PARAM } from './meta-keys.config';

export function ensureQueryParams(
    queryParams: Nullable<PlainObject>,
    originalMethod: Fn,
    args: Any[]
): Nullable<PlainObject> {
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(originalMethod, META_REQUEST_PARAM);

    if (registry.size) {
        const newParams: PlainObject = {};

        args.forEach((value: Any, index: number): void => {
            const key: Nullable<string> = registry.getNameByIndex(index);

            if (isNotNil(key)) {
                newParams[key] = value;
            }
        });

        return { ...newParams, ...queryParams };
    }

    return queryParams;
}
