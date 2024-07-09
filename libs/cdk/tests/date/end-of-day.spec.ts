/* eslint-disable jest/no-conditional-expect */
import {endOfDay, toISOStringWithoutTimezone} from '@angular-ru/cdk/date';

describe('[TEST]: EndOfDay', (): void => {
    const timezoneOffSet: number = new Date().getTimezoneOffset();

    describe('set date to end of day', (): void => {
        it('should correctly convert "2021-03-29T00:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T00:00:00.000Z');
            const expectDate: Date = endOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            if (timezoneOffSet <= 0) {
                expect(withoutTimezone).toBe('2021-03-29T23:59:59.999');
            } else {
                expect(withoutTimezone).toBe('2021-03-28T23:59:59.999');
            }
        });
        it('should correctly convert "2021-03-29T23:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:00:00.000Z');
            const expectDate: Date = endOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            if (timezoneOffSet <= -60) {
                expect(withoutTimezone).toBe('2021-03-30T23:59:59.999');
            } else {
                expect(withoutTimezone).toBe('2021-03-29T23:59:59.999');
            }
        });
        it('should correctly convert "2021-03-29T23:59:59.999Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:59:59.999Z');
            const expectDate: Date = endOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            if (timezoneOffSet < 0) {
                expect(withoutTimezone).toBe('2021-03-30T23:59:59.999');
            } else {
                expect(withoutTimezone).toBe('2021-03-29T23:59:59.999');
            }
        });
    });
});
