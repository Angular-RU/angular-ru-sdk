import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Component, Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
    DATA_HTTP_CLIENT_INTERCEPTOR,
    DataHttpClient,
    DataHttpClientModule,
    DefaultHttpClientInterceptor
} from '@angular-ru/cdk/http';
import { RestClient } from '@angular-ru/cdk/http/decorators';
import { DataBeforeRequestOptions, DataHttpInterceptor } from '@angular-ru/cdk/http/typings';
import { Nullable } from '@angular-ru/cdk/typings';

import { MetaDataRequest } from '../../../http/typings/src/interfaces/meta-data-request';
import { HttpMockInterceptor } from '../helpers/http-mock-interceptor';

describe('[TEST]: HTTP Intercept Client', () => {
    const MOCK_API: string = 'http://localhost';
    let client: Nullable<ApiEventsClient> = null;
    let httpMock: HttpTestingController;
    let request: TestRequest;

    @Injectable()
    @RestClient()
    class ApiEventsClient extends DataHttpClient<MyInterceptor> {}

    @Component({
        selector: 'events',
        template: ''
    })
    class EventsComponent {
        constructor(public readonly api: ApiEventsClient) {}
    }

    @Injectable()
    class MyInterceptor extends DefaultHttpClientInterceptor implements DataHttpInterceptor {
        public events: string[] = [];

        public onBeforeRequest(options: DataBeforeRequestOptions): void {
            this.events.push(`{onBeforeRequest} ${options.method.toUpperCase()} request: /${options.path}`);
        }

        public onInterceptHttpParams(_options: DataBeforeRequestOptions, httpParams: HttpParams): HttpParams {
            this.events.push(`{onInterceptHttpParams} httpParams: ${httpParams.toString()}`);

            return httpParams;
        }

        public onInterceptHttpHeaders(_options: DataBeforeRequestOptions, headers: HttpHeaders): HttpHeaders {
            this.events.push(`{onInterceptHttpHeaders} headers keys[]: ${headers.keys()}`);

            return headers;
        }

        public onInterceptBodyPayload<T>(_options: DataBeforeRequestOptions, body: T): T {
            this.events.push(`{onInterceptBodyPayload} body: ${JSON.stringify(body)}`);

            return body;
        }

        public onTapAfterRequest(response: any[], meta: MetaDataRequest): void {
            this.events.push(`{onTapAfterRequest} response(${meta.url}): ${JSON.stringify(response)}`);
        }

        public onEmitSuccess(response: unknown, _options: DataBeforeRequestOptions, meta: MetaDataRequest): void {
            this.events.push(`{onEmitSuccess} response(${meta.url}): ${JSON.stringify(response)}`);
        }

        public onEmitFailure(
            error: HttpErrorResponse,
            _options: DataBeforeRequestOptions,
            meta: MetaDataRequest
        ): void {
            this.events.push(`{onEmitFailure} error(${meta.url}): ${error.message}`);
        }

        public onErrorAfterRequest(error: HttpErrorResponse, meta: MetaDataRequest): void {
            this.events.push(`{onErrorAfterRequest} error(${meta.url}): ${error.message}`);
        }

        public onFinalizeAfterRequest(meta: MetaDataRequest): void {
            this.events.push(`{onFinalizeAfterRequest} ${meta.method} - ${meta.url}`);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpMockInterceptor,
                    multi: true
                },
                {
                    provide: DATA_HTTP_CLIENT_INTERCEPTOR,
                    useClass: MyInterceptor
                }
            ],
            declarations: [EventsComponent],
            imports: [CommonModule, HttpClientTestingModule, DataHttpClientModule.forRoot([ApiEventsClient])]
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiEventsClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should be correct GET intercept', fakeAsync(() => {
        client
            ?.get('api-get', { queryParams: { value: 1 }, headers: { Authorization: 'token xxx', KeepAlive: 'true' } })
            .subscribe((response: any[]) => {
                expect(response).toEqual([{ hello: 'world' }]);
                expect(request.request.method).toBe('GET');
            });

        request = httpMock.expectOne(`${MOCK_API}/api-get?value=1`);
        request.flush([{ hello: 'world' }]);

        tick(100);

        expect(client?.interceptor?.events).toEqual([
            '{onBeforeRequest} GET request: /api-get',
            '{onInterceptBodyPayload} body: null',
            '{onInterceptHttpHeaders} headers keys[]: Authorization,KeepAlive',
            '{onInterceptHttpParams} httpParams: value=1',
            '{onTapAfterRequest} response(http://localhost/api-get): [{"hello":"world"}]',
            '{onFinalizeAfterRequest} get - http://localhost/api-get'
        ]);
    }));

    it('should be correct POST intercept', fakeAsync(() => {
        client?.post('api-post', { baseUrl: 'backend', body: { a: undefined, b: 2, c: 3 } }).subscribe({
            error: (error: unknown) => {
                expect((error as HttpErrorResponse).status).toBe(400);
                expect((error as HttpErrorResponse).statusText).toBe('Bad Request');
            }
        });

        request = httpMock.expectOne(`${MOCK_API}/backend/api-post`);
        request.flush(
            { data: null, result: { code: 99, message: 'internal error' } },
            { status: 400, statusText: 'Bad Request' }
        );

        tick(100);

        expect(client?.interceptor?.events).toEqual([
            '{onBeforeRequest} POST request: /api-post',
            '{onInterceptBodyPayload} body: {"b":2,"c":3}',
            '{onInterceptHttpHeaders} headers keys[]: ',
            '{onInterceptHttpParams} httpParams: ',
            '{onEmitFailure} error(http://localhost/backend/api-post): Http failure response for http://localhost/backend/api-post: 400 Bad Request',
            '{onErrorAfterRequest} error(http://localhost/backend/api-post): Http failure response for http://localhost/backend/api-post: 400 Bad Request',
            '{onFinalizeAfterRequest} post - http://localhost/backend/api-post'
        ]);
    }));
});
