import {toISOStringWithoutTimezone} from '@angular-ru/cdk/date';

describe('[TEST]: toISOStringWithoutTimezone', (): void => {
    const timezoneOffSet: number = new Date().getTimezoneOffset();

    it('should correctly parse "2020-01-01T00:00:00.000Z"', (): void => {
        const someDate: Date = new Date('2020-01-01T00:00:00.000Z');
        const expectDate: string = toISOStringWithoutTimezone(someDate);

        if (timezoneOffSet === -180) {
            expect(expectDate).toBe('2020-01-01T03:00:00.000');
        }
    });
    it('should correctly parse "2020-02-02T10:10:10.000Z"', (): void => {
        const someDate: Date = new Date('2020-02-02T10:10:10.000Z');
        const expectDate: string = toISOStringWithoutTimezone(someDate);

        if (timezoneOffSet === -180) {
            expect(expectDate).toBe('2020-02-02T13:10:10.000');
        }
    });
    it('should correctly parse "2020-12-31T23:59:59.999Z"', (): void => {
        const someDate: Date = new Date('2020-12-31T23:59:59.999Z');
        const expectDate: string = toISOStringWithoutTimezone(someDate);

        if (timezoneOffSet === -180) {
            expect(expectDate).toBe('2021-01-01T02:59:59.999');
        }
    });
});
