#### `@angular-ru/cdk/stream`

- `compress, decompress, arrayBufferToBase64, base64ToArrayBuffer`

```typescript
import {compress, arrayBufferToBase64, base64ToArrayBuffer, decompress} from '@angular-ru/cdk/stream';

const base64: string = 'eJzLSM3JyVcozy/KSQEAGgsEXQ==';

it('compress', async () => {
  const buffer: ArrayBuffer = await compress('hello world');
  const result: string = arrayBufferToBase64(buffer);
  expect(result).toEqual(base64);
});

it('decompress', async () => {
  const buffer: ArrayBuffer = base64ToArrayBuffer(base64);
  const result: string = await decompress(buffer);
  expect(result).toEqual('hello world');
});
```

#### `@angular-ru/cdk/stream/jwt`

- `toBase64`

```typescript
import {decodeJwt, toBase64} from '@angular-ru/cdk/stream/jwt';

it('toBase64', () => {
  expect(toBase64({login: 'username', password: 'password'})).toEqual(
    'eyJsb2dpbiI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9',
  );
});

/**
 * simple algorithm
 * const token = 'xxxxxxxxx.XXXXXXXX.xxxxxxxx'
 * const [headerEncoded, payloadEncoded, signature] = token.split('.')
 */
it('decodeJwt', () => {
  expect(decodeJwt(jwtToken)).toEqual(decodeModel);
});
```

- `encodeUnicodeToBase64, decodeBase64ToUnicode`

```typescript
import {encodeUnicodeToBase64, decodeBase64ToUnicode} from '@angular-ru/cdk/stream';

expect(encodeUnicodeToBase64('abcABC 0123')).toEqual('YWJjQUJDIDAxMjM=');
expect(decodeBase64ToUnicode('YWJjQUJDIDAxMjM=')).toEqual('abcABC 0123');
```
