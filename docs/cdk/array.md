#### `@angular-ru/cdk/array`

- `updateArray<T extends { id: any }>(sourceArray: Nullable<T[]>, updatedArray: Nullable<T[]>): T[];`
- `updateArray<T>(sourceArray: Nullable<T[]>, updatedArray: Nullable<T[]>, compareFnOrKey: keyof T | CompareFn<T>): T[]`

```typescript
expect(
  updateArray(origin, [
    {id: 3, value: 3},
    {id: 5, value: 5},
  ]),
).toEqual([
  {id: 1, value: 1},
  {id: 2, value: 1},
  {id: 3, value: 3},
  {id: 4, value: 1},
  {id: 5, value: 5},
  {id: 6, value: 1},
]);

// OR

expect(
  updateArray(
    origin,
    [
      {id: 3, value: 3},
      {id: 5, value: 5},
    ],
    (a: Value, b: Value): boolean => a.id === b.id,
  ),
).toEqual([
  {id: 1, value: 1},
  {id: 2, value: 1},
  {id: 3, value: 3},
  {id: 4, value: 1},
  {id: 5, value: 5},
  {id: 6, value: 1},
]);
```

- `uniqueArrayOf`

```typescript
expect(
  uniqueArrayOf(
    [
      {id: 1, value: 2},
      {id: 2, value: 3},
      {id: 1, value: 4},
    ],
    (item) => item.id,
  ),
).toEqual([
  {id: 1, value: 2},
  {id: 2, value: 3},
]);

expect(
  uniqueArrayOf(
    [
      {ip: '1.2.3.4', info: {username: 'a'}},
      {ip: '1.2.3.5', info: {username: 'a'}},
      {ip: '1.2.3.6', info: {username: 'b'}},
      {ip: '1.2.3.7', info: {username: 'c'}},
    ],
    'info.username',
  ),
).toEqual([
  {ip: '1.2.3.4', info: {username: 'a'}},
  {ip: '1.2.3.6', info: {username: 'b'}},
  {ip: '1.2.3.7', info: {username: 'c'}},
]);
```

- `unique`

```typescript
expect([a, a, 'a', 13, 13, '13'].filter(unique)).toEqual([a, 'a', 13, '13']);
```

- `partition`

```typescript
const [evens, odds] = partition([0, 1, 2, 3], (e) => e % 2 === 0);
console.log(evens); // [0, 2]
console.log(odds); // [1, 3]
```

- `exclude`

```typescript
expect([1, 2, 3, 4].filter(exclude([1, 2, 3]))).toEqual([4]);
expect([1, 2, 3, 4].filter(exclude(4))).toEqual([1, 2, 3]);

// No check for deep equality
expect([{v: 1}, {v: 2}, {v: 3}, {v: 4}].filter(exclude({v: 1}))).toEqual([{v: 1}, {v: 2}, {v: 3}, {v: 4}]);
const unique = {v: 1};
expect([unique, {v: 2}, {v: 3}, {v: 4}].filter(exclude([unique, {v: 2}]))).toEqual([{v: 2}, {v: 3}, {v: 4}]);
```

- `include`

```typescript
expect([1, 2, 3].filter(include(3))).toEqual([3]);
expect([1, 2, 3].filter(include([2, 3, 4]))).toEqual([2, 3]);
expect([{v: 1}, {v: 2}, {v: 3}].filter(include({v: 1}))).toEqual([]);
const unique: PlainObject = {v: 1};
expect([unique, {v: 2}, {v: 3}].filter(include([unique]))).toEqual([unique]);
```

- `byPropertyValue`

```typescript
const array: Array<{a: string; b: number}> = [
  {a: 'title', b: 1},
  {a: 'title2', b: 2},
  {a: 'title3', b: 3},
];

expect(array.find(byPropertyValue('a', 'title'))).toStrictEqual({a: 'title', b: 1});
expect(array.find(byPropertyValue('b', 1))).toStrictEqual({a: 'title', b: 1});
expect(array.filter(byPropertyValue('a', 'title'))).toStrictEqual([
  {a: 'title', b: 1},
  {a: 'title', b: 3},
]);
expect(array.filter(byPropertyValue('b', 1))).toStrictEqual([{a: 'title', b: 1}]);
```

- `pick`

```typescript
const array: Array<{a: string; b: any}> = [
  {a: 'foo', b: 1},
  {a: 'bar', b: {c: 'baz'}},
];

expect(array.map(pick('a'))).toEqual(['foo', 'bar']);
expect(array.map(pick('b'))).toEqual([1, {c: 'baz'}]);
// No pick deep value
expect(array.map(pick('c'))).toEqual([undefined, undefined]);
```

- `hasItems`

```typescript
hasNoItem([1]); // true
hasNoItem([1, 2, 3]); // true
hasNoItem([]); // false
hasNoItem(null); // false
hasNoItem(undefined); // false
```

- `hasNoItems`

```typescript
hasNoItem([1]); // false
hasNoItem([1, 2, 3]); // false
hasNoItem([]); // true
hasNoItem(null); // true
hasNoItem(undefined); // true
```

- `hasOneItem`

```typescript
hasOneItem([1]); // true
hasOneItem([1, 2, 3]); // false
hasOneItem([]); // false
hasOneItem(null); // false
hasOneItem(undefined); // false
```

- `hasManyItems`

```typescript
hasManyItems([1]); // false
hasManyItems([1, 2, 3]); // true
hasManyItems([]); // false
hasManyItems(null); // false
hasManyItems(undefined); // false
```

- `hasAtMostOneItem`

```typescript
hasAtMostOneItem([1]); // true
hasAtMostOneItem([1, 2, 3]); // false
hasAtMostOneItem([]); // true
hasAtMostOneItem(null); // true
hasAtMostOneItem(undefined); // true
```
