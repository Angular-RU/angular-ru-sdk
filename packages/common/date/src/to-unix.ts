import { isString } from '@angular-ru/common/string';
import { Timestamp } from '@angular-ru/common/typings';

export function toUnix(date: Timestamp): number {
    if (date instanceof Date) {
        return date.getTime();
    } else if (isString(date) as boolean) {
        return new Date(date).getTime();
    }

    return date as number;
}
