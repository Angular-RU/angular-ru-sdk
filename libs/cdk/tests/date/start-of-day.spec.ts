/* eslint-disable jest/no-conditional-expect */
import {startOfDay, toISOStringWithoutTimezone} from '@angular-ru/cdk/date';

describe('[TEST]: StartOfDay', (): void => {
    const timezoneOffSet: number = new Date().getTimezoneOffset();

    describe('set date to start of day', (): void => {
        it('should correctly convert "2021-03-29T00:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T00:00:00.000Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            const result =
                timezoneOffSet <= 0
                    ? '2021-03-29T00:00:00.000'
                    : '2021-03-28T00:00:00.000';

            expect(withoutTimezone).toBe(result);
        });

        it('should correctly convert "2021-03-29T20:00:00.000Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:00:00.000Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            const result =
                timezoneOffSet <= -60
                    ? '2021-03-30T00:00:00.000'
                    : '2021-03-29T00:00:00.000';

            expect(withoutTimezone).toBe(result);
        });

        it('should correctly convert "2021-03-29T23:59:59.999Z"', (): void => {
            const someDate: Date = new Date('2021-03-29T23:59:59.999Z');
            const expectDate: Date = startOfDay(someDate);
            const withoutTimezone: string = toISOStringWithoutTimezone(expectDate);

            const result =
                timezoneOffSet < 0
                    ? '2021-03-30T00:00:00.000'
                    : '2021-03-29T00:00:00.000';

            expect(withoutTimezone).toBe(result);
        });
    });
});
