## DataHttpClientModule

Custom http client, with the ability to customize requests, auto unsubscribe and additional request interceptors.

## Table of contents:

1. [📖 Changelog](https://github.com/Angular-RU/angular-ru-sdk/blob/master/CHANGELOG.md)
2. [📦 Advanced](#table-of-contents)

    - [(@)angular-ru/http/utils](https://github.com/Angular-RU/angular-ru-sdk/blob/master/packages/http/docs/utils.md)

#### First step

Example, if your API base url placed here `https://my-server.com/api/***` and have swagger documentation:

![](https://habrastorage.org/webt/af/bg/n9/afbgn985tehybqdpk2gs1ymq9se.jpeg)

```ts
import { DataHttpClientModule } from '@angular-ru/http';

@NgModule({
    imports: [
        // ...
        DataHttpClientModule.forRoot([ApiUsersClient], {
            hostUrl: 'https://my-server.com/api/'
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

#### Create your http client for your api controller

-   `api-users.client.ts`

```ts
import { DataHttpClient } from '@angular-ru/http';
import { Observable } from 'rxjs';

@Injectable()
@RestClient('/users')
export class ApiUsersClient extends DataHttpClient {}
```
