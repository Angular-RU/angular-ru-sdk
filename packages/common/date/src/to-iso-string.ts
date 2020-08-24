import { Timestamp } from '@angular-ru/common/typings';

export function toISOString(time: Timestamp, defaultValue: string = ''): string {
    return time ? new Date(time).toISOString() : defaultValue;
}
