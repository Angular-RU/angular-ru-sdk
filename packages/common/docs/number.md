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

-   `getFractionSeparator`

```ts
expect(getFractionSeparator('de-DE')).toEqual(',');
expect(getFractionSeparator('ja-JP')).toEqual('.');
expect(getFractionSeparator('en-IN')).toEqual('.');
expect(getFractionSeparator('ru')).toEqual(',');
expect(getFractionSeparator('us')).toEqual('.');
```

-   `truncated`

```ts
expect(truncated(35.874993, 0)).toEqual(35);
expect(truncated(35.874993, 1)).toEqual(35.8);
expect(truncated(35.874993, 2)).toEqual(35.87);
expect(truncated(35.874993, 3)).toEqual(35.874);
expect(truncated(35.874993, 4)).toEqual(35.8749);
```

-   `gaussRound`

```ts
expect(gaussRound(2.5)).toEqual(2);
expect(gaussRound(3.5)).toEqual(4);
expect(gaussRound(2.57, 1)).toEqual(2.6);
expect(gaussRound(1000.879923123, 3)).toEqual(1000.88);
expect(gaussRound(1000.8709923123, 3)).toEqual(1000.871);
expect(gaussRound(1000, 3)).toEqual(1000);
expect(gaussRound(1000.1, 3)).toEqual(1000.1);
expect(gaussRound(1000.12, 3)).toEqual(1000.12);
expect(gaussRound(1000.56, 3)).toEqual(1000.56);
expect(gaussRound(-10000000000.0009, 3)).toEqual(-10000000000.001);
expect(gaussRound(NaN, 3)).toEqual(NaN);
```
