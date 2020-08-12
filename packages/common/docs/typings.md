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

-   `KeyValueComparator`

```ts
@Component({
    template: `<ng-container *ngFor="let item of data | keyvalue: compare"></ng-container>`
})
export class MyComponent {
    public compare: KeyValueComparator = compareKeys;
    // ..
}
```
