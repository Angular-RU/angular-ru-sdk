import { toISOStringWithoutTimezone } from '../../../../common/date/src/to-iso-string-without-timezone';
import { startOfDay } from '../../../../common/date/src/start-of-day';

describe('[TEST]: StartOfDay', (): void => {
    const timezoneOffSet: number = new Date().getTimezoneOffset();
    describe('set date to start of day', (): void => {
        it('should correctly convert "2021-03-29T00:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T00:00:00.000Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);
            if (timezoneOffSet <= 0) {
                expect(withoutTimezone).toBe('2021-03-29T00:00:00.000');
            } else {
                expect(withoutTimezone).toBe('2021-03-28T00:00:00.000');
            }
        });
        it('should correctly convert "2021-03-29T20:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:00:00.000Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);
            if (timezoneOffSet <= -60) {
                expect(withoutTimezone).toBe('2021-03-30T00:00:00.000');
            } else {
                expect(withoutTimezone).toBe('2021-03-29T00:00:00.000');
            }
        });
        it('should correctly convert "2021-03-29T23:59:59.999Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:59:59.999Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);
            if (timezoneOffSet < 0) {
                expect(withoutTimezone).toBe('2021-03-30T00:00:00.000');
            } else {
                expect(withoutTimezone).toBe('2021-03-29T00:00:00.000');
            }
        });
    });
});
