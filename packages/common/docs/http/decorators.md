#### `@angular-ru/common/http/decorators`

-   `@RestClient(url)`

```ts
@Injectable()
@RestClient('my-controller-api-path')
export class ApiEtcClient extends DataHttpClient {}
```

-   `@BaseUrl(url)`

```ts
@Injectable()
@BaseUrl('nginx-path-controller')
@RestClient('my-controller-api-path')
export class ApiEtcClient extends DataHttpClient {}
```

-   `@HostUrl(url)`

```ts
@Injectable()
@HostUrl('//no-cors.my-api.com')
@BaseUrl('nginx-path-controller')
@RestClient('my-controller-api-path')
export class ApiEtcClient extends DataHttpClient {}
```

-   `@Get(url), @Post(url), @Put(url), @Delete(url), @Patch(url)`

```ts
@Injectable()
@RestClient('users')
export class ApiUsersClient extends DataHttpClient {
    @Get()
    public getUsersAll(): Observable<User[]> {
        return this.restTemplate();
    }
}
```

-   `@RequestParam(key)`

```ts
@Injectable()
@RestClient('users')
export class ApiUsersClient extends DataHttpClient {
    @Get()
    public getUsersAllByPagination(
        @RequestParam('size') _pageSize: number,
        @RequestParam('index') _pageIndex: number
    ): Observable<User[]> {
        return this.restTemplate();
    }

    // ...
}
```

-   `@PathVariable(key)`

```ts
@Injectable()
@RestClient('users')
export class ApiUsersClient extends DataHttpClient {
    @Get('/{id}')
    public getUserById(@PathVariable('id') _userId: number): Observable<User> {
        return this.restTemplate();
    }
}
```

-   `@RequestBody()`

```ts
@Injectable()
@RestClient('users')
export class ApiUsersClient extends DataHttpClient {
    @Post()
    public createUser(@RequestBody() _body: User): Observable<User> {
        return this.restTemplate();
    }
}
```
