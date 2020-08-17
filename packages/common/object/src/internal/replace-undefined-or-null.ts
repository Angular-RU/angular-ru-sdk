import { checkValueIsEmpty } from '@angular-ru/common/utils';

export function replaceUndefinedOrNull(_: string, value: unknown): unknown {
    return checkValueIsEmpty(value) ? undefined : value;
}
