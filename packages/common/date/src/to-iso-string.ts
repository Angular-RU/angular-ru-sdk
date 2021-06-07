import { Timestamp } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';

export function toISOString(time: Timestamp, defaultValue: string = ''): string {
    return isNotNil(time) ? new Date(time).toISOString() : defaultValue;
}
