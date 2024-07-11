import {ComputedCacheMap} from '@angular-ru/ngxs/typings';

import {computedKey} from '../common/computed-key';

export function getComputedCache(target: any | unknown): ComputedCacheMap | null {
    return target[computedKey()] ?? null;
}
