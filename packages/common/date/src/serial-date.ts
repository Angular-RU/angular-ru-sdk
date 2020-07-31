import { Timestamp } from '@angular-ru/common/typings';
import { DatePipe } from '@angular/common';

import { SerialDateConfig } from './serial-date.interfaces';

// @dynamic
abstract class AbstractSerialDate {
    private static readonly maxYear: number = 3000;

    public static dateStringToDate(date: string | Date): Date {
        if (date instanceof Date) {
            return date;
        }

        const firstItem: number = 1;
        const parsedDate: string = (date || '')
            .replace(/^(\d{1,1})/, '0$1')
            .replace(/\.(\d{1,1})\./, '.0$1.')
            .replace('..', '.01.')
            .replace(/^\./, '01.')
            .replace(/(\d{3})\./g, (str: string): string => str.slice(firstItem))
            .replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')
            .replace(/00\//g, '01/');

        const dateValue: Date = new Date(parsedDate);

        if (dateValue.getFullYear() > AbstractSerialDate.maxYear) {
            return new Date();
        }

        return isNaN(dateValue.getTime()) ? new Date() : dateValue;
    }

    public static isDateValid(date?: Date): boolean {
        return date instanceof Date && !!date.getTime();
    }

    public static toTimestamp(date: string, format: string): string {
        const correctDate: Date = AbstractSerialDate.dateStringToDate(date);
        return AbstractSerialDate.toFormat(correctDate, format);
    }

    public static formatDateTime(time?: number, options: { format?: string; timezone?: string } = {}): string {
        const timeValue: number = time ?? new Date().getTime();
        const formatValue: string = options.format ?? 'dd.MM.yyyy HH:mm:ss';
        return new DatePipe('en-US').transform(timeValue, formatValue, options.timezone) || '';
    }

    public static utc(config: Partial<SerialDateConfig> = {}): string {
        const { fullYear, month, date, hours, minutes, seconds, timeZoneHours }: SerialDateConfig = {
            ...{
                fullYear: new Date().getFullYear(),
                month: new Date().getMonth(),
                date: new Date().getDate(),
                hours: 0,
                minutes: 0,
                seconds: 0,
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                timeZoneHours: new Date().getTimezoneOffset() /* TIMEZONE_OFFSET */ / 60 /* ONE_HOUR */
            },
            ...config
        };

        return new Date(Date.UTC(fullYear, month, date, hours + timeZoneHours, minutes, seconds)).toISOString();
    }

    public static toISOString(time: Timestamp, defaultValue: string = ''): string {
        return time ? new Date(time).toISOString() : defaultValue;
    }

    public static toFormat(value: Timestamp, format: string): string {
        return value ? new DatePipe('en-US').transform(value, format)! : null!;
    }

    public static toUnix(date: Timestamp): number {
        if (date instanceof Date) {
            return date.getTime();
        } else if (typeof date === 'string') {
            return new Date(date).getTime();
        }

        return date;
    }

    public static isToday(someDate: Date): boolean {
        const today: Date = new Date();
        return (
            someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
        );
    }
}

export { AbstractSerialDate as SerialDate };
