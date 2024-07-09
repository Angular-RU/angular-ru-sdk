#### `@angular-ru/cdk/number`

- `isNumber`

```typescript
import {isNumber} from '@angular-ru/cdk/number';

expect(isNumber(0)).toEqual(true);
expect(isNumber(NaN)).toEqual(true);
expect(isNumber(Infinity)).toEqual(true);
expect(isNumber('')).toEqual(false);
expect(isNumber(null)).toEqual(false);
expect(isNumber(undefined)).toEqual(false);
```

- `toNumber`

```typescript
import {toNumber} from '@angular-ru/cdk/number';

expect(toNumber(NaN)).toEqual(NaN);
expect(toNumber(Infinity)).toEqual(Infinity);
expect(toNumber('')).toEqual(NaN);
expect(toNumber(null)).toEqual(NaN);
expect(toNumber(undefined)).toEqual(NaN);

expect(toNumber(0)).toEqual(0);
expect(toNumber('0.1')).toEqual(0.1);
expect(toNumber('1123123,123')).toEqual(1123123.123);
expect(toNumber('0,1')).toEqual(0.1);
expect(toNumber('1 000 000')).toEqual(1000000);
expect(toNumber('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16')).toEqual(1.2345678910111212e22);

expect(toNumber('123.456,79', 'de')).toEqual(123456.79);
expect(toNumber('123,457', 'ru')).toEqual(123.457);
expect(toNumber('1,23,000', 'en-IN')).toEqual(123000);
expect(toNumber('30,000.65', 'en-IN')).toEqual(30000.65);
expect(toNumber('30.000,65', 'de')).toEqual(30000.65);
expect(toNumber('30 000,65', 'ru')).toEqual(30000.65);
expect(toNumber('30 000 000', 'ru')).toEqual(30000000);
expect(toNumber('30 000 000', 'ru')).toEqual(30000000);
expect(toNumber('30 000 000,01', 'ru')).toEqual(30000000.01);
expect(toNumber('30 000 000.01', 'ru')).toEqual(30000000.01);
expect(toNumber('30 000 000.01', 'fr')).toEqual(30000000.01);
expect(toNumber('30.000.000,01', 'de')).toEqual(30000000.01);
expect(toNumber('30,000,000.01', 'en')).toEqual(30000000.01);
expect(toNumber('30,000,000.01', 'us')).toEqual(30000000.01);
expect(toNumber('2.13472231235', 'de')).toEqual(213472231235);
expect(toNumber('2.134.722.312.350', 'de')).toEqual(2134722312350);
expect(toNumber('-10000000000.0009', 'us')).toEqual(-10000000000.0009);
expect(toNumber('-10000000000.0009', 'de')).toEqual(-100000000000009);
expect(toNumber('-10000000000.0009', 'fr')).toEqual(-10000000000.0009);
```

- `half`

```typescript
import {half} from '@angular-ru/cdk/number';

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

- `getFractionSeparator`

```typescript
expect(getFractionSeparator('de-DE')).toEqual(',');
expect(getFractionSeparator('ja-JP')).toEqual('.');
expect(getFractionSeparator('en-IN')).toEqual('.');
expect(getFractionSeparator('ru')).toEqual(',');
expect(getFractionSeparator('us')).toEqual('.');
```

- `truncated`

```typescript
expect(truncated(35.874993, 0)).toEqual(35);
expect(truncated(35.874993, 1)).toEqual(35.8);
expect(truncated(35.874993, 2)).toEqual(35.87);
expect(truncated(35.874993, 3)).toEqual(35.874);
expect(truncated(35.874993, 4)).toEqual(35.8749);
```

- `gaussRound`

```typescript
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

- `numberFormat`

```typescript
expect(numberFormat(1500300.5)).toEqual('1 500 300,5');
expect(numberFormat(1500300.5, {formatOptions: {minimumFractionDigits: 2}})).toEqual('1 500 300,50');
expect(numberFormat(1500300, {formatOptions: {style: 'currency', currency: 'EUR'}})).toEqual('1 500 300,00 €');
expect(
  numberFormat(1500300, {
    locales: 'us',
    formatOptions: {style: 'currency', currency: 'rub', useGrouping: false},
  }),
).toEqual('RUB 1500300.00');
expect(numberFormat(1500300, {formatOptions: {maximumFractionDigits: 0}})).toEqual('1 500 300');
```
