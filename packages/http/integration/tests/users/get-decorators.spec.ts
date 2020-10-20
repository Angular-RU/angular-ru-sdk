import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule, RestClient, Get } from '@angular-ru/http';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

describe('[TEST]: HTTP decorators for client', () => {
    const MOCK_API: string = 'http://localhost';
    let client: ApiUsersClient | null = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;

    interface User {
        name: string;
    }

    @Injectable()
    @RestClient('users')
    class ApiUsersClient extends DataHttpClient {
        @Get('/')
        public getFirstUser(): Observable<User> {
            return this.restTemplate<User[]>().pipe(map((value) => value[0]));
        }
    }

    @Component({
        selector: 'events',
        template: ''
    })
    class UsersComponent {
        constructor(public readonly api: ApiUsersClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UsersComponent],
            imports: [CommonModule, HttpClientTestingModule, DataHttpClientModule.forRoot([ApiUsersClient])]
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiUsersClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be correct send GET request with decorator', fakeAsync(() => {
        client?.getFirstUser().subscribe((response: User) => {
            expect(response).toEqual({ name: 'a' });
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/users/`);
        req.flush([{ name: 'a' }, { name: 'b' }]);

        tick(100);
    }));

    afterEach(() => {
        httpMock.verify();
    });
});
