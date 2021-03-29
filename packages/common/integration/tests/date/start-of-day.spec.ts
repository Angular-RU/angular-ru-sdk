import { startOfDay } from '@angular-ru/common/date';

describe('[TEST]: StartOfDay', (): void => {
    describe('set date to start of day', (): void => {
        it('should correctly parse "2021-03-29T00:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T00:00:00.000Z');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.valueOf()).toBe(1616965200000);
        });
        it('should correctly parse "2021-03-29T10:10:10.100Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T10:10:10.100Z');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.valueOf()).toBe(1616965200000);
        });
        it('should correctly parse "2021-03-29T23:59:59.999Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:59:59.999Z');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.valueOf()).toBe(1617051600000);
        });
    });
});
