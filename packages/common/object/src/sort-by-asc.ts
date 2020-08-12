import { $any } from '@angular-ru/common/utils';

export function sortByAsc<V>(key: keyof V, a: V, b: V): number {
    if ($any(a?.[key]) > $any(b?.[key])) {
        return 1;
    } else {
        return $any(a?.[key]) < $any(b?.[key]) ? -1 : 0;
    }
}
