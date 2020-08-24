import { Timestamp } from '@angular-ru/common/typings';

import { dateStringToDate } from './date-string-to-date';
import { isDateValid } from './is-date-valid';
import { isToday } from './is-today';
import { SerialDateConfig, SerialDateFormatOptions } from './serial-date.interfaces';
import { toFormat } from './to-format';
import { toFormatDateTime } from './to-format-date-time';
import { toISOString } from './to-iso-string';
import { toTimestamp } from './to-timestamp';
import { toUnix } from './to-unix';
import { toUtc } from './to-utc';

/**
 * @deprecated
 * isDateValid instead SerialDate.isDateValid
 * isDateValid instead SerialDate.isDateValid
 * toTimestamp instead SerialDate.toTimestamp
 * toISOString instead SerialDate.toISOString
 * toUnix instead SerialDate.toUnix
 * isToday instead SerialDate.isToday
 */
// @dynamic
abstract class AbstractSerialDate {
    /**
     * @deprecated use dateStringToDate instead SerialDate.dateStringToDate
     */
    public static dateStringToDate(date: string | Date): Date {
        return dateStringToDate(date);
    }

    /**
     * @deprecated use isDateValid instead SerialDate.isDateValid
     */
    public static isDateValid(date?: Date): boolean {
        return isDateValid(date);
    }

    /**
     * @deprecated use toTimestamp instead SerialDate.toTimestamp
     */
    public static toTimestamp(date: string, format: string): string {
        return toTimestamp(date, format);
    }

    /**
     * @deprecated use toFormatDateTime instead SerialDate.formatDateTime
     */
    public static formatDateTime(time?: number, options: SerialDateFormatOptions = {}): string {
        return toFormatDateTime(time, options);
    }

    /**
     * @deprecated use toUtc instead SerialDate.utc
     */
    public static utc(config: Partial<SerialDateConfig> = {}): string {
        return toUtc(config);
    }

    /**
     * @deprecated use toISOString instead SerialDate.toISOString
     */
    public static toISOString(time: Timestamp, defaultValue: string = ''): string {
        return toISOString(time, defaultValue);
    }

    /**
     * @deprecated use toFormat instead SerialDate.toFormat
     */
    public static toFormat(value: Timestamp, format: string): string {
        return toFormat(value, format);
    }

    /**
     * @deprecated use toUnix instead SerialDate.toUnix
     */
    public static toUnix(date: Timestamp): number {
        return toUnix(date);
    }

    /**
     * @deprecated use isToday instead SerialDate.isToday
     */
    public static isToday(someDate: Date): boolean {
        return isToday(someDate);
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export { AbstractSerialDate as SerialDate };
