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

-   `isFilledList`

```ts
console.log(isFilledList([])); // false
console.log(isFilledList([1])); // true
console.log(isFilledList([1, 2, 3])); // true
```

-   `uniqueArrayOf`

```ts
expect(
    uniqueArrayOf(
        [
            { id: 1, value: 2 },
            { id: 2, value: 3 },
            { id: 1, value: 4 }
        ],
        (item) => item.id
    )
).toEqual([
    { id: 1, value: 2 },
    { id: 2, value: 3 }
]);

expect(
    uniqueArrayOf(
        [
            { ip: '1.2.3.4', info: { username: 'a' } },
            { ip: '1.2.3.5', info: { username: 'a' } },
            { ip: '1.2.3.6', info: { username: 'b' } },
            { ip: '1.2.3.7', info: { username: 'c' } }
        ],
        'info.username'
    )
).toEqual([
    { ip: '1.2.3.4', info: { username: 'a' } },
    { ip: '1.2.3.6', info: { username: 'b' } },
    { ip: '1.2.3.7', info: { username: 'c' } }
]);
```

-   `partition`

```ts
const [evens, odds] = partition([0, 1, 2, 3], (e) => e % 2 === 0);
console.log(evens); // [0, 2]
console.log(odds); // [1, 3]
```

-   `exclude`

```ts
expect([1, 2, 3, 4].filter(exclude([1, 2, 3]))).toEqual([4]);
expect([1, 2, 3, 4].filter(exclude(4))).toEqual([1, 2, 3]);

// No check for deep equality
expect([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }].filter(exclude({ v: 1 }))).toEqual([
    { v: 1 },
    { v: 2 },
    { v: 3 },
    { v: 4 }
]);
const unique = { v: 1 };
expect([unique, { v: 2 }, { v: 3 }, { v: 4 }].filter(exclude([unique, { v: 2 }]))).toEqual([
    { v: 2 },
    { v: 3 },
    { v: 4 }
]);
```
