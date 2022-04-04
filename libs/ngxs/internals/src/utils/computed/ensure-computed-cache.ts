import { Fn } from '@angular-ru/cdk/typings';
import { isNil } from '@angular-ru/cdk/utils';
import { ComputedCacheMap, ComputedOptions } from '@angular-ru/ngxs/typings';

import { computedKey } from '../common/computed-key';
import { getComputedCache } from './get-computed-cache';

export function ensureComputedCache(target: any): ComputedCacheMap {
    const cache: ComputedCacheMap | null = getComputedCache(target);

    if (isNil(cache)) {
        Object.defineProperties(target, {
            [computedKey()]: {
                enumerable: true,
                configurable: true,
                value: new WeakMap<Fn, ComputedOptions>()
            }
        });
    }

    return getComputedCache(target)!;
}
