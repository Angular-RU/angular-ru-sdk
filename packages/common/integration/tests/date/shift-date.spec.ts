import { shiftDate } from '@angular-ru/common/date';

describe('[TEST]: ShaftDate', (): void => {
    const someDate: Date = new Date('2021-03-10T10:10:10.100Z');
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
        expect(expectDate.getFullYear()).toBe(2022);
        expect(expectDate.getMonth()).toBe(4);
        expect(expectDate.getDay()).toBe(5);
        expect(expectDate.getMinutes()).toBe(15);
        expect(expectDate.getSeconds()).toBe(16);
        expect(expectDate.getMilliseconds()).toBe(107);
    });
    it('should correctly add year', (): void => {
        const expectDate: Date = shiftDate({ years: 1 }, someDate);
        expect(expectDate.getFullYear()).toBe(2022);
        expect(expectDate.getDay()).toBe(4);
    });
    it('should correctly minus year', (): void => {
        const expectDate: Date = shiftDate({ years: -1 }, someDate);
        expect(expectDate.getFullYear()).toBe(2020);
        expect(expectDate.getDay()).toBe(2);
    });
});
