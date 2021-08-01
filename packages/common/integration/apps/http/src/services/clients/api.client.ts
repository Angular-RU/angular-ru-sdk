import { Injectable } from '@angular/core';
import { DataHttpClient } from '@angular-ru/common/http';
import { Get, RestClient } from '@angular-ru/common/http/decorators';
import { Any } from '@angular-ru/common/typings/any';
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
