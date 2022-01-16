import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Component, Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { RestClient } from '@angular-ru/cdk/http/decorators';
import { Any, Nullable, PlainObject, PlainObjectOf } from '@angular-ru/cdk/typings';

import { HttpMockInterceptor } from '../helpers/http-mock-interceptor';

describe('[TEST]: HTTP Client', () => {
    const MOCK_API: string = 'http://localhost';
    const queryParams: PlainObject = { params: 'value' };
    const body: PlainObjectOf<string> = { payload: 'value' };
    let client: Nullable<ApiUsersClient> = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;
    let response: Any = null;
    let requestBody: Any = null;
    let requestKeys: string[] = [];
    let responseType: Any = null;
    let requestMethod: Any = null;

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

    afterEach(() => httpMock.verify());

    it('correct inject users http client', () => {
        const users: UserComponent = TestBed.createComponent(UserComponent).componentInstance;

        expect(users.api).toEqual(client);
    });

    it('should be correct send GET request', fakeAsync(() => {
        client?.get('my-api-get').subscribe((res: unknown) => {
            response = res;
            requestMethod = req.request.method;
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-get`);
        req.flush({ data: [] });

        tick(2000);

        expect(response).toEqual({ data: [] });
        expect(requestMethod).toBe('GET');
    }));

    it('should be correct send POST', fakeAsync(() => {
        client
            ?.post('my-api-post', { body: { a: 1 }, queryParams: { params: 'value' } })
            .subscribe((res: PlainObject) => {
                response = res;
                requestMethod = req.request.method;
                requestBody = req.request.body;
            });

        req = httpMock.expectOne(`${MOCK_API}/my-api-post?params=value`);
        req.flush({});

        tick(2000);

        expect(response).toEqual({});
        expect(requestBody).toEqual({ a: 1 });
        expect(requestMethod).toBe('POST');
    }));

    it('should be correct send POST request with baseUrl', fakeAsync(() => {
        client?.post('my-api-post', { baseUrl: 'my-proxy-path', body, queryParams }).subscribe((res: PlainObject) => {
            response = res;
            requestMethod = req.request.method;
            requestBody = req.request.body;
        });

        req = httpMock.expectOne(`${MOCK_API}/my-proxy-path/my-api-post?params=value`);
        req.flush({});

        tick(2000);

        expect(response).toEqual({});
        expect(requestBody).toEqual(body);
        expect(requestMethod).toBe('POST');
    }));

    it('should be correct send PUT request', fakeAsync(() => {
        client?.put('my-api-put', { responseType: 'text' }).subscribe((res: unknown) => {
            response = res;
            requestMethod = req.request.method;
            requestBody = req.request.body;
            responseType = req.request.responseType;
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-put`);
        req.flush('OK');

        tick(2000);

        expect(response).toBe('OK');
        expect(requestBody).toBeNull();
        expect(responseType).toBe('text');
        expect(requestMethod).toBe('PUT');
    }));

    it('should be correct send DELETE request', fakeAsync(() => {
        client?.delete('my-api-delete').subscribe((res: unknown) => {
            response = res;
            requestMethod = req.request.method;
            requestBody = req.request.body;
        });

        req = httpMock.expectOne(`${MOCK_API}/my-api-delete`);
        req.flush({ status: true });

        tick(2000);

        expect(response).toEqual({ status: true });
        expect(req.request.method).toBe('DELETE');
        expect(req.request.responseType).toBe('json');
    }));

    it('should be correct send request when absolute path', fakeAsync(() => {
        client?.post('https://angular.io/api/my-api-get').subscribe(() => {
            requestMethod = req.request.method;
        });

        req = httpMock.expectOne(`https://angular.io/api/my-api-get`);
        req.flush(null);

        tick(2000);

        expect(requestMethod).toBe('POST');
    }));

    it('should be correct send request with query params (any values)', fakeAsync(() => {
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
                requestKeys = req.request.params.keys();
                requestMethod = req.request.method;
            });

        req = httpMock.expectOne(`${MOCK_API}/my-api-big-query-params?param5=value&param6=-1`);
        req.flush([]);

        tick(2000);

        expect(requestKeys).toEqual(['param5', 'param6']);
        expect(requestMethod).toBe('GET');
    }));
});
