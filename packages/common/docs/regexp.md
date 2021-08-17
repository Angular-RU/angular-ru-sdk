#### `@angular-ru/common/regexp`

#### `utils`

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

-   `matchedByRegExp`

```ts
console.log(matchedByRegExp('/hello/', 'hello world')); // true
console.log(matchedByRegExp('/1$/', '2020')); // false
```

#### `constants`

-   `REG_EXP_STRICT_NAME`

```ts
expect(REG_EXP_STRICT_NAME.test('aaaBBB')).toEqual(true);
expect(REG_EXP_STRICT_NAME.test('_aaa_bbb_')).toEqual(true);
expect(REG_EXP_STRICT_NAME.test('aaabbb777')).toEqual(true);
expect(REG_EXP_STRICT_NAME.test('777aaaBBB')).toEqual(false);
expect(REG_EXP_STRICT_NAME.test('aaa BBB')).toEqual(false);
expect(REG_EXP_STRICT_NAME.test('aaaBBB!')).toEqual(false);
expect(REG_EXP_STRICT_NAME.test('aaaДДД')).toEqual(false);
```

-   `REG_EXP_NO_CYRILLIC`

```ts
expect(parse('aaa BBB @ ! 7', REG_EXP_NO_CYRILLIC)).toEqual('aaa BBB @ ! 7');
expect(parse('aaa ДДД', REG_EXP_NO_CYRILLIC)).toEqual('aaa ');

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
```

-   `REG_EXP_INTEGERS_SEPARATED_BY_COMMA`

```ts
expect(parse('12,13,77', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('12,13,77');
expect(parse(' 12 13, 77 ', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('1213,77');
expect(parse('aaa,12,bbb', REG_EXP_INTEGERS_SEPARATED_BY_COMMA)).toEqual('12,');

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
```

-   `REG_EXP_INTEGER`

```ts
expect(parse('abc 123 abc 4,5', REG_EXP_INTEGER)).toEqual('12345');

function parse(value: string, regexp: RegExp): string {
    return (value.match(regexp) ?? []).join('');
}
```
