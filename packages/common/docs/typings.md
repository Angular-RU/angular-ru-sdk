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

-   `Couple<T>`

```ts
let operands: Couple<number> = [1, 2];
let number: Couple<number> = [1];
//                           ~~~
let numbers: Couple<number> = [1, 2, 3];
//                            ~~~~~~~~~
```

-   `KeyOfList<T>`

```ts
class B {
    c: string = '';
}

class A {
    a: string = '';
    b: B = new B();
}

const keys: KeyOfList<A> = ['a', 'b']; // output keys
```

-   `DeepKeyOfList<T>`

```ts
class B {
    c: string = '';
    etc: { f: string } = { f: '' };
}

class A {
    a: string = '';
    b: B = new B();
}

const keys: DeepKeyOfList<A> = ['a', 'b.c', 'b.etc.f']; // output keys
```

-   `Leaves<T>`

`Leaves<T>[] === DeepKeyOfList<T>`

-   `Paths<T>`

```ts
class B {
    c: string = '';
    etc: { f: string } = { f: '' };
}

class A {
    a: string = '';
    b: B = new B();
}

const paths: Paths<A>[] = ['a', 'b', 'b.c', 'b.etc', 'b.etc.f']; // output keys
```

also, you can:

```ts
const etc: Paths<A['b']['etc']> = 'f';
```

-   `KeysOfType<T, Type>`

```ts
interface SomeInterface {
    someNumber: number;
    someString: string;
    someStringArray: string[];
    someAnotherNumber: number;
}

type SomeStringNumberKeys = KeysOfType<SomeInterface, string | number>;
// SomeStringNumberKeys === 'someNumber' | 'someString' | 'someAnotherNumber'
```

-   `NgCssClasses`

```ts
const myClasses = { 'element__block--modificator': true };
```
