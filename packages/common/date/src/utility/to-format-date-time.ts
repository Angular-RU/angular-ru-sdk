import { SerialDate } from '../serial-date';
import { SerialDateFormatOptions } from '../serial-date.interfaces';

export function toFormatDateTime(time: number, options?: SerialDateFormatOptions): string {
    return SerialDate.formatDateTime(time, options);
}
