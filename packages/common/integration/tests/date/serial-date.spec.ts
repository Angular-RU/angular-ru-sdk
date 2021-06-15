import {
    dateStringToDate,
    toFormatDateTime,
    toISOString,
    toMilliseconds,
    toPrettyFormat,
    toTimestamp,
    toUnix
} from '@angular-ru/common/date';
import { Any } from '@angular-ru/common/typings';

const isoFormat: string = 'yyyy-MM-dd HH:mm:ss';

describe('[TEST]: Date', (): void => {
    it('should be correct date pipe', (): void => {
        const dateTime: number = 1544532097434;
        expect(
            toFormatDateTime(dateTime, {
                timezone: '+0300'
            })
        ).toEqual('11.12.2018 15:41:37');
        expect(
            toFormatDateTime(dateTime, {
                format: 'HH:mm dd.MM.yyyy',
                timezone: '+0300'
            })
        ).toEqual('15:41 11.12.2018');
    });

    it('toISOString', () => {
        expect(toISOString(new Date(0))).toEqual('1970-01-01T00:00:00.000Z');
        expect(toISOString('  ')).toEqual('');
        expect(toISOString('')).toEqual('');
        expect(toISOString(undefined as Any)).toEqual('');
        expect(toISOString(null as Any)).toEqual('');
        expect(toISOString('abcde')).toEqual('');
    });

    it('Should correct return date', (): void => {
        const date = '11.12.202018 15:41:37';
        expect(dateStringToDate(date).getFullYear()).toEqual(new Date().getFullYear());
    });

    it('should be correct parse date when paste valid value (27.02.2019 14:25)', (): void => {
        const date: Date = dateStringToDate('27.02.2019 14:25');
        expect(date.getDate()).toBe(27);
        expect(date.getFullYear()).toBe(2019);
        expect(date.getMonth()).toBe(1);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(25);
    });

    it('should be correct parse date when paste valid value (25.10.2019 18:24:36)', (): void => {
        const date: Date = dateStringToDate('25.10.2019 18:24:36');
        expect(date.getDate()).toBe(25);
        expect(date.getFullYear()).toBe(2019);
        expect(date.getMonth()).toBe(9);
        expect(date.getHours()).toBe(18);
        expect(date.getMinutes()).toBe(24);
        expect(date.getSeconds()).toBe(36);
    });

    it('should be correct parse date when paste invalid value', (): void => {
        const date: Date = dateStringToDate('incorrect value');
        // noinspection SuspiciousTypeOfGuard
        expect(date instanceof Date).toEqual(true);
    });

    it('should correct change data with short day', (): void => {
        const date: string | null = toTimestamp('5.07.2019 00:00', isoFormat);
        expect(date).toEqual('2019-07-05 00:00:00');
    });

    it('should correct be correct invalidate date ', (): void => {
        let date: string | null = toTimestamp('5.7.2019', isoFormat);
        expect(date).toEqual('2019-07-05 00:00:00');

        date = toTimestamp('1.2.2019', isoFormat);
        expect(date).toEqual('2019-02-01 00:00:00');

        date = toTimestamp('0.0.2019', isoFormat);
        expect(date).toEqual('2019-01-01 00:00:00');

        date = toTimestamp('3..2019', isoFormat);
        expect(date).toEqual('2019-01-03 00:00:00');

        date = toTimestamp('.2.2019', isoFormat);
        expect(date).toEqual('2019-02-01 00:00:00');

        date = toTimestamp('..2019', isoFormat);
        expect(date).toEqual('2019-01-01 00:00:00');

        date = toTimestamp('.2.2019 01:00', isoFormat);
        expect(date).toEqual('2019-02-01 01:00:00');
    });

    it('should correct pass correct data', (): void => {
        const date: string | null = toTimestamp('25.07.2019 00:00', isoFormat);
        expect(date).toEqual('2019-07-25 00:00:00');
    });

    it('toISOString', () => {
        expect(toISOString(new Date(0))).toEqual('1970-01-01T00:00:00.000Z');
    });

    it('toUnix', () => {
        expect(toUnix(new Date('Thu Jul 30 2020 20:25:59 GMT+0300'))).toEqual(1596129959000);
    });

    it('toPrettyFormat', () => {
        expect(toPrettyFormat(new Date('01.01.2020'))).toEqual('01.01.2020 00:00:00');
    });

    it('toPrettyFormat', () => {
        expect(
            toFormatDateTime(1544532097434, {
                format: 'HH:mm dd.MM.yyyy',
                timezone: '+0300'
            })
        ).toEqual('15:41 11.12.2018');
    });

    it(`toMilliseconds`, () => {
        expect(toMilliseconds(1599485851)).toEqual(1599485851000);
        expect(toMilliseconds('1599485851')).toEqual(1599485851000);
        expect(toMilliseconds(new Date(0))).toEqual(0);
    });
});
