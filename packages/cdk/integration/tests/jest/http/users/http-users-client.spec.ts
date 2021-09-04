import { TestBed } from '@angular/core/testing';
import { RestClient } from '@angular-ru/cdk/http/decorators';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Fn, PlainObject, PlainObjectOf } from '@angular-ru/cdk/typings';
import { HttpMockInterceptor } from '../helpers/http-mock-interceptor';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: HTTP Client', () => {
    const MOCK_API: string = 'http://localhost';
    const queryParams: PlainObject = { params: 'value' };
    const body: PlainObjectOf<string> = { payload: 'value' };

    let client: Nullable<ApiUsersClient> = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;

    @Injectable()
    @RestClient()
    class ApiUsersClient extends DataHttpClient {}

    @Component({
        selector: 'users',
        template: ''
    })
    class UserComponent {
        constructor(public readonly api: ApiUsersClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpMockInterceptor,
                    multi: true
                }
            ],
            declarations: [UserComponent],
            imports: [CommonModule, HttpClientTestingModule, DataHttpClientModule.forRoot([ApiUsersClient])]
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiUsersClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('correct inject users http client', () => {
        const users: UserComponent = TestBed.createComponent(UserComponent).componentInstance;
        expect(users.api).toEqual(client);
    });

    it('should be correct send GET request', (done: Fn) => {
        client?.get('my-api-get').subscribe((response: unknown) => {
            expect(response).toEqual({ data: [] });
            expect(req.request.method).toEqual('GET');
            done();
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-get`);
        req.flush({ data: [] });
    });

    it('should be correct send POST', (done: Fn) => {
        client
            ?.post('my-api-post', { body: { a: 1 }, queryParams: { params: 'value' } })
            .subscribe((response: PlainObject) => {
                expect(response).toEqual({});
                expect(req.request.body).toEqual({ a: 1 });
                expect(req.request.method).toEqual('POST');
                done();
            });

        req = httpMock.expectOne(`${MOCK_API}/my-api-post?params=value`);
        req.flush({});
    });

    it('should be correct send POST request with baseUrl', (done: Fn) => {
        client
            ?.post('my-api-post', { baseUrl: 'my-proxy-path', body, queryParams })
            .subscribe((response: PlainObject) => {
                expect(response).toEqual({});
                expect(req.request.body).toEqual(body);
                expect(req.request.method).toEqual('POST');
                done();
            });

        req = httpMock.expectOne(`${MOCK_API}/my-proxy-path/my-api-post?params=value`);
        req.flush({});
    });

    it('should be correct send PUT request', (done: Fn) => {
        client?.put('my-api-put', { responseType: 'text' }).subscribe((response: unknown) => {
            expect(response).toEqual('OK');
            expect(req.request.method).toEqual('PUT');
            expect(req.request.responseType).toEqual('text');
            done();
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-put`);
        req.flush('OK');
    });

    it('should be correct send DELETE request', (done: Fn) => {
        client?.delete('my-api-delete').subscribe((response: unknown) => {
            expect(response).toEqual({ status: true });
            expect(req.request.method).toEqual('DELETE');
            expect(req.request.responseType).toEqual('json');
            done();
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-delete`);
        req.flush({ status: true });
    });

    it('should be correct send request when absolute path', (done: Fn) => {
        client?.post('https://angular.io/api/my-api-get').subscribe(() => {
            expect(req.request.method).toEqual('POST');
            done();
        });

        req = httpMock.expectOne(`https://angular.io/api/my-api-get`);
        req.flush(null);
    });

    it('should be correct send request with query params (any values)', (done: Fn) => {
        client
            ?.get('my-api-big-query-params', {
                queryParams: {
                    param1: null,
                    param2: Infinity,
                    param3: NaN,
                    param4: undefined,
                    param5: 'value',
                    param6: -1
                }
            })
            .subscribe(() => {
                expect(req.request.params.keys()).toEqual(['param5', 'param6']);
                expect(req.request.method).toEqual('GET');
                done();
            });

        req = httpMock.expectOne(`${MOCK_API}/my-api-big-query-params?param5=value&param6=-1`);
        req.flush([]);
    });

    afterEach(() => {
        httpMock.verify();
    });
});
