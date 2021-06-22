import { Nullable, Timestamp } from '@angular-ru/common/typings';

import { toFormat } from './to-format';

export function toPrettyFormat(timestamp: Timestamp): Nullable<string> {
    return toFormat(timestamp, 'dd.MM.yyyy HH:mm:ss');
}
