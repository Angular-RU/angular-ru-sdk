import {NGXS_COMPUTED_OPTION} from '@angular-ru/ngxs/tokens';

export function computedKey(): string {
    return `__${NGXS_COMPUTED_OPTION}__`;
}
