import { startOfDay } from '@angular-ru/common/date';

describe('[TEST]: StartOfDay', (): void => {
    describe('set date to start of day', (): void => {
        it('should correctly parse "2020-01-01, 00:00:00"', (): void => {
            const someDate: Date = new Date('2020-01-01, 00:00:00');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.toLocaleString()).toBe('01.01.2020, 00:00:00');
        });
        it('should correctly parse "2020-01-01, 20:20:20"', (): void => {
            const someDate: Date = new Date('2020-01-01, 20:20:20');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.toLocaleString()).toBe('01.01.2020, 00:00:00');
        });
        it('should correctly parse "2020-01-01, 23:59:59"', (): void => {
            const someDate: Date = new Date('2020-01-01, 23:59:59');
            const expectDate: Date = startOfDay(someDate);
            expect(expectDate.toLocaleString()).toBe('01.01.2020, 00:00:00');
        });
    });
});
