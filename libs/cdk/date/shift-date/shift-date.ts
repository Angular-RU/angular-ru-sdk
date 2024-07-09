import {isNotNil} from '@angular-ru/cdk/utils';

import {DateShiftDescriptor} from './date-shift-descriptor';

// eslint-disable-next-line complexity
export function shiftDate(
    interval: DateShiftDescriptor,
    inputDate: Date = new Date(),
): Date {
    const date: Date = new Date(inputDate);

    const years: number = date.getFullYear() + (interval.years ?? 0);
    const months: number = date.getMonth() + (interval.months ?? 0);
    const days: number = date.getDate() + (interval.days ?? 0);
    const hours: number = date.getHours() + (interval.hours ?? 0);
    const minutes: number = date.getMinutes() + (interval.minutes ?? 0);
    const seconds: number = date.getSeconds() + (interval.seconds ?? 0);
    const milliseconds: number = date.getMilliseconds() + (interval.milliseconds ?? 0);

    const convertedDate: Date = new Date(
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
    );

    if (isNotNil(interval?.timeZone)) {
        return new Date(
            convertedDate.toLocaleString('en-US', {timeZone: interval.timeZone}),
        );
    }

    return convertedDate;
}
