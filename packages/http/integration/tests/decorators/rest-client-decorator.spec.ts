import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/http';
import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Any } from '@angular-ru/common/typings';
import { RestClient } from '@angular-ru/http/decorators';
import { Nullable } from '@angular-ru/common/typings';
describe('[TEST]: HTTP decorators for client', () => {
    const MOCK_API: string = 'http://localhost';
    let client: Nullable<ApiGithubClient> = null;
    let httpMock: HttpTestingController;
    let req: TestRequest;

    @Injectable()
    @RestClient('hello')
    class ApiGithubClient extends DataHttpClient {}

    @Component({
        selector: 'events',
        template: ''
    })
    class GithubComponent {
        constructor(public readonly api: ApiGithubClient) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GithubComponent],
            imports: [CommonModule, HttpClientTestingModule, DataHttpClientModule.forRoot([ApiGithubClient])]
        });

        TestBed.compileComponents();
        client = TestBed.inject(ApiGithubClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be correct send GET request', fakeAsync(() => {
        client?.get('api-get').subscribe((response: Any[]) => {
            expect(response).toEqual([{ hello: 'world' }]);
            expect(req.request.method).toEqual('GET');
        });

        req = httpMock.expectOne(`${MOCK_API}/hello/api-get`);
        req.flush([{ hello: 'world' }]);

        tick(100);
    }));

    afterEach(() => {
        httpMock.verify();
    });
});
