import {Nullable, Timestamp} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

export function getDateInterval(
    from?: Nullable<Timestamp>,
    to?: Nullable<Timestamp>,
): Nullable<number> {
    if (isNotNil(from) && isNotNil(to)) {
        const fromTimestamp: number = new Date(from).getTime();
        const toTimestamp: number = new Date(to).getTime();

        return Math.abs(toTimestamp - fromTimestamp);
    } else {
        return null;
    }
}
