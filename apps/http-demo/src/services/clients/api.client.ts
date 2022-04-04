import { Injectable } from '@angular/core';
import { DataHttpClient } from '@angular-ru/cdk/http';
import { Get, RestClient } from '@angular-ru/cdk/http/decorators';
import { Observable } from 'rxjs';

@Injectable()
@RestClient('')
export class ApiClient extends DataHttpClient {
    @Get('posts')
    public posts(): Observable<any> {
        return this.restTemplate();
    }

    @Get('comments')
    public comments(): Observable<any> {
        return this.restTemplate();
    }

    @Get('albums')
    public albums(): Observable<any> {
        return this.restTemplate();
    }

    @Get('photos')
    public photos(): Observable<any> {
        return this.restTemplate();
    }

    @Get('todos')
    public todos(): Observable<any> {
        return this.restTemplate();
    }

    @Get('users')
    public users(): Observable<any> {
        return this.restTemplate();
    }
}
