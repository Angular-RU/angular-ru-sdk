#### `@angular-ru/common/utils`

-   `detectChanges(cds: ChangeDetectorRef | ChangeDetectorRef[])` - run detect changes if view reference not destroyed.

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

-   `checkEveryValueIsEmpty`

```ts
import { checkEveryValueIsEmpty } from '@angular-ru/common/utils';

expect(checkEveryValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkEveryValueIsEmpty(42, 'hello world', null)).toEqual(false);
expect(checkEveryValueIsEmpty('', undefined, null)).toEqual(true);
```

-   `checkSomeValueIsEmpty`

```ts
import { checkSomeValueIsEmpty } from '@angular-ru/common/utils';

expect(checkSomeValueIsEmpty(42, 'hello world', {})).toEqual(false);
expect(checkSomeValueIsEmpty(42, 'hello world', null)).toEqual(true);
expect(checkSomeValueIsEmpty('', undefined, null)).toEqual(true);
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
