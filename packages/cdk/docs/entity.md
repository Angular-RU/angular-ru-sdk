#### `@angular-ru/cdk/entity`

-   `createEntityCollections`

```ts
expect(createEntityCollections()).toEqual({ ids: [], entities: {} });

expect(
    createEntityCollections({
        ids: [1, 2, 3],
        entities: {
            1: { a: 1 },
            2: { a: 2 },
            3: { a: 3 }
        }
    })
).toEqual({
    ids: [1, 2, 3],
    entities: {
        1: { a: 1 },
        2: { a: 2 },
        3: { a: 3 }
    }
});
```

-   `createIdsMapOf`

```ts
expect(createEntityCollections()).toEqual({ ids: [], entities: {} });

expect(
    createEntityCollections({
        ids: [1, 2, 3],
        entities: {
            1: { a: 1 },
            2: { a: 2 },
            3: { a: 3 }
        }
    })
).toEqual({
    ids: [1, 2, 3],
    entities: {
        1: { a: 1 },
        2: { a: 2 },
        3: { a: 3 }
    }
});
```

```ts
const result = createIdsMapOf([
    { id: 1, name: 'a' },
    { id: 2, name: 'b' }
]);

expect(result).toEqual({
    1: { id: 1, name: 'a' },
    2: { id: 2, name: 'b' }
});
```

```ts
interface Currency {
    code: number;
    name: string;
}

expect(() =>
    createIdsMapOf([
        { code: 1, name: 'a' },
        { code: 2, name: 'b' }
    ])
).toThrow("The current entity doesn't have primaryKey - id.");

const result: IdsMapOf<Currency, 'code'> = createIdsMapOf(
    [
        { code: 1, name: 'a' },
        { code: 2, name: 'b' }
    ],
    'code'
);

expect(result).toEqual({
    1: { code: 1, name: 'a' },
    2: { code: 2, name: 'b' }
});
```
