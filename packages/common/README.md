# Angular-RU common

[![npm version](https://badge.fury.io/js/%40angular-ru%2Fcommon.svg)](https://badge.fury.io/js/%40angular-ru%2Fcommon)
[![npm-stat](https://img.shields.io/npm/dt/@angular-ru/common.svg)](https://npm-stat.com/charts.html?package=@angular-ru/common&from=2017-01-12)

#### `@angular-ru/common/typings`

-   `Any` - alias for `any` type

```ts
let a: Any = 5;
a = {};
b = null;
```

-   `Timestamp` - alias for timestamp type.

```ts
let time: Timestamp = new Date().toISOString();
// or
time = new Date().getTime();
```

-   `NonEmptyArray`

```ts
export function assertIsEmptyList(arr: string[]): asserts arr is NonEmptyArray<string> {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new EmptyArrayList();
    }
}
```

-   `PlainObject`, `PlainObjectOf<T>`

```ts
const a: PlainObject = { a: 1, b: '2' };
const b: PlainObjectOf<number> = { a: 1, b: 2 };
```

-   `Fn<T, U>`

```ts
const fn1: Fn = () => {};
const fn2: Fn = function (val: string) {};
```

-   `DeepPartial<T>`

```ts
const myWindow: DeepPartial<Window> = {};
console.log(myWindow?.navigator?.userAgent);
```

-   `PrimaryKey`

```ts
const idKey: string = PrimaryKey.ID;
```

-   `Immutable<T>, Mutable<T>`

```ts
const obj: Immutable<PlainObject> = {};
obj['a'] = 5; // TS: Index signature in type 'Immutable<PlainObject>' only permits reading
```

-   `ClassType`

```ts
function inject(typeRef: ClassType) {}

class A {}

inject(A);
```

#### `@angular-ru/common/utils`

-   `$any(val)`

```ts
const left: number | string | null = '12';
const result: boolean = $any(left) > 13;
```

-   `$cast(val)`

```ts
const left: number | string | null = '12';
const result: boolean = $cast<number>(left) > 13;
```

#### `@angular-ru/common/webworker`

-   `WebWorkerThreadService` - Web workers allow you to run CPU-intensive computations in a background thread, freeing
    the main thread to update the user interface. If you find your application performs a lot of computations, such as
    generating CAD drawings or doing heavy geometrical calculations, using web workers can help increase your
    application's performance.

```ts
@Component({
    // ...
    providers: [WebWorkerThreadService]
})
export class MyComponent {
    constructor(private readonly worker: WebWorkerThreadService) {}
}
```

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

#### `@angular-ru/common/date`

-   `toStringVal(value: T, converter?: (val: T) => string)`

```ts
let value: string = toStringVal([1, 2, 3]); // "1,2,3"
value = toStringVal([1, 2, 3], (values: string[]) => values.join('; ')); // "1; 2; 3"
```
