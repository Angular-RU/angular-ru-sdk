import { Timestamp } from '@angular-ru/common/typings';
import { DatePipe } from '@angular/common';

export function toFormat(value: Timestamp, format: string): string {
    return value ? new DatePipe('en-US').transform(value, format)! : null!;
}
