import { shiftDate } from '../../../../common/date/src/shift-date/shift-date';

describe('[TEST]: ShiftDate', (): void => {
    const someDate: Date = new Date('2021-03-20T00:00:00.000Z');
    console.log(someDate.toISOString());
    it('should correctly shift date', (): void => {
        const expectDate: Date = shiftDate(
            {
                years: 1,
                months: 2,
                days: 3,
                hours: 0,
                minutes: 0,
                seconds: 6,
                milliseconds: 7
            },
            someDate
        );
        expect(expectDate.toISOString()).toBe('2022-05-23T00:00:06.007Z');
    });
    it('should correctly add year', (): void => {
        const expectDate: Date = shiftDate({ years: 1 }, someDate);
        expect(expectDate.toISOString()).toBe('2022-03-20T00:00:00.000Z');
    });
    it('should correctly minus year', (): void => {
        const expectDate: Date = shiftDate({ years: -1 }, someDate);
        expect(expectDate.toISOString()).toBe('2020-03-20T00:00:00.000Z');
    });
});
