import { DatePipe } from '@angular/common';

import { SerialDateFormatOptions } from './serial-date-format-options';

export function toFormatDateTime(time?: number, options: SerialDateFormatOptions = {}): string {
    const timeValue: number = time ?? new Date().getTime();
    const formatValue: string = options.format ?? 'dd.MM.yyyy HH:mm:ss';
    return new DatePipe('en-US').transform(timeValue, formatValue, options.timezone) ?? '';
}
