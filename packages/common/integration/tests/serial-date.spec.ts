import { SerialDate, toPrettyFormat, toUnix } from '@angular-ru/common/date';

const isoFormat: string = 'yyyy-MM-dd HH:mm:ss';

describe('[TEST]: SerialDate', (): void => {
    it('Should be correct date pipe', (): void => {
        const dateTime: number = 1544532097434;
        expect(
            SerialDate.formatDateTime(dateTime, {
                timezone: '+0300'
            })
        ).toEqual('11.12.2018 15:41:37');
        expect(
            SerialDate.formatDateTime(dateTime, {
                format: 'HH:mm dd.MM.yyyy',
                timezone: '+0300'
            })
        ).toEqual('15:41 11.12.2018');
    });

    it('Should correct return date', (): void => {
        const date = '11.12.202018 15:41:37';
        expect(SerialDate.dateStringToDate(date).getFullYear()).toEqual(new Date().getFullYear());
    });

    it('should be correct parse date when paste valid value (27.02.2019 14:25)', (): void => {
        const date: Date = SerialDate.dateStringToDate('27.02.2019 14:25');
        expect(date.getDate()).toBe(27);
        expect(date.getFullYear()).toBe(2019);
        expect(date.getMonth()).toBe(1);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(25);
    });

    it('should be correct parse date when paste valid value (25.10.2019 18:24:36)', (): void => {
        const date: Date = SerialDate.dateStringToDate('25.10.2019 18:24:36');
        expect(date.getDate()).toBe(25);
        expect(date.getFullYear()).toBe(2019);
        expect(date.getMonth()).toBe(9);
        expect(date.getHours()).toBe(18);
        expect(date.getMinutes()).toBe(24);
        expect(date.getSeconds()).toBe(36);
    });

    it('should be correct parse date when paste invalid value', (): void => {
        const date: Date = SerialDate.dateStringToDate('incorrect value');
        // noinspection SuspiciousTypeOfGuard
        expect(date instanceof Date).toEqual(true);
    });

    it('should correct change data with short day', (): void => {
        const date: string = SerialDate.toTimestamp('5.07.2019 00:00', isoFormat);
        expect(date).toEqual('2019-07-05 00:00:00');
    });

    it('should correct be correct invalidate date ', (): void => {
        let date: string = SerialDate.toTimestamp('5.7.2019', isoFormat);
        expect(date).toEqual('2019-07-05 00:00:00');

        date = SerialDate.toTimestamp('1.2.2019', isoFormat);
        expect(date).toEqual('2019-02-01 00:00:00');

        date = SerialDate.toTimestamp('0.0.2019', isoFormat);
        expect(date).toEqual('2019-01-01 00:00:00');

        date = SerialDate.toTimestamp('3..2019', isoFormat);
        expect(date).toEqual('2019-01-03 00:00:00');

        date = SerialDate.toTimestamp('.2.2019', isoFormat);
        expect(date).toEqual('2019-02-01 00:00:00');

        date = SerialDate.toTimestamp('..2019', isoFormat);
        expect(date).toEqual('2019-01-01 00:00:00');

        date = SerialDate.toTimestamp('.2.2019 01:00', isoFormat);
        expect(date).toEqual('2019-02-01 01:00:00');
    });

    it('should correct pass correct data', (): void => {
        const date: string = SerialDate.toTimestamp('25.07.2019 00:00', isoFormat);
        expect(date).toEqual('2019-07-25 00:00:00');
    });

    it('toUnix', () => {
        expect(toUnix(new Date('Thu Jul 30 2020 20:25:59 GMT+0300'))).toEqual(1596129959000);
    });

    it('toPrettyFormat', () => {
        expect(toPrettyFormat(new Date('01.01.2020'))).toEqual('01.01.2020 00:00:00');
    });
});
