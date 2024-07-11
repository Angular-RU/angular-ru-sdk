import {$any} from '@angular-ru/cdk/utils';

export function sortByAsc<V>(key: keyof V, a: V, b: V): number {
    if ($any(a?.[key]) > $any(b?.[key])) {
        return 1;
    }

    return $any(a?.[key]) < $any(b?.[key]) ? -1 : 0;
}
