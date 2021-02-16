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
import { checkValueIsEmpty } from '@angular-ru/common/utils';

expect(checkValueIsEmpty(0)).toEqual(true);
expect(checkValueIsEmpty('x')).toEqual(true);
expect(checkValueIsEmpty('')).toEqual(false);
expect(checkValueIsEmpty('null')).toEqual(false);
expect(checkValueIsEmpty('    ')).toEqual(false);
expect(checkValueIsEmpty(NaN)).toEqual(false);
expect(checkValueIsEmpty(undefined)).toEqual(false);
expect(checkValueIsEmpty(null)).toEqual(false);
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
