import {
    dateStringToDate,
    toFormatDateTime,
    toISOString,
    toMilliseconds,
    toPrettyFormat,
    toTimestamp,
    toUnix
} from '@angular-ru/cdk/date';
import { Nullable } from '@angular-ru/cdk/typings';

const isoFormat: string = 'yyyy-MM-dd HH:mm:ss';

describe('[TEST]: Date', (): void => {
    it('should be correct date pipe', (): void => {
        const dateTime: number = 1544532097434;

        expect(
            toFormatDateTime(dateTime, {
                timezone: '+0300'
            })
        ).toBe('11.12.2018 15:41:37');
        expect(
            toFormatDateTime(dateTime, {
                format: 'HH:mm dd.MM.yyyy',
                timezone: '+0300'
            })
        ).toBe('15:41 11.12.2018');
    });

    describe('toISOString', () => {
        it('#1', () => {
            expect(toISOString(new Date(0))).toBe('1970-01-01T00:00:00.000Z');
            expect(toISOString('  ')).toBe('');
            expect(toISOString('')).toBe('');
            expect(toISOString(undefined as any)).toBe('');
            expect(toISOString(null as any)).toBe('');
            expect(toISOString('abcde')).toBe('');
        });

        it('#2', () => {
            expect(toISOString(new Date(0))).toBe('1970-01-01T00:00:00.000Z');
        });
    });

    it('should correct return date', (): void => {
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
        expect(date instanceof Date).toBe(true);
    });

    it('should correct change data with short day', (): void => {
        const date: Nullable<string> = toTimestamp('5.07.2019 00:00', isoFormat);

        expect(date).toBe('2019-07-05 00:00:00');
    });

    it('should correct be correct invalidate date', (): void => {
        let date: Nullable<string> = toTimestamp('5.7.2019', isoFormat);

        expect(date).toBe('2019-07-05 00:00:00');

        date = toTimestamp('1.2.2019', isoFormat);
        expect(date).toBe('2019-02-01 00:00:00');

        date = toTimestamp('0.0.2019', isoFormat);
        expect(date).toBe('2019-01-01 00:00:00');

        date = toTimestamp('3..2019', isoFormat);
        expect(date).toBe('2019-01-03 00:00:00');

        date = toTimestamp('.2.2019', isoFormat);
        expect(date).toBe('2019-02-01 00:00:00');

        date = toTimestamp('..2019', isoFormat);
        expect(date).toBe('2019-01-01 00:00:00');

        date = toTimestamp('.2.2019 01:00', isoFormat);
        expect(date).toBe('2019-02-01 01:00:00');
    });

    it('should correct pass correct data', (): void => {
        const date: Nullable<string> = toTimestamp('25.07.2019 00:00', isoFormat);

        expect(date).toBe('2019-07-25 00:00:00');
    });

    it('toUnix', () => {
        expect(toUnix(new Date('Thu Jul 30 2020 20:25:59 GMT+0300'))).toBe(1596129959000);
    });

    describe('toPrettyFormat', () => {
        it('#1', () => {
            expect(toPrettyFormat(new Date('01.01.2020'))).toBe('01.01.2020 00:00:00');
        });

        it('#2', () => {
            expect(
                toFormatDateTime(1544532097434, {
                    format: 'HH:mm dd.MM.yyyy',
                    timezone: '+0300'
                })
            ).toBe('15:41 11.12.2018');
        });
    });

    it(`toMilliseconds`, () => {
        expect(toMilliseconds(1599485851)).toBe(1599485851000);
        expect(toMilliseconds('1599485851')).toBe(1599485851000);
        expect(toMilliseconds(new Date(0))).toBe(0);
    });
});
