#### `@angular-ru/cdk/object`

-   `sortByAsc`

```typescript
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

```typescript
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

```typescript
import { isObject } from '@angular-ru/cdk/object';

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

```typescript
import { isPlainObject } from '@angular-ru/cdk/object';

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

```typescript
import { isSimpleObject } from '@angular-ru/cdk/object';

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

```typescript
import { isGetter } from '@angular-ru/cdk/object';

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
            set a(value: any) {
                this._a = value;
            }
        },
        'a'
    )
).toEqual(false);

expect(isGetter({ a: 2 }, 'a')).toEqual(false);
```

-   `isIterable`

```typescript
expect(isIterable([1, 2])).toBe(true);
expect(isIterable('Some String')).toBe(true);
expect(isIterable(new Set([1, 2]))).toBe(true);
expect(
    isIterable(
        new Map([
            ['a', 1],
            ['b', 2]
        ])
    )
).toBe(true);
expect(
    isIterable(
        new Map([
            ['a', 1],
            ['b', 2]
        ]).entries()
    )
).toBe(true);

expect(isIterable({ a: 1, b: 2 })).toBe(false);
expect(isIterable(null)).toBe(false);
expect(isIterable(undefined)).toBe(false);
expect(isIterable(0)).toBe(false);
expect(isIterable(true)).toBe(false);
expect(isIterable(() => {})).toBe(false);
```

-   `deepClone`

```typescript
import { deepClone } from '@angular-ru/cdk/object';
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

```typescript
import { deepFreeze } from '@angular-ru/cdk/object';
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

```typescript
import { PlainObject } from '@angular-ru/cdk/typings';
import { replaceWithNull } from '@angular-ru/cdk/object';

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

```typescript
import { PlainObject } from '@angular-ru/cdk/typings';
import { clean } from '@angular-ru/cdk/object';

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

```typescript
import { PlainObject } from '@angular-ru/cdk/typings';
import { getValueByPath } from '@angular-ru/cdk/object';

const obj: PlainObject = { a: 1, f: [{ a: 2 }, { a: 3 }], g: { a: 4 } };

expect(getValueByPath(obj, 'g.a')).toEqual(4);
expect(getValueByPath(obj, 'f.0')).toEqual({ a: 2 });
expect(getValueByPath(obj, 'f.0.a')).toEqual(2);
expect(getValueByPath(obj, 'abc')).toEqual(undefined);
expect(getValueByPath(obj, 'f.0.a.Z', [])).toEqual([]);
```

-   `checkIsShallowEmpty`

```typescript
import { checkIsShallowEmpty } from '@angular-ru/cdk/object';

expect(checkIsShallowEmpty({ a: 0 })).toEqual(false);
expect(checkIsShallowEmpty({ a: { b: '' } })).toEqual(false);
expect(checkIsShallowEmpty({ a: 'hello' })).toEqual(false);
// shallow empty object
expect(checkIsShallowEmpty({})).toEqual(true);
expect(checkIsShallowEmpty({ a: null })).toEqual(true);
expect(checkIsShallowEmpty({ a: '', b: undefined, c: NaN, d: '   ' })).toEqual(true);
```

-   `equals, objectToString, flatten, strictEquals, shallowTrimProperties`

```typescript
it('should be object A equals object B', (): void => {
    const A: PlainObject = { a: 1, b: [1, 2] };
    const B: PlainObject = { a: 1, b: [1, 2] };

    expect(equals(A, B)).toBe(true);
});

it('should be not equals A and B when shallow comparison unsorted keys', (): void => {
    const A: PlainObject = { a: 1, c: { e: 2, d: 1 }, b: [1, 2] };
    const B: PlainObject = { b: [1, 2], a: 1, c: { d: 1, e: 2 } };

    expect(equals(A, B)).toBe(false);
});

it('should be not equals A and B when deep comparison unsorted keys', (): void => {
    const A: PlainObject = { a: 1, c: { e: 2, d: 1 }, b: [1, 2] };
    const B: PlainObject = { b: [1, 2], a: 1, c: { d: 1, e: 2 } };
    const D: PlainObject = { a: 1, b: 2, c: [{ e: 2, d: 1 }] };
    const E: PlainObject = { a: 1, b: 2, c: [{ d: 1, e: 2 }] };

    expect(equals(A, B, { deep: true })).toBe(true);
    expect(equals(D, E, { deep: true })).toBe(true);
});

it('should be return true for equals primitive types', (): void => {
    expect(equals(null!, null!)).toBe(true);
    expect(equals(undefined!, undefined!)).toBe(true);
    expect(equals(NaN as NaN as any)).toBe(true);
    expect(equals(Infinity as Infinity as any)).toBe(true);
    expect(equals('' as '' as any)).toBe(true);
    expect(equals(1 as 1 as any)).toBe(true);

    expect(equals('1' as 1 as any)).toBe(false);
    expect(equals(null!, undefined!)).toBe(false);
    expect(equals(NaN as !undefined, { deep: true })).toBe(false);
});

it('should be a proper comparison with a weak and strict type', (): void => {
    expect(equals({ a: '1' }, { a: 1 })).toBe(false);
    expect(equals({ a: '1' }, { a: 1 }, { weekType: true })).toBe(true);
});

it('should be correct work objectToString', (): void => {
    expect(objectToString(1 as any)).toBe('1');
    expect(objectToString('1' as any)).toBe('"1"');
    expect(objectToString(null!)).toBe('null');
    expect(objectToString(undefined!)).toBe(undefined);

    expect(objectToString({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');

    expect(objectToString([{ b: 2, a: 1 }])).toBe('[{"b":2,"a":1}]');

    expect(objectToString([{ b: 2, a: 1 }], { deep: true })).toBe('[{"a":1,"b":2}]');

    expect(objectToString({ a: 1, b: 2, c: [{ e: 2, d: 1 }] })).toBe('{"a":1,"b":2,"c":[{"e":2,"d":1}]}');

    expect(objectToString({ a: 1, b: 2, c: [{ e: 2, d: 1 }] }, { deep: true })).toBe(
        '{"a":1,"b":2,"c":[{"d":1,"e":2}]}'
    );
});

it('should be correct flatten object', (): void => {
    const actual: PlainObject = {
        a: {
            b: 1,
            c: {
                d: 2
            },
            d: [{ e: 3 }, { f: 4 }]
        },
        g: 5
    };

    const expected: PlainObject = { 'a.b': 1, 'a.c.d': 2, 'a.d.0.e': 3, 'a.d.1.f': 4, g: 5 };

    expect(flatten<number>(actual)).toEqual(expected);
});

it('should be correct deep equals with week type', (): void => {
    expect(
        strictEquals(
            {
                a: 1,
                b: 2,
                c: { d: { f: { g: 'd' } } }
            },
            {
                a: 1,
                b: 2,
                c: { d: { f: { g: 'i' } } }
            }
        )
    ).toEqual(false);

    expect(
        strictEquals(
            {
                a: null,
                b: undefined,
                c: NaN
            },
            {
                a: null,
                b: null,
                c: null
            }
        )
    ).toEqual(true);

    expect(
        strictEquals(
            {
                a: null,
                b: undefined
            },
            {
                a: null,
                b: null,
                c: null
            }
        )
    ).toEqual(false);
});
```

-   `shallowMapObject`

```typescript
import { shallowMapObject } from '@angular-ru/cdk/object';

const oneTypeObject = { a: 1, b: 3, c: 5 };
expect(shallowMapObject(oneTypeObject, (a: number): number => a * 2)).toEqual({
    a: 2,
    b: 6,
    c: 10
});

const complexObject = { a: 1, b: 'two', c: true, d: undefined, e: null, f: { field: 'value' }, g: [1, 2, 3] };
expect(shallowMapObject(complexObject, (a): string => JSON.stringify(a))).toEqual({
    a: '1',
    b: '"two"',
    c: 'true',
    d: undefined,
    e: 'null',
    f: '{"field":"value"}',
    g: '[1,2,3]'
});
```
