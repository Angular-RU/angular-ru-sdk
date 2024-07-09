import {MethodArgsRegistry} from '@angular-ru/cdk/runtime';
import {Fn, Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {ensureMethodArgsRegistry} from './ensure-method-args-registry';
import {META_REQUEST_PARAM} from './meta-keys.config';

export function ensureQueryParams(
    queryParams: Nullable<PlainObject>,
    originalMethod: Fn,
    args: any[],
): Nullable<PlainObject> {
    const registry: MethodArgsRegistry = ensureMethodArgsRegistry(
        originalMethod,
        META_REQUEST_PARAM,
    );

    if (registry.size > 0) {
        const newParams: PlainObject = {};

        for (const [index, value] of args.entries()) {
            const key: Nullable<string> = registry.getNameByIndex(index);

            if (isNotNil(key)) {
                newParams[key] = value;
            }
        }

        return {...newParams, ...queryParams};
    }

    return queryParams;
}
