#### `@angular-ru/cdk/big-decimal`

- `BigDecimal`

- `based on package "js-big-decimal@1.3.4"`
- `https://github.com/royNiladri/js-big-decimal`

```typescript
import {BigDecimal} from '@angular-ru/cdk/big-decimal';

const a: BigDecimal = new BigDecimal('111');
const b: BigDecimal = new BigDecimal('222');
const c: BigDecimal = new BigDecimal('111');

expect(a.compareTo(b)).toBe(-1);
expect(b.compareTo(a)).toBe(1);
expect(a.compareTo(c)).toBe(0);

const min: BigDecimal = new BigDecimal('-9223372036854775808');
const max: BigDecimal = new BigDecimal('9223372036854775807');
```
