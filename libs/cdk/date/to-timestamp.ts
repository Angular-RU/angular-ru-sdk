import {Nullable} from '@angular-ru/cdk/typings';

import {dateStringToDate} from './date-string-to-date';
import {toFormat} from './to-format';

export function toTimestamp(date: string, format: string): Nullable<string> {
    const correctDate: Date = dateStringToDate(date);

    return toFormat(correctDate, format);
}
