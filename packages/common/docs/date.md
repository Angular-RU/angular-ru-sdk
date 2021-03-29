#### `@angular-ru/common/date`

-   `toTimestamp`

```ts
import { toTimestamp } from '@angular-ru/common/date';

const date: string = toTimestamp('5.07.2019 00:00', 'yyyy-MM-dd HH:mm:ss');
expect(date).toEqual('2019-07-05 00:00:00');
```

-   `dateStringToDate`

```ts
import { dateStringToDate } from '@angular-ru/common/date';

const date = '11.12.202018 15:41:37';
expect(dateStringToDate(date).getFullYear()).toEqual(new Date().getFullYear());
```

-   `isToday`
-   `toUnix`
-   `toFormat`
-   `toISOString`
-   `toUtc`
-   `toFormatDateTime`
-   `isDateValid`

-   `toMilliseconds`

```ts
import { toMilliseconds } from '@angular-ru/common/date';

it(`toMilliseconds`, () => {
    expect(toMilliseconds(1599485851)).toEqual(1599485851000);
    expect(toMilliseconds('1599485851')).toEqual(1599485851000);
    expect(toMilliseconds(new Date(0))).toEqual(0);
});
```

-   `getToday` - current date from `00:00`

```ts
getToday(); // type Date -> [12.01.2020 00:00]
```

-   `startOfDay`
-   `endOfDay`

```ts
import { shiftDate } from '@angular-ru/common/date';

const someDate: Date = new Date('2020-01-01, 16:01:00');
it('should correctly shift date', (): void => {
    const expectDate: Date = shiftDate(
        {
            years: 1,
            months: 2,
            days: 3,
            hours: 4,
            minutes: 5
        },
        someDate
    );
    expect(expectDate.toLocaleString()).toBe('04.03.2021, 20:06:00');
    expect(expectDate.getMilliseconds()).toBe(8);
});
```
