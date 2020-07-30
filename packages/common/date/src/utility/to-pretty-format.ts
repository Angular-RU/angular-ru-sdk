import { Timestamp } from '@angular-ru/common/typings';

import { SerialDate } from '../serial-date';

export function toPrettyFormat(timestamp: Timestamp): string {
    return SerialDate.toFormat(timestamp, 'dd.MM.yyyy HH:mm:ss');
}
