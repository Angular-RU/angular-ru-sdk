#### `@angular-ru/cdk/date`

- `toTimestamp`

```typescript
import {toTimestamp} from '@angular-ru/cdk/date';

const date: string = toTimestamp('5.07.2019 00:00', 'yyyy-MM-dd HH:mm:ss');
expect(date).toEqual('2019-07-05 00:00:00');
```

- `dateStringToDate`

```typescript
import {dateStringToDate} from '@angular-ru/cdk/date';

const date = '11.12.202018 15:41:37';
expect(dateStringToDate(date).getFullYear()).toEqual(new Date().getFullYear());
```

- `isToday`
- `toUnix`
- `toFormat`
- `toISOString`
- `toUtc`
- `toFormatDateTime`
- `isDateValid`

- `toMilliseconds`

```typescript
import {toMilliseconds} from '@angular-ru/cdk/date';

it(`toMilliseconds`, () => {
  expect(toMilliseconds(1599485851)).toEqual(1599485851000);
  expect(toMilliseconds('1599485851')).toEqual(1599485851000);
  expect(toMilliseconds(new Date(0))).toEqual(0);
});
```

- `getToday` - current date from `00:00`

```typescript
getToday(); // type Date -> [12.01.2020 00:00]
```

- `startOfDay`
- `endOfDay`

```typescript
import {shiftDate} from '@angular-ru/cdk/date';

const someDate: Date = new Date('2020-01-01, 16:01:00');
it('should correctly shift date', (): void => {
  const expectDate: Date = shiftDate(
    {
      years: 1,
      months: 2,
      days: 3,
      hours: 4,
      minutes: 5,
    },
    someDate,
  );
  expect(expectDate.toLocaleString()).toBe('04.03.2021, 20:06:00');
  expect(expectDate.getMilliseconds()).toBe(8);
});
```

```typescript
import {toISOStringWithoutTimezone} from '@angular-ru/cdk/date';

const timezoneOffSet: number = new Date().getTimezoneOffset();
it('should correctly parse "2020-01-01T00:00:00.000Z"', (): void => {
  const someDate: Date = new Date('2020-01-01T00:00:00.000Z');
  const expectDate: string = toISOStringWithoutTimezone(someDate);
  if (timezoneOffSet === -180) {
    expect(expectDate).toBe('2020-01-01T03:00:00.000');
  }
});
```
