import { Timestamp } from '@angular-ru/common/typings';

export function toUnix(date: Timestamp): number {
    if (date instanceof Date) {
        return date.getTime();
    } else if (typeof date === 'string') {
        return new Date(date).getTime();
    }

    return date;
}
