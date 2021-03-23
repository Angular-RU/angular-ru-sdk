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
