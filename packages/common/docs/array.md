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
