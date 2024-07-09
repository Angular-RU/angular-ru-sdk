import {CommonModule} from '@angular/common';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest,
} from '@angular/common/http/testing';
import {Component, Injectable} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DataHttpClient, DataHttpClientModule} from '@angular-ru/cdk/http';
import {RestClient} from '@angular-ru/cdk/http/decorators';
import {Nullable} from '@angular-ru/cdk/typings';

describe('[TEST]: HTTP decorators for client', () => {
    const MOCK_API: string = 'http://localhost';
    let client: Nullable<ApiGithubClient> = null;
    let httpMock: HttpTestingController;
    let request: TestRequest;

    @Injectable()
    @RestClient('hello')
    class ApiGithubClient extends DataHttpClient {}

    @Component({
        selector: 'events',
        template: '',
    })
    class GithubComponent {
        constructor(public readonly api: ApiGithubClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GithubComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                DataHttpClientModule.forRoot([ApiGithubClient]),
            ],
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiGithubClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should be correct send GET request', fakeAsync(() => {
        client?.get('api-get').subscribe((response: any[]) => {
            expect(response).toEqual([{hello: 'world'}]);
            expect(request.request.method).toBe('GET');
        });

        request = httpMock.expectOne(`${MOCK_API}/hello/api-get`);
        request.flush([{hello: 'world'}]);

        tick(100);
    }));
});
