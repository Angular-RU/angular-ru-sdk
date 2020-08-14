import { Any } from '@angular-ru/common/typings';

export function checkValueIsEmpty(value: Any): boolean {
    const val: string = typeof value === 'string' ? value.trim() : value;
    return [undefined, null, NaN, '', 'null', Infinity].includes(val);
}
