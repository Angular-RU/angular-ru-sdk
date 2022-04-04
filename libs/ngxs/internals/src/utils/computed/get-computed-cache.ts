import { ComputedCacheMap } from '@angular-ru/ngxs/typings';

import { computedKey } from '../common/computed-key';

export function getComputedCache(target: unknown | any): ComputedCacheMap | null {
    return target[computedKey()] ?? null;
}
