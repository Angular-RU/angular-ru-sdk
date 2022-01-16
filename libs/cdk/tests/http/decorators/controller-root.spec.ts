import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Component, Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { BaseUrl, Get, HostUrl, RestClient } from '@angular-ru/cdk/http/decorators';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { Observable } from 'rxjs';

describe('[TEST]: HTTP decorators for client', () => {
    let client: Nullable<ApiUsersClient> = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;

    @Injectable()
    @HostUrl('https://github.com')
    @BaseUrl('users-api-balancer')
    @RestClient('users')
    class ApiUsersClient extends DataHttpClient {
        @Get('/')
        public findAllUsers(): Observable<Any[]> {
            return this.restTemplate();
        }
    }

    @Component({
        selector: 'users',
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

    afterEach(() => httpMock.verify());

    it('should be correct send GET request with decorator', fakeAsync(() => {
        client?.findAllUsers().subscribe((response: Any[]) => {
            expect(response).toEqual([
                { id: 1, name: 'a' },
                { id: 2, name: 'b' }
            ]);
            expect(req.request.method).toBe('GET');
        });

        req = httpMock.expectOne('https://github.com/users-api-balancer/users');
        req.flush([
            { id: 1, name: 'a' },
            { id: 2, name: 'b' }
        ]);

        tick(100);
    }));
});
