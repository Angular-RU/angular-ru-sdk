import { shiftDate } from '@angular-ru/common/date';

describe('[TEST]: ShaftDate', (): void => {
    const someDate: Date = new Date('2020-01-01, 16:01:01:01');
    it('should correctly shift date', (): void => {
        const expectDate: Date = shiftDate(
            {
                years: 1,
                months: 2,
                days: 3,
                hours: 4,
                minutes: 5,
                seconds: 6,
                milliseconds: 7
            },
            someDate
        );
        expect(expectDate.toLocaleString()).toBe('04.03.2021, 20:06:07');
        expect(expectDate.getMilliseconds()).toBe(8);
    });
    it('should correctly add year', (): void => {
        const expectDate: Date = shiftDate({ years: 1 }, someDate);
        expect(expectDate.toLocaleString()).toBe('01.01.2021, 16:01:01');
        expect(expectDate.getMilliseconds()).toBe(1);
    });
    it('should correctly minus year', (): void => {
        const expectDate: Date = shiftDate({ years: -1 }, someDate);
        expect(expectDate.toLocaleString()).toBe('01.01.2019, 16:01:01');
        expect(expectDate.getMilliseconds()).toBe(1);
    });
});
