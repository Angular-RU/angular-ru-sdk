import { Timestamp } from '@angular-ru/common/typings';
import { checkValueIsFilled } from '@angular-ru/common/utils';

export function toISOString(time: Timestamp, defaultValue: string = ''): string {
    return checkValueIsFilled(time) ? new Date(time).toISOString() : defaultValue;
}
