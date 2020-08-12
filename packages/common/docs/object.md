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
