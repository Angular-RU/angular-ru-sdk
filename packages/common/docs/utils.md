#### `@angular-ru/common/utils`

-   `detectChanges(cds: ChangeDetectorRef | ChangeDetectorRef[])` - run detect changes if view reference not destroyed.

-   `$any(val)`

```ts
const left: number | string | null = '12';
const result: boolean = $any(left) > 13;
```

-   `$cast(val)`

```ts
const left: number | string | null = '12';
const result: boolean = $cast<number>(left) > 13;
```

-   `isNill`

```ts
expect(isNil(null)).toEqual(true);
expect(isNil(undefined)).toEqual(true);
expect(isNil('')).toEqual(false);
expect(isNil(0)).toEqual(false);
```

-   `isNotNil`

```ts
expect(isNotNil(0)).toEqual(true);
expect(isNotNil('')).toEqual(true);
expect(isNotNil(null)).toEqual(false);
expect(isNotNil(undefined)).toEqual(false);
```

-   `isNumber`

```ts
expect(isNumber(0)).toEqual(true);
expect(isNumber(NaN)).toEqual(true);
expect(isNumber(Infinity)).toEqual(true);
expect(isNumber('')).toEqual(false);
expect(isNumber(null)).toEqual(false);
expect(isNumber(undefined)).toEqual(false);
```

-   `isString`

```ts
expect(isString('')).toEqual(true);
expect(isString(0)).toEqual(false);
expect(isString(NaN)).toEqual(false);
expect(isString(Infinity)).toEqual(false);
expect(isString(null)).toEqual(false);
expect(isString(undefined)).toEqual(false);
```

-   `checkValueIsEmpty`

```ts
expect(checkValueIsEmpty(0)).toEqual(false);
expect(checkValueIsEmpty('x')).toEqual(false);
expect(checkValueIsEmpty('')).toEqual(true);
expect(checkValueIsEmpty('null')).toEqual(true);
expect(checkValueIsEmpty('    ')).toEqual(true);
expect(checkValueIsEmpty(NaN)).toEqual(true);
expect(checkValueIsEmpty(undefined)).toEqual(true);
expect(checkValueIsEmpty(null)).toEqual(true);
```

-   `isIE`

```ts
console.log(isIE()); // false
```
