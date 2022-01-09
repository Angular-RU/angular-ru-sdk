import { Any } from '@angular-ru/cdk/typings';
import { ComputedCacheMap } from '@angular-ru/ngxs/typings';

import { computedKey } from '../common/computed-key';

export function getComputedCache(target: Any): ComputedCacheMap | null {
    return target[computedKey()] ?? null;
}
