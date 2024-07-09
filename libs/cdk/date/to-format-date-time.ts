import {DatePipe} from '@angular/common';

import {SerialDateFormatOptions} from './serial-date-format-options';

export function toFormatDateTime(
    time?: number,
    options: SerialDateFormatOptions = {},
): string {
    const timeValue: number = time ?? Date.now();
    const formatValue: string = options.format ?? 'dd.MM.yyyy HH:mm:ss';

    return (
        new DatePipe('en-US').transform(timeValue, formatValue, options.timezone) ?? ''
    );
}
