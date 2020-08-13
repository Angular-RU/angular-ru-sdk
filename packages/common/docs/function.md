#### `@angular-ru/common/function`

-   `isFunctionLike(val)`

```ts
class A {}

console.log(isFunctionLike(() => {})); // true
console.log(isFunctionLike(A)); // true
console.log(isFunctionLike({ a: 1 })); // false
```
