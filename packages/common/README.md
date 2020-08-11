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

-   `detectChanges(cds: ChangeDetectorRef | ChangeDetectorRef[])` - run detect changes if view reference not destroyed.

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

-   `isFunctionLike(val)`

```ts
class A {}

console.log(isFunctionLike(() => {})); // true
console.log(isFunctionLike(A)); // true
console.log(isFunctionLike({ a: 1 })); // false
```

-   `isNill`

```ts
expect(isNil(null)).toEqual(true);
expect(isNil(undefined)).toEqual(true);
expect(isNil('')).toEqual(false);
expect(isNil(0)).toEqual(false);
```

-   `isNotNil`

```ts
expect(isNotNil(0)).toEqual(true);
expect(isNotNil('')).toEqual(true);
expect(isNotNil(null)).toEqual(false);
expect(isNotNil(undefined)).toEqual(false);
```

-   `isNumber`

```ts
expect(isNumber(0)).toEqual(true);
expect(isNumber(NaN)).toEqual(true);
expect(isNumber(Infinity)).toEqual(true);
expect(isNumber('')).toEqual(false);
expect(isNumber(null)).toEqual(false);
expect(isNumber(undefined)).toEqual(false);
```

-   `isString`

```ts
expect(isString('')).toEqual(true);
expect(isString(0)).toEqual(false);
expect(isString(NaN)).toEqual(false);
expect(isString(Infinity)).toEqual(false);
expect(isString(null)).toEqual(false);
expect(isString(undefined)).toEqual(false);
```

-   `checkValueIsEmpty`

```ts
expect(checkValueIsEmpty(0)).toEqual(false);
expect(checkValueIsEmpty('x')).toEqual(false);
expect(checkValueIsEmpty('')).toEqual(true);
expect(checkValueIsEmpty('null')).toEqual(true);
expect(checkValueIsEmpty('    ')).toEqual(true);
expect(checkValueIsEmpty(NaN)).toEqual(true);
expect(checkValueIsEmpty(undefined)).toEqual(true);
expect(checkValueIsEmpty(null)).toEqual(true);
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

#### `@angular-ru/common/string`

-   `stringify`

```ts
stringify({ a: 1, b: { c: 2 } }); // pretty print
```

-   `toStringVal(value: T, converter?: (val: T) => string)`

```ts
let value: string = toStringVal([1, 2, 3]); // "1,2,3"
value = toStringVal([1, 2, 3], (values: string[]) => values.join('; ')); // "1; 2; 3"
```

-   `getByteSize(val: string)`

```ts
expect(getByteSize('сын')).toEqual(6);
expect(getByteSize('son')).toEqual(3);
```

#### `@angular-ru/common/array`

-   `updateArray<T>(source: T[], updated: T[], compareFnOrKey: string | CompareFn<T>)`

```ts
expect(
    updateArray(origin, [
        { id: 3, value: 3 },
        { id: 5, value: 5 }
    ])
).toEqual([
    { id: 1, value: 1 },
    { id: 2, value: 1 },
    { id: 3, value: 3 },
    { id: 4, value: 1 },
    { id: 5, value: 5 },
    { id: 6, value: 1 }
]);

// OR

expect(
    updateArray(
        origin,
        [
            { id: 3, value: 3 },
            { id: 5, value: 5 }
        ],
        (a: Value, b: Value): boolean => a.id === b.id
    )
).toEqual([
    { id: 1, value: 1 },
    { id: 2, value: 1 },
    { id: 3, value: 3 },
    { id: 4, value: 1 },
    { id: 5, value: 5 },
    { id: 6, value: 1 }
]);
```

-   `firstItem, secondItem, thirdItem`

```ts
console.log(firstItem([1, 2, 3])); // 1
console.log(secondItem([1, 2, 3])); // 2
console.log(thirdItem([1, 2, 3])); // 3
```

-   `isSingleList`

```ts
console.log(isSingleList([1])); // true
console.log(isSingleList([])); // false
console.log(isSingleList([1, 2, 3])); // false
```

-   `isMultipleList`

```ts
console.log(isMultipleList([1])); // false
console.log(isMultipleList([])); // false
console.log(isMultipleList([1, 2])); // true
console.log(isMultipleList([1, 2, 3])); // true
```

-   `isEmptyList`

```ts
console.log(isEmptyList([])); // true
console.log(isEmptyList([1])); // false
console.log(isEmptyList([1, 2, 3])); // false
```

#### `@angular-ru/common/animation`

-   `fadeInLinearAnimation`

```ts
import { fadeInLinearAnimation } from '@angular-ru/common/animation';
import { Component } from '@angular-ru/core';

@Component({
    //...
    template: `<div *ngIf="showed" [@fadeInLinear]></div>`,
    animation: [fadeInLinearAnimation]
})
export class AppComponent {
    public showed: boolean = true;
}
```

-   `fadeInBezierAnimation`

```ts
import { fadeInBezierAnimation } from '@angular-ru/common/animation';
import { Component } from '@angular-ru/core';

@Component({
    //...
    template: `<div *ngFor="let i of [1, 2, 3]" [@fadeInBezier]>{{ i }}</div>`,
    animation: [fadeInBezierAnimation]
})
export class AppComponent {}
```

#### `@angular-ru/common/http`

-   `isLocalhost()`

```ts
console.log(isLocalhost()); // true || false
```
