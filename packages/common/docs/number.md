#### `@angular-ru/common/number`

-   `isNumber`

```ts
expect(isNumber(0)).toEqual(true);
expect(isNumber(NaN)).toEqual(true);
expect(isNumber(Infinity)).toEqual(true);
expect(isNumber('')).toEqual(false);
expect(isNumber(null)).toEqual(false);
expect(isNumber(undefined)).toEqual(false);
```
