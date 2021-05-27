#### `@angular-ru/common/utils`

-   `detectChanges(cds: ChangeDetectorRef | ChangeDetectorRef[])` - run detect changes if view reference not destroyed.

-   `downloadFile(file: FileToDownloadInfo)` - download file setting
    source([Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) or
    [File](https://developer.mozilla.org/en-US/docs/Web/API/File)), name and extension (such as 'xls', 'txt' etc.).

-   `$any(val)`

```ts
import { $any } from '@angular-ru/common/utils';

const left: number | string | null = '12';
const result: boolean = $any(left) > 13;
```

-   `$cast(val)`

```ts
import { $cast } from '@angular-ru/common/utils';

const left: number | string | null = '12';
const result: boolean = $cast<number>(left) > 13;
```

-   `isNill`

```ts
import { isNil } from '@angular-ru/common/utils';

expect(isNil(null)).toEqual(true);
expect(isNil(undefined)).toEqual(true);
expect(isNil('')).toEqual(false);
expect(isNil(0)).toEqual(false);
```

-   `isNotNil`

```ts
import { isNotNil } from '@angular-ru/common/utils';

expect(isNotNil(0)).toEqual(true);
expect(isNotNil('')).toEqual(true);
expect(isNotNil(null)).toEqual(false);
expect(isNotNil(undefined)).toEqual(false);
```

-   `checkValueIsEmpty`

```ts
import { checkValueIsEmpty } from '@angular-ru/common/utils';

expect(checkValueIsEmpty(0)).toEqual(false);
expect(checkValueIsEmpty('x')).toEqual(false);
expect(checkValueIsEmpty('')).toEqual(true);
expect(checkValueIsEmpty('null')).toEqual(true);
expect(checkValueIsEmpty('    ')).toEqual(true);
expect(checkValueIsEmpty(NaN)).toEqual(true);
expect(checkValueIsEmpty(undefined)).toEqual(true);
expect(checkValueIsEmpty(null)).toEqual(true);
```

-   `checkValueIsFilled`

```ts
import { checkValueIsFilled } from '@angular-ru/common/utils';

expect(checkValueIsFilled(0)).toEqual(true);
expect(checkValueIsFilled('x')).toEqual(true);
expect(checkValueIsFilled('')).toEqual(false);
expect(checkValueIsFilled('null')).toEqual(false);
expect(checkValueIsFilled('    ')).toEqual(false);
expect(checkValueIsFilled(NaN)).toEqual(false);
expect(checkValueIsFilled(undefined)).toEqual(false);
expect(checkValueIsFilled(null)).toEqual(false);
```

-   `checkSomeValueIsEmpty`

```ts
import { checkSomeValueIsEmpty } from '@angular-ru/common/utils';

expect(checkSomeValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkSomeValueIsEmpty(42, 'hello world', null)).toEqual(true);
expect(checkSomeValueIsEmpty('', undefined, null)).toEqual(true);
```

-   `checkEveryValueIsEmpty`

```ts
import { checkEveryValueIsEmpty } from '@angular-ru/common/utils';

expect(checkEveryValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkEveryValueIsEmpty(42, 'hello world', null)).toEqual(false);
expect(checkEveryValueIsEmpty('', undefined, null)).toEqual(true);
```

-   `checkSomeValueIsTrue`

```ts
import { checkSomeValueIsTrue } from '@angular-ru/common/utils';

expect(checkSomeValueIsTrue('a', 13, {}, true)).toEqual(true);
expect(checkSomeValueIsTrue('a', 13, {})).toEqual(false);
```

-   `checkSomeValueIsFalse`

```ts
import { checkSomeValueIsFalse } from '@angular-ru/common/utils';

expect(checkSomeValueIsFalse('a', 13, {}, false)).toEqual(true);
expect(checkSomeValueIsFalse('a', 13, {})).toEqual(false);
```

-   `checkEveryValueIsTrue`

```ts
import { checkEveryValueIsTrue } from '@angular-ru/common/utils';

expect(checkEveryValueIsTrue(true, true, true)).toEqual(true);
expect(checkEveryValueIsTrue(true, true, 'a')).toEqual(false);
```

-   `checkEveryValueIsFalse`

```ts
import { checkEveryValueIsFalse } from '@angular-ru/common/utils';

expect(checkEveryValueIsFalse(false, false, false)).toEqual(true);
expect(checkEveryValueIsFalse(false, false, 'a')).toEqual(false);
```

-   `checkEveryValueIsFilled`

```ts
import { checkEveryValueIsFilled } from '@angular-ru/common/utils';

expect(checkEveryValueIsFilled(1, 'a', true, [])).toEqual(true);
expect(checkEveryValueIsFilled(null, 1, true, [])).toEqual(false);
```

-   `isIE`

```ts
import { isIE } from '@angular-ru/common/utils';

console.log(isIE()); // false
```

-   `getBodyRect`

```ts
import { getBodyRect } from '@angular-ru/common/utils';

const rect: DOMRect = getBodyRect();
```

-   `copyBuffer`

```ts
import { copyBuffer } from '@angular-ru/common/utils';

copyBuffer('hello world'); // copied in your buffer
```

-   `parseXmlFromString`

```ts
import { parseXmlFromString } from '@angular-ru/common/utils';

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

-   `serializeXmlToString`

```ts
import { parseXmlFromString, serializeXmlToString } from '@angular-ru/common/utils';

it('xml to string', () => {
    const xml = parseXmlFromString('<hello>123</hello>');
    expect(serializeXmlToString(xml)).toEqual('<hello>123</hello>');
});
```

-   `isTruthy, isFalsy`

```ts
import { isTrue, isFalse } from '@angular-ru/common/utils';

isTrue('123'); // false
isTrue(true); // true
isFalse(true); // false
isFalse(false); // true
```

-   `tryParseJson`

```ts
import { tryParseJson } from '@angular-ru/common/utils';

// valid
expect(tryParseJson('{}')).toEqual({});
expect(tryParseJson('{ a: 1 }')).toEqual({ a: 1 });
expect(tryParseJson('"text"')).toEqual('text');
expect(tryParseJson('null')).toEqual(null);
expect(tryParseJson('true')).toEqual(true);
expect(tryParseJson('[ 1, { a: 1, b: "b" }, true, null, "b" ]')).toEqual([1, { a: 1, b: 'b' }, true, null, 'b']);

// invalid
expect(tryParseJson('qwer')).toEqual(undefined);
expect(tryParseJson('{ a: 1 }')).toEqual(undefined);

const plain: string = '{ checked: true }';
expect(tryParseJson(plain)?.checked ?? false).toBe(false);
```

-   `filterCharacters`

```ts
import { filter } from '@angular-ru/common/string';

// filter with characters
expect(filter('abc')).toEqual('abc');
expect(filter('abc', ['a', 'b'])).toEqual('ab');
expect(filter(' a b c', ['a', 'b', 'c'])).toEqual(' a b c');
expect(filter('aaa', ['aaa'])).toEqual('');

// filter with predicate function
expect(filter('abc', (): boolean => false)).toEqual('');
expect(filter('abc', (): boolean => true)).toEqual('abc');
expect(filter('abc', (item: string): boolean => item === 'a' || item === 'b')).toEqual('ab');
expect(filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c')).toEqual('abc');
expect(
    filter('a b c', (item: string): boolean => item === 'a' || item === 'b' || item === 'c' || item === ' ')
).toEqual('a b c');
```
