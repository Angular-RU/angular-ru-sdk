import { Timestamp } from '@angular-ru/common/typings';

import { SerialDate } from '../serial-date';

export function toUnix(timestamp: Timestamp): number {
    return SerialDate.toUnix(timestamp);
}
