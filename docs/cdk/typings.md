#### `@angular-ru/cdk/typings`

-   `Nullable`

```typescript
@Component({})
class MyComponent {
    @Input() public list: Nullable<string[]>; // equals ~ @Input() public list: string[] | null | undefined;
}
```

-   `Timestamp` - alias for timestamp type.

```typescript
let time: Timestamp = new Date().toISOString();
// or
time = new Date().getTime();
```

-   `NonEmptyArray`

```typescript
import { NonEmptyArray } from '@angular-ru/cdk/typings';

export function assertIsEmptyList(arr: string[]): asserts arr is NonEmptyArray<string> {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new EmptyArrayList();
    }
}
```

-   `PlainObject`, `PlainObjectOf<T>`

```typescript
const a: PlainObject = { a: 1, b: '2' };
const b: PlainObjectOf<number> = { a: 1, b: 2 };
```

-   `Fn<T, U>`

```typescript
const fn1: Fn = () => {};
const fn2: Fn = function (val: string) {};
```

-   `DeepPartial<T>`

```typescript
const myWindow: DeepPartial<Window> = {};
console.log(myWindow?.navigator?.userAgent);
```

-   `PrimaryKey`

```typescript
const idKey: string = PrimaryKey.ID;
```

-   `Immutable<T>, Mutable<T>`

```typescript
const obj: Immutable<PlainObject> = {};
obj['a'] = 5; // TS: Index signature in type 'Immutable<PlainObject>' only permits reading
```

-   `ClassType`

```typescript
function inject(typeRef: ClassType) {}

class A {}

inject(A);
```

-   `KeyValueComparator`

```typescript
@Component({
    template: `
        <ng-container *ngFor="let item of data | keyvalue : compare"></ng-container>
    `
})
export class MyComponent {
    public compare: KeyValueComparator = compareKeys;
    // ..
}
```

-   `Couple<T>`

```typescript
let operands: Couple<number> = [1, 2];
let number: Couple<number> = [1];
//                           ~~~
let numbers: Couple<number> = [1, 2, 3];
//                            ~~~~~~~~~
```

-   `KeyOfList<T>`

```typescript
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

```typescript
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

```typescript
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

```typescript
const etc: Paths<A['b']['etc']> = 'f';
```

-   `KeysOfType<T, Type>`

```typescript
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

```typescript
const myClasses: NgCssClasses = { 'block__element--modificator': true };
```

-   `DateIntervalDescriptor`

```typescript
const descriptor: DateIntervalDescriptor = { dateFromKey: 'dateFrom', dateToKey: 'dateTo' };
const updatedDate = makeSomeOperations(dateFormGroup, descriptor);

function makeSomeOperations(form: FormGroup, descriptor: DateIntervalDescriptor) {
    const fromControl: FormControl = form.get(descriptor.dateFromKey) as FormControl;
    const toControl: FormControl = form.get(descriptor.dateFromKey) as FormControl;
    // ...
}
```

-   `Tuple`

```typescript
type NumberCouple = Tuple<number, 2>; // [number, number]
type Number4 = Tuple<number, 4>; // [number, number, number, number]
type BracedString = Tuple<string>; // [string]
type NumberCouple = Tuple<string, 0>; // []
```

-   `InfiniteTuple`

```typescript
type CoupleAndMaybeSomeNumbers = InfiniteTuple<number, 2>; // [number, number, ...number]
type AtLeast4Numbers = InfiniteTuple<number, 4>; // [number, number, number, number, ...number]
type AtLeastOneLine = InfiniteTuple<string>; // [string, ...string]
type SomeLines = InfiniteTuple<string, 0>; // string[]
```

-   `LastOfTuple`

```typescript
type Number = LastOfTuple<[number]>; // number
type MaybeString = LastOfTuple<string[]>; // string | undefined
type Boolean = LastOfTuple<[string, boolean]>; // boolean
type StringOrNumber = LastOfTuple<[string, ...number[]]>; // string | number
type Nothing = LastOfTuple<[]>; // undefined
```

-   `TupleItem`

```typescript
type Number = TupleItem<[number], 0>; // number
type MaybeString = TupleItem<string[], 1>; // string | undefined
type Boolean = TupleItem<[string, boolean], 1>; // boolean
type String = TupleItem<[string, ...number[]], 0>; // string
type MaybeNumber = TupleItem<[string, ...number[]], 3>; // number | undefined
type Nothing = TupleItem<[], 0>; // undefined
type NothingToo = TupleItem<[], 3>; // undefined
```
