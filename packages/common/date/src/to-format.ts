import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular-ru/common/typings';

export function toFormat(value: Timestamp, format: string): string | null {
    return new DatePipe('en-US').transform(value, format);
}
