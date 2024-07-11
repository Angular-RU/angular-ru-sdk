import {SerialDateConfig} from './serial-date-config';

export function toUtc(config: Partial<SerialDateConfig> = {}): string {
    const {
        fullYear,
        month,
        date,
        hours,
        minutes,
        seconds,
        timeZoneHours,
    }: SerialDateConfig = {
        fullYear: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: new Date().getDate(),
        hours: 0,
        minutes: 0,
        seconds: 0,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        timeZoneHours:
            new Date().getTimezoneOffset() /* TIMEZONE_OFFSET */ / 60 /* ONE_HOUR */,
        ...config,
    };

    return new Date(
        Date.UTC(fullYear, month, date, hours + timeZoneHours, minutes, seconds),
    ).toISOString();
}
