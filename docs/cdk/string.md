#### `@angular-ru/cdk/string`

- `capitalize`

```typescript
console.log(capitalize('hello world')); // Hello world
```

- `stringify`

```typescript
stringify({a: 1, b: {c: 2}}); // pretty print
```

- `toStringValue(value: T, converter?: (val: T) => string)`

```typescript
let value: string = toStringValue([1, 2, 3]); // "1,2,3"
value = toStringValue([1, 2, 3], (values: string[]) => values.join('; ')); // "1; 2; 3"
```

- `getByteSize(val: string)`

```typescript
expect(getByteSize('сын')).toEqual(6);
expect(getByteSize('son')).toEqual(3);
```

- `splitOnUniqueValues`

```typescript
expect(splitOnUniqueValues('1; 2; 3, 5.6;   ;, ; 3, 6, 2; 1; -52; 0')).toEqual(['1', '2', '3', '5.6', '6', '-52', '0']);
expect(splitOnUniqueValues('1 - 2 - 3 - 3 - 2 - 1', /-/g)).toEqual(['1', '2', '3']);
```

- `generateQuickGuid`

```typescript
console.log(generateQuickGuid()); // udn0la1mhfq4tudhnympq
```

- `isString`

```typescript
expect(isString('')).toEqual(true);
expect(isString(0)).toEqual(false);
expect(isString(NaN)).toEqual(false);
expect(isString(Infinity)).toEqual(false);
expect(isString(null)).toEqual(false);
expect(isString(undefined)).toEqual(false);
```

- `trim`

```typescript
expect(trim('test ')).toEqual('test');
expect(trim('      test  ')).toEqual('test');
expect(trim('   test  test  ')).toEqual('test  test');
```

- `getFirstSymbol`

```typescript
expect(getFirstSymbol(' test ')).toEqual(' ');
expect(getFirstSymbol('e123')).toEqual('e');
```

- `getLastSymbol`

```typescript
expect(getLastSymbol('test ')).toEqual(' ');
expect(getLastSymbol('test')).toEqual('t');
```

- `removeLastSymbol`

```typescript
expect(removeLastSymbol('test ')).toEqual('test');
expect(removeLastSymbol('123')).toEqual('12');
expect(removeLastSymbol('')).toEqual('');
```

- `replaceEveryCommaOnDot`

```typescript
expect(replaceEveryCommaOnDot('1,2,3')).toEqual('1.2.3');
expect(replaceEveryCommaOnDot('1,2...3,5')).toEqual('1.2...3.5');
```

- `getCountSpacesOnString`

```typescript
expect(getCountSpacesOnString('')).toEqual(0);
expect(getCountSpacesOnString('1 2 3')).toEqual(3);
expect(getCountSpacesOnString(null)).toEqual(0);
expect(getCountSpacesOnString()).toEqual(0);
```

- `removeNonNumericSymbols`

```typescript
expect(removeNonNumericSymbols('Tsgqw__-123,525.asdasd!~s . adqasllZ*a')).toEqual('-123,525..');
expect(removeNonNumericSymbols('1 2 3')).toEqual('123');
expect(removeNonNumericSymbols(null)).toEqual('');
expect(removeNonNumericSymbols()).toEqual('');
```
