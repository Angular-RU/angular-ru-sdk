#### `@angular-ru/common/number`

-   `isNumber`

```ts
import { isNumber } from '@angular-ru/common/number';

expect(isNumber(0)).toEqual(true);
expect(isNumber(NaN)).toEqual(true);
expect(isNumber(Infinity)).toEqual(true);
expect(isNumber('')).toEqual(false);
expect(isNumber(null)).toEqual(false);
expect(isNumber(undefined)).toEqual(false);
```

-   `toNumber`

```ts
import { toNumber } from '@angular-ru/common/number';

expect(toNumber(0)).toEqual(0);
expect(toNumber(NaN)).toEqual(NaN);
expect(toNumber(Infinity)).toEqual(Infinity);
expect(toNumber('')).toEqual(NaN);
expect(toNumber(null)).toEqual(NaN);
expect(toNumber(undefined)).toEqual(NaN);
expect(toNumber('', 0)).toEqual(0);
expect(toNumber(undefined, 0)).toEqual(0);
expect(toNumber('1 000 000', 0)).toEqual(1000000);
expect(toNumber('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16', 0)).toEqual(1.2345678910111212e22);
```

-   `half`

```ts
import { half } from '@angular-ru/common/number';

expect(half(2)).toEqual(1);
expect(half(0)).toEqual(0);
expect(half(-3)).toEqual(-1.5);
expect(half(Infinity)).toEqual(Infinity);
expect(half(-Infinity)).toEqual(-Infinity);
expect(half(NaN)).toEqual(NaN);
expect(half([])).toEqual(NaN);
expect(half({})).toEqual(NaN);
expect(half(null)).toEqual(NaN);
expect(half(undefined)).toEqual(NaN);
expect(half('')).toEqual(NaN);
```
