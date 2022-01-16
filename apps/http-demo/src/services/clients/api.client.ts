import { Injectable } from '@angular/core';
import { DataHttpClient } from '@angular-ru/cdk/http';
import { Get, RestClient } from '@angular-ru/cdk/http/decorators';
import { Any } from '@angular-ru/cdk/typings';
import { Observable } from 'rxjs';

@Injectable()
@RestClient('')
export class ApiClient extends DataHttpClient {
    @Get('posts')
    public posts(): Observable<Any> {
        return this.restTemplate();
    }

    @Get('comments')
    public comments(): Observable<Any> {
        return this.restTemplate();
    }

    @Get('albums')
    public albums(): Observable<Any> {
        return this.restTemplate();
    }

    @Get('photos')
    public photos(): Observable<Any> {
        return this.restTemplate();
    }

    @Get('todos')
    public todos(): Observable<Any> {
        return this.restTemplate();
    }

    @Get('users')
    public users(): Observable<Any> {
        return this.restTemplate();
    }
}
