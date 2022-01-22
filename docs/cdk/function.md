#### `@angular-ru/cdk/function`

-   `isFunctionLike(val)`

```ts
class A {}

console.log(isFunctionLike(() => {})); // true
console.log(isFunctionLike(A)); // true
console.log(isFunctionLike({ a: 1 })); // false
```

-   `typeofType`

```ts
import { typeofType } from '@angular-ru/cdk/function';
import { Exclude, Expose, Type } from 'class-transform';

import { B } from './b';

@Exclude()
export class A {
    @Expose() @Type(typeofType(B)) public b: B;
}
```

-   `$args(fnRef)`

```ts
import { $args } from '@angular-ru/cdk/function';

function hello(name: string, value: number, a?: string[]): string {
    return 'world' + name + value + a;
}

console.log($args(hello)); // ['name', 'value', 'a']
```

-   `hasConstructor(ref)`

```ts
class A {}
function B() {}
const C: Fn = () => {};
class D extends A {}

expect(hasConstructor(A)).toEqual(true);
expect(hasConstructor(B)).toEqual(true);
expect(hasConstructor(D)).toEqual(true);
expect(hasConstructor(String)).toEqual(true);

expect(hasConstructor(C)).toEqual(false);
expect(hasConstructor({} as Any)).toEqual(false);
expect(hasConstructor(1 as Any)).toEqual(false);
expect(hasConstructor(null)).toEqual(false);
expect(hasConstructor()).toEqual(false);
```
