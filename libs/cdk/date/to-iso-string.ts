import {Timestamp} from '@angular-ru/cdk/typings';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

export function toISOString(time: Timestamp, defaultValue: string = ''): string {
    try {
        return checkValueIsFilled(time) ? new Date(time).toISOString() : defaultValue;
    } catch {
        return defaultValue;
    }
}
