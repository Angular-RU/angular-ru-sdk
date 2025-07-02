import {CommonModule} from '@angular/common';
import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
    TestRequest,
} from '@angular/common/http/testing';
import {ChangeDetectionStrategy, Component, Injectable} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DataHttpClient, DataHttpClientModule} from '@angular-ru/cdk/http';
import {RestClient} from '@angular-ru/cdk/http/decorators';
import {Nullable, PlainObject, PlainObjectOf} from '@angular-ru/cdk/typings';

import {HttpMockInterceptor} from '../helpers/http-mock-interceptor';

describe('[TEST]: HTTP Client', () => {
    const MOCK_API = 'http://localhost';
    const queryParams: PlainObject = {params: 'value'};
    const body: PlainObjectOf<string> = {payload: 'value'};
    let client: Nullable<ApiUsersClient> = null;
    let httpMock: HttpTestingController;
    let request: TestRequest;
    let responseResult: any = null;
    let requestBody: any = null;
    let requestKeys: string[] = [];
    let responseType: any = null;
    let requestMethod: any = null;

    @Injectable()
    @RestClient()
    class ApiUsersClient extends DataHttpClient {}

    @Component({
        standalone: false,
        selector: 'users',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
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
                    multi: true,
                },
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
            declarations: [UserComponent],
            imports: [CommonModule, DataHttpClientModule.forRoot([ApiUsersClient])],
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiUsersClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('correct inject users http client', () => {
        const users: UserComponent =
            TestBed.createComponent(UserComponent).componentInstance;

        expect(users.api).toEqual(client);
    });

    it('should be correct send GET request', fakeAsync(() => {
        client?.get('my-api-get').subscribe((response: unknown) => {
            responseResult = response;
            requestMethod = request.request.method;
        });

        request = httpMock.expectOne(`${MOCK_API}/my-api-get`);
        request.flush({data: []});

        tick(2000);

        expect(responseResult).toEqual({data: []});
        expect(requestMethod).toBe('GET');
    }));

    it('should be correct send POST', fakeAsync(() => {
        client
            ?.post('my-api-post', {body: {a: 1}, queryParams: {params: 'value'}})
            .subscribe((response: PlainObject) => {
                responseResult = response;
                requestMethod = request.request.method;
                requestBody = request.request.body;
            });

        request = httpMock.expectOne(`${MOCK_API}/my-api-post?params=value`);
        request.flush({});

        tick(2000);

        expect(responseResult).toEqual({});
        expect(requestBody).toEqual({a: 1});
        expect(requestMethod).toBe('POST');
    }));

    it('should be correct send POST request with baseUrl', fakeAsync(() => {
        client
            ?.post('my-api-post', {baseUrl: 'my-proxy-path', body, queryParams})
            .subscribe((response: PlainObject) => {
                responseResult = response;
                requestMethod = request.request.method;
                requestBody = request.request.body;
            });

        request = httpMock.expectOne(
            `${MOCK_API}/my-proxy-path/my-api-post?params=value`,
        );
        request.flush({});

        tick(2000);

        expect(responseResult).toEqual({});
        expect(requestBody).toEqual(body);
        expect(requestMethod).toBe('POST');
    }));

    it('should be correct send PUT request', fakeAsync(() => {
        client
            ?.put('my-api-put', {responseType: 'text'})
            .subscribe((response: unknown) => {
                responseResult = response;
                requestMethod = request.request.method;
                requestBody = request.request.body;
                responseType = request.request.responseType;
            });

        request = httpMock.expectOne(`${MOCK_API}/my-api-put`);
        request.flush('OK');

        tick(2000);

        expect(responseResult).toBe('OK');
        expect(requestBody).toBeNull();
        expect(responseType).toBe('text');
        expect(requestMethod).toBe('PUT');
    }));

    it('should be correct send DELETE request', fakeAsync(() => {
        client?.delete('my-api-delete').subscribe((response: unknown) => {
            responseResult = response;
            requestMethod = request.request.method;
            requestBody = request.request.body;
        });

        request = httpMock.expectOne(`${MOCK_API}/my-api-delete`);
        request.flush({status: true});

        tick(2000);

        expect(responseResult).toEqual({status: true});
        expect(request.request.method).toBe('DELETE');
        expect(request.request.responseType).toBe('json');
    }));

    it('should be correct send request when absolute path', fakeAsync(() => {
        client?.post('https://angular.io/api/my-api-get').subscribe(() => {
            requestMethod = request.request.method;
        });

        request = httpMock.expectOne('https://angular.io/api/my-api-get');
        request.flush(null);

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
                    param6: -1,
                },
            })
            .subscribe(() => {
                requestKeys = request.request.params.keys();
                requestMethod = request.request.method;
            });

        request = httpMock.expectOne(
            `${MOCK_API}/my-api-big-query-params?param5=value&param6=-1`,
        );
        request.flush([]);

        tick(2000);

        expect(requestKeys).toEqual(['param5', 'param6']);
        expect(requestMethod).toBe('GET');
    }));
});
