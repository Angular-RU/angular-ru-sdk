#### `@angular-ru/common/function`

-   `isFunctionLike(val)`

```ts
class A {}

console.log(isFunctionLike(() => {})); // true
console.log(isFunctionLike(A)); // true
console.log(isFunctionLike({ a: 1 })); // false
```

-   `typeofType`

```ts
import { typeofType } from '@angular-ru/common/function';
import { Exclude, Expose, Type } from 'class-transform';

import { B } from './b';

@Exclude()
export class A {
    @Expose() @Type(typeofType(B)) public b: B;
}
```

-   `$args(fnRef)`

```ts
import { $args } from '@angular-ru/common/function';

function hello(name: string, value: number, a?: string[]): string {
    return 'world' + name + value + a;
}

console.log($args(hello)); // ['name', 'value', 'a']
```
