#### `@angular-ru/common/regexp`

-   `sortByAsc`

```ts
const objectList: A[] = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: -1 }, { a: 0 }];

expect(objectList.slice().sort((a, b) => sortByAsc('a', a, b))).toEqual([
    { a: -1 },
    { a: 0 },
    { a: 1 },
    { a: 2 },
    { a: 3 }
]);
```

-   `sortByDesc`

```ts
const objectList: A[] = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: -1 }, { a: 0 }];

expect(objectList.slice().sort((a, b) => sortByDesc('a', a, b))).toEqual([
    { a: 3 },
    { a: 2 },
    { a: 1 },
    { a: 0 },
    { a: -1 }
]);
```

-   `isObject` - check inheritance of object

```ts
import { isObject } from '@angular-ru/common/object';

class A {}

expect(isObject(NaN)).toBe(false);
expect(isObject(null)).toBe(false);
expect(isObject(undefined)).toBe(false);
expect(isObject(1)).toBe(false);
expect(isObject(Infinity)).toBe(false);
expect(isObject('')).toBe(false);
// non primitive
expect(isObject([])).toBe(true);
expect(isObject({})).toBe(true);
expect(isObject(new A())).toBe(true);
expect(isObject(new Date())).toBe(true);
expect(isObject(new Map())).toBe(true);
expect(isObject(() => {})).toBe(true);
expect(isObject(new Number(6))).toBe(true);
expect(isObject(Math)).toBe(true);
expect(isObject(Object.create(null))).toBe(true);
expect(isObject(document.createElement('div'))).toBe(true);
expect(isObject(new (function Foo() {})())).toBe(true);
expect(isObject(window)).toBe(true);
```

-   `isPlainObject` - check only literal object (non instance object)

```ts
import { isPlainObject } from '@angular-ru/common/object';

class A {}

expect(isPlainObject(NaN)).toBe(false);
expect(isPlainObject(null)).toBe(false);
expect(isPlainObject(undefined)).toBe(false);
expect(isPlainObject(1)).toBe(false);
expect(isPlainObject(Infinity)).toBe(false);
expect(isPlainObject('')).toBe(false);
// plain object
expect(isPlainObject({})).toBe(true);
expect(isPlainObject(Object.create(null))).toBe(true);
// complex object (not plain literal)
expect(isPlainObject([])).toBe(false);
expect(isPlainObject(new A())).toBe(false);
expect(isPlainObject(new Date())).toBe(false);
expect(isPlainObject(new Map())).toBe(false);
expect(isPlainObject(() => {})).toBe(false);
expect(isPlainObject(new Number(6))).toBe(false);
expect(isPlainObject(Math)).toBe(false);
expect(isPlainObject(document.createElement('div'))).toBe(false);
expect(isPlainObject(new (function Foo() {})())).toBe(false);
```

-   `isSimpleObject` - check only instance object or literal (non complex structure - Array, DOM, Set, Map, Date, other
    structure)

```ts
import { isSimpleObject } from '@angular-ru/common/object';

class A {}

expect(isSimpleObject(NaN)).toBe(false);
expect(isSimpleObject(null)).toBe(false);
expect(isSimpleObject(undefined)).toBe(false);
expect(isSimpleObject(1)).toBe(false);
expect(isSimpleObject(Infinity)).toBe(false);
expect(isSimpleObject('')).toBe(false);
// instance object, literal object
expect(isSimpleObject(new A())).toBe(true);
expect(isSimpleObject(Object.create(null))).toBe(true);
expect(isSimpleObject({})).toBe(true);
expect(isSimpleObject(new (function Foo() {})())).toBe(true);
// complex object (Array, DOM, Set, Map, other structure)
expect(isSimpleObject([])).toBe(false);
expect(isSimpleObject(new Date())).toBe(false);
expect(isSimpleObject(new Map())).toBe(false);
expect(isSimpleObject(() => {})).toBe(false);
expect(isSimpleObject(new Number(6))).toBe(false);
expect(isSimpleObject(Math)).toBe(false);
expect(isSimpleObject(document.createElement('div'))).toBe(false);
```
