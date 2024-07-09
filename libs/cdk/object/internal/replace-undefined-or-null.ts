import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

export function replaceUndefinedOrNull(_: string, value: unknown): unknown {
    return checkValueIsEmpty(value) ? undefined : value;
}
