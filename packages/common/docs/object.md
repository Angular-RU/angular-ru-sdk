#### `@angular-ru/common/object`

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

-   `isGetter`

```ts
import { Any } from '@angular-ru/common/typings';
import { isGetter } from '@angular-ru/common/object';

class A {
    public get a(): number {
        return 1;
    }

    public b: string = '2';
}

expect(isGetter(new A(), 'a')).toEqual(true);
expect(isGetter(new A(), 'b')).toEqual(false);

expect(
    isGetter(
        {
            get a() {
                return 2;
            }
        },
        'a'
    )
).toEqual(true);

expect(
    isGetter(
        {
            _a: null,
            set a(value: Any) {
                this._a = value;
            }
        },
        'a'
    )
).toEqual(false);

expect(isGetter({ a: 2 }, 'a')).toEqual(false);
```

-   `deepClone`

```ts
import { deepClone } from '@angular-ru/common/object';
import { Origin } from './origin';

const origin: Origin = { a: 1, b: { c: 2 } };
const copy: Origin = deepClone(origin);
expect(Object.is(origin, copy)).toEqual(false);

copy.b.c = 4;
expect(origin.b.c).toEqual(2);

origin.b.c = 3;
expect(origin.b.c).toEqual(3);
expect(copy.b.c).toEqual(4);
```

-   `deepFreeze`

```ts
import { deepFreeze } from '@angular-ru/common/object';
import { Origin } from './origin';

const origin: Origin = deepFreeze({ a: 1, b: { c: 2 } });
let message: string | null = null;

try {
    origin.b.c = 5;
} catch (e) {
    message = e.message;
}

expect(message).toEqual(`Cannot assign to read only property 'c' of object '[object Object]'`);
```

-   `replaceWithNull`

```ts
import { PlainObject } from '@angular-ru/common/typings';
import { replaceWithNull } from '@angular-ru/common/object';

const wrongElem: PlainObject = {
    a: '',
    b: [
        { c: NaN, d: 1 },
        { c: '   ', d: undefined },
        { c: 0, d: 0 }
    ],
    e: Infinity
};

expect(replaceWithNull(wrongElem)).toEqual({
    a: null,
    b: [
        { c: null, d: 1 },
        { c: null, d: null },
        { c: 0, d: 0 }
    ],
    e: null
});
```

-   `clean`

```ts
import { PlainObject } from '@angular-ru/common/typings';
import { clean } from '@angular-ru/common/object';

const A: PlainObject = clean({
    a: 1,
    b: undefined,
    c: '',
    d: null,
    e: NaN,
    f: [
        {
            a: 2,
            b: undefined,
            c: '',
            d: Infinity
        },
        {
            a: 3,
            b: undefined,
            c: '',
            d: Infinity
        }
    ],
    g: {
        a: 4,
        b: undefined,
        c: '',
        d: Infinity
    },
    h: Infinity
});

const B: PlainObject = { a: 1, f: [{ a: 2 }, { a: 3 }], g: { a: 4 } };

expect(A).toEqual(B);
```

-   `getValueByPath`

```ts
const obj: PlainObject = { a: 1, f: [{ a: 2 }, { a: 3 }], g: { a: 4 } };

expect(getValueByPath(obj, 'g.a')).toEqual(4);
expect(getValueByPath(obj, 'f.0')).toEqual({ a: 2 });
expect(getValueByPath(obj, 'f.0.a')).toEqual(2);
expect(getValueByPath(obj, 'abc')).toEqual(undefined);
expect(getValueByPath(obj, 'f.0.a.Z', [])).toEqual([]);
```
