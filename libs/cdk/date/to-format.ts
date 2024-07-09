import {DatePipe} from '@angular/common';
import {Nullable, Timestamp} from '@angular-ru/cdk/typings';

export function toFormat(value: Timestamp, format: string): Nullable<string> {
    return new DatePipe('en-US').transform(value, format);
}
