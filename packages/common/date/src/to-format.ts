import { DatePipe } from '@angular/common';
import { Timestamp } from '@angular-ru/common/typings';

export function toFormat(value: Timestamp, format: string): string {
    return value ? new DatePipe('en-US').transform(value, format)! : null!;
}
