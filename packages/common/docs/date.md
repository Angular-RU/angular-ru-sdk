#### `@angular-ru/common/date`

-   `SerialDate` - An abstract class that defines our requirements for manipulating dates, without tying down a
    particular implementation.

```ts
const date: string = SerialDate.toTimestamp('5.07.2019 00:00', isoFormat);
expect(date).toEqual('2019-07-05 00:00:00');

const date = '11.12.202018 15:41:37';
expect(SerialDate.dateStringToDate(date).getFullYear()).toEqual(new Date().getFullYear());
```

-   `toFormatDateTime, toUnix, toPrettyFormat` - shortcut alias
