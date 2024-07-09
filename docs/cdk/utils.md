#### `@angular-ru/cdk/utils`

- `detectChanges(cds: ChangeDetectorRef | ChangeDetectorRef[])` - run detect changes if view reference not destroyed.

- `downloadFile(file: FileToDownloadInfo)` - download file setting
  source([Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or
  [File](https://developer.mozilla.org/en-US/docs/Web/API/File)), name and extension (such as 'xls', 'txt' etc.).

- `$any(val)`

```typescript
import {$any} from '@angular-ru/cdk/utils';

const left: number | string | null = '12';
const result: boolean = $any(left) > 13;
```

- `$cast(val)`

```typescript
import {$cast} from '@angular-ru/cdk/utils';

const left: number | string | null = '12';
const result: boolean = $cast<number>(left) > 13;
```

- `isNill`

```typescript
import {isNil} from '@angular-ru/cdk/utils';

expect(isNil(null)).toEqual(true);
expect(isNil(undefined)).toEqual(true);
expect(isNil('')).toEqual(false);
expect(isNil(0)).toEqual(false);
```

- `isNotNil`

```typescript
import {isNotNil} from '@angular-ru/cdk/utils';

expect(isNotNil(0)).toEqual(true);
expect(isNotNil('')).toEqual(true);
expect(isNotNil(null)).toEqual(false);
expect(isNotNil(undefined)).toEqual(false);
```

- `checkValueIsEmpty`

```typescript
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

expect(checkValueIsEmpty(0)).toEqual(false);
expect(checkValueIsEmpty('x')).toEqual(false);
expect(checkValueIsEmpty('null')).toEqual(false);
expect(checkValueIsEmpty('')).toEqual(true);
expect(checkValueIsEmpty('    ')).toEqual(true);
expect(checkValueIsEmpty(NaN)).toEqual(true);
expect(checkValueIsEmpty(undefined)).toEqual(true);
expect(checkValueIsEmpty(null)).toEqual(true);
```

- `checkValueIsFilled`

```typescript
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

expect(checkValueIsFilled(0)).toEqual(true);
expect(checkValueIsFilled('x')).toEqual(true);
expect(checkValueIsFilled('null')).toEqual(true);
expect(checkValueIsFilled('')).toEqual(false);
expect(checkValueIsFilled('    ')).toEqual(false);
expect(checkValueIsFilled(NaN)).toEqual(false);
expect(checkValueIsFilled(undefined)).toEqual(false);
expect(checkValueIsFilled(null)).toEqual(false);
```

- `checkSomeValueIsEmpty`

```typescript
import {checkSomeValueIsEmpty} from '@angular-ru/cdk/utils';

expect(checkSomeValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkSomeValueIsEmpty(42, 'hello world', null)).toEqual(true);
expect(checkSomeValueIsEmpty('', undefined, null)).toEqual(true);
```

- `checkEveryValueIsEmpty`

```typescript
import {checkEveryValueIsEmpty} from '@angular-ru/cdk/utils';

expect(checkEveryValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkEveryValueIsEmpty(42, 'hello world', null)).toEqual(false);
expect(checkEveryValueIsEmpty('', undefined, null)).toEqual(true);
```

- `checkSomeValueIsTrue`

```typescript
import {checkSomeValueIsTrue} from '@angular-ru/cdk/utils';

expect(checkSomeValueIsTrue('a', 13, {}, true)).toEqual(true);
expect(checkSomeValueIsTrue('a', 13, {})).toEqual(false);
```

- `checkSomeValueIsFalse`

```typescript
import {checkSomeValueIsFalse} from '@angular-ru/cdk/utils';

expect(checkSomeValueIsFalse('a', 13, {}, false)).toEqual(true);
expect(checkSomeValueIsFalse('a', 13, {})).toEqual(false);
```

- `checkEveryValueIsTrue`

```typescript
import {checkEveryValueIsTrue} from '@angular-ru/cdk/utils';

expect(checkEveryValueIsTrue(true, true, true)).toEqual(true);
expect(checkEveryValueIsTrue(true, true, 'a')).toEqual(false);
```

- `checkEveryValueIsFalse`

```typescript
import {checkEveryValueIsFalse} from '@angular-ru/cdk/utils';

expect(checkEveryValueIsFalse(false, false, false)).toEqual(true);
expect(checkEveryValueIsFalse(false, false, 'a')).toEqual(false);
```

- `checkEveryValueIsFilled`

```typescript
import {checkEveryValueIsFilled} from '@angular-ru/cdk/utils';

expect(checkEveryValueIsFilled(1, 'a', true, [])).toEqual(true);
expect(checkEveryValueIsFilled(null, 1, true, [])).toEqual(false);
```

- `isIE`

```typescript
import {isIE} from '@angular-ru/cdk/utils';

console.log(isIE()); // false
```

- `getBodyRect`

```typescript
import {getBodyRect} from '@angular-ru/cdk/utils';

const rect: DOMRect = getBodyRect();
```

- `copyString`

```typescript
import {copyString} from '@angular-ru/cdk/utils';

copyString('hello world'); // copied in your buffer
```

- `copyHtml`

```typescript
import {copyHtml} from '@angular-ru/cdk/utils';

copyHtml(`
    <table border="1" cellspacing="0">
        <tbody>
            <tr>
                <th>Header 1</th>
                <th>Content 1</th>
            </tr>
            <tr>
                <td>Header 2</td>
                <td>Content 2</td>
            </tr>
        </tbody>
    </table>
`); // copied in your buffer
```

- `parseXmlFromString`

```typescript
import {parseXmlFromString} from '@angular-ru/cdk/utils';

const xml = parseXmlFromString(`
  <root>
    <a>
        <b>1</b>
        <c>2</c>
    </a>
  </root>
`);

expect(xml.querySelector('a b')?.textContent).toEqual('1');
expect(xml.querySelector('c')?.textContent).toEqual('2');
```

- `serializeXmlToString`

```typescript
import {parseXmlFromString, serializeXmlToString} from '@angular-ru/cdk/utils';

it('xml to string', () => {
  const xml = parseXmlFromString('<hello>123</hello>');
  expect(serializeXmlToString(xml)).toEqual('<hello>123</hello>');
});
```

- `isBoolean`

```typescript
import {isBoolean} from '@angular-ru/cdk/utils';

isBoolean(true); // true
isBoolean(false); // true
isBoolean('true'); // false
isBoolean([]); // false
isBoolean(null); // false
isBoolean(42); // false
```

- `isTrue, isFalse`

```typescript
import {isTrue, isFalse} from '@angular-ru/cdk/utils';

isTrue('123'); // false
isTrue(true); // true
isFalse(true); // false
isFalse(false); // true
```

- `isTruthy, isFalsy`

```typescript
import {isTruthy, isFalsy} from '@angular-ru/cdk/utils';

isTruthy({}); // true
isTruthy([]); // true
isTruthy('123'); // true
isTruthy(true); // true
isFalsy(true); // false
isFalsy(false); // true
isFalsy(null); // true
isFalsy(undefined); // true
```

- `tryParseJson`

```typescript
import {tryParseJson} from '@angular-ru/cdk/utils';

// valid
expect(tryParseJson('{}')).toEqual({});
expect(tryParseJson('{ a: 1 }')).toEqual({a: 1});
expect(tryParseJson('"text"')).toEqual('text');
expect(tryParseJson('null')).toEqual(null);
expect(tryParseJson('true')).toEqual(true);
expect(tryParseJson('[ 1, { a: 1, b: "b" }, true, null, "b" ]')).toEqual([1, {a: 1, b: 'b'}, true, null, 'b']);

// invalid
expect(tryParseJson('qwer')).toEqual(undefined);
expect(tryParseJson('{ a: 1 }')).toEqual(undefined);

const plain: string = '{ checked: true }';
expect(tryParseJson(plain)?.checked ?? false).toBe(false);
```

- `filter`

```typescript
import {filter} from '@angular-ru/cdk/string';

// filter with characters
expect(filter('abc')).toEqual('abc');
expect(filter('abc', ['a', 'b'])).toEqual('ab');
expect(filter('a b c', ['a', 'b', 'c'])).toEqual('abc');
expect(filter('a b c', ['a', 'b', 'c', ' '])).toEqual('a b c');
expect(filter('aaa', ['aaa'])).toEqual('');

// filter with custom function
expect(filter('abc', (): boolean => false)).toEqual('');
expect(filter('abc', (): boolean => true)).toEqual('abc');
expect(filter('abc', (item: string): boolean => item === 'a' || item === 'b')).toEqual('ab');
expect(filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c')).toEqual('abc');
expect(
  filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c' || item === ' '),
).toEqual('a b c');

// filter with RegExp
expect(filter('aaabbbccc', /[a,b]+/)).toEqual('aaabbb');
```

- `fallbackIfEmpty`

```typescript
import {fallbackIfEmpty} from '@angular-ru/cdk/utils';

// see checkValueIsEmpty

expect(fallbackIfEmpty(false, 'fallback')).toEqual(false);
expect(fallbackIfEmpty(true, 'fallback')).toEqual(true);
expect(fallbackIfEmpty([], 'fallback')).toEqual([]);
expect(fallbackIfEmpty(0, 'fallback')).toEqual(0);
expect(fallbackIfEmpty(1, 'fallback')).toEqual(1);
expect(fallbackIfEmpty('string', 'fallback')).toEqual('string');
expect(fallbackIfEmpty({}, 'fallback')).toEqual({});

expect(fallbackIfEmpty('null', {})).toEqual('null');
expect(fallbackIfEmpty(Infinity, {})).toEqual({});
expect(fallbackIfEmpty(NaN, 'fallback')).toEqual('fallback');
expect(fallbackIfEmpty(null, 'fallback')).toEqual('fallback');
expect(fallbackIfEmpty('  ', 'fallback')).toEqual('fallback');
expect(fallbackIfEmpty('', 'fallback')).toEqual('fallback');
```

- `replaceUnits`

```typescript
import {DEFAULT_UNITS_MAP, replaceUnits, UnitsMap} from '@angular-ru/cdk/utils';

expect(replaceUnits('1s', DEFAULT_UNITS_MAP)).toBe('1');
expect(replaceUnits('1m', DEFAULT_UNITS_MAP)).toBe('60');
expect(replaceUnits('1h', DEFAULT_UNITS_MAP)).toBe('3600');
expect(replaceUnits('1d', DEFAULT_UNITS_MAP)).toBe('86400');
expect(replaceUnits('1w', DEFAULT_UNITS_MAP)).toBe('604800');

const CUSTOM_UNITS_MAP: UnitsMap = {
  m: 60,
  h: 3600,
};

expect(replaceUnits('1m', CUSTOM_UNITS_MAP)).toBe('60');
expect(replaceUnits('2m', CUSTOM_UNITS_MAP)).toBe('120');
expect(replaceUnits('1.5m', CUSTOM_UNITS_MAP)).toBe('90');
expect(replaceUnits('1.5h 2m', CUSTOM_UNITS_MAP)).toBe('5520');
expect(replaceUnits('text 1.5h 2m text', CUSTOM_UNITS_MAP)).toBe('text 5520 text');
```
