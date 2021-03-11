import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

export function checkEveryValueIsEmpty(...values: Any[]): boolean {
    return values.every(checkValueIsEmpty);
}
