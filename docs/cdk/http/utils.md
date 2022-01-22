#### `@angular-ru/cdk/http/utils`

-   `isLocalhost`

```ts
expect(isLocalhost('https://127.0.0.1:4200')).toEqual(true);
expect(isLocalhost('https://google.com')).toEqual(false);
```

-   `getPathWithoutQueryParams`

```ts
expect(getPathWithoutQueryParams('http://hello/world/todo/1/all?pageSize=10&pageIndex=0')).toEqual(
    'http://hello/world/todo/1/all'
);
```

-   `getUrlSegments`

```ts
expect(getUrlSegments({})).toEqual({ hostUrl: 'http://localhost/', baseUrl: '' });
expect(getUrlSegments({ hostUrl: 'http://hello_world', baseUrl: 'api' })).toEqual({
    hostUrl: 'http://hello_world/',
    baseUrl: '/api/'
});
```

-   `isAbsolutePath`

```ts
expect(isAbsolutePath('/api')).toEqual(false);
expect(isAbsolutePath('//hello_world')).toEqual(false);
expect(isAbsolutePath('http://hello_world')).toEqual(true);
```

-   `replaceDoubleSlash`

```ts
expect(replaceDoubleSlash('https://a///b//c/d/')).toEqual('https://a/b/c/d/');
expect(replaceDoubleSlash('////a///b//c/d/')).toEqual('/a/b/c/d/');
```

-   `replaceLeadingAndTrailingSlashes`

```ts
expect(replaceLeadingAndTrailingSlashes('/')).toEqual('');
expect(replaceLeadingAndTrailingSlashes('//')).toEqual('');
expect(replaceLeadingAndTrailingSlashes('//a///b//c/d/')).toEqual('a/b/c/d');
```

-   `urlParse`

```ts
expect(urlParse('////a///b//c/d?quick', getUrlSegments({ hostUrl: 'https://127.0.0.0:8030' }))).toEqual(
    'https://127.0.0.0:8030/a/b/c/d'
);
```

-   `getHttpHeader`

```ts
const headers: HttpHeaders = getHttpHeader({ a: '1', b: '2' });
expect(headers.keys()).toEqual(['a', 'b']);
expect(headers.get('a')).toEqual('1');
expect(headers.get('b')).toEqual('2');
```

-   `parseQueryParams`

```ts
const queryParams: PlainObject = parseQueryParams('/todos/get?pageSize=5&value=2');
expect(queryParams).toEqual({ pageSize: '5', value: '2' });
```

-   `getHttpParams`

```ts
const params: HttpParams = getHttpParams('/todos/get?pageSize=5&value=2', { pageIndex: 0 });
expect(params.keys()).toEqual(['pageSize', 'value', 'pageIndex']);
expect(params.get('pageSize')).toEqual('5');
expect(params.get('value')).toEqual('2');
expect(params.get('pageIndex')).toEqual(0);
```
