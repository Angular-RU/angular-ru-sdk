import { Timestamp } from '@angular-ru/common/typings';

export function getDateInterval(from?: Timestamp | null, to?: Timestamp | null): number | null {
    if (from && to) {
        const fromTimestamp: number = new Date(from).getTime();
        const toTimestamp: number = new Date(to).getTime();
        return Math.abs(toTimestamp - fromTimestamp);
    } else {
        return null;
    }
}
