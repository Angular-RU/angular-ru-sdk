import {isString} from '@angular-ru/cdk/string';
import {Timestamp} from '@angular-ru/cdk/typings';

export function toUnix(date: Timestamp): number {
    if (date instanceof Date) {
        return date.getTime();
    }

    if (isString(date)) {
        return new Date(date).getTime();
    }

    return date;
}
