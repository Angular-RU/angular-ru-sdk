#### `@angular-ru/common/regexp`

-   `ensureRegexp`

```ts
console.log(ensureRegexp('/^a$/')); // "^a$"
```

-   `isRegexpStr`

```ts
console.log(isRegexpStr('/hello/')); // true
console.log(isRegexpStr('/^abc$/')); // true
console.log(isRegexpStr('HELLO')); // false
console.log(isRegexpStr('123')); // false
```

-   `isRegexpStr`

```ts
console.log(isRegexpStr('/hello/')); // true
console.log(isRegexpStr('/^abc$/')); // true
console.log(isRegexpStr('HELLO')); // false
console.log(isRegexpStr('123')); // false
```

-   `matchedByRegExp`

```ts
console.log(matchedByRegExp('/hello/', 'hello world')); // true
console.log(matchedByRegExp('/1$/', '2020')); // false
```
