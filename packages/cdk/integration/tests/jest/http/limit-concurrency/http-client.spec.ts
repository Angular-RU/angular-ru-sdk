import { Any } from '@angular-ru/cdk/typings/any';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { RestClient } from '@angular-ru/cdk/http/decorators';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { Nullable } from '@angular-ru/cdk/typings';
describe('[TEST]: HTTP Limit Concurrency Service with Client API', () => {
    const mockApi: string = 'http://localhost';
    const restClient: string = 'hello';
    const baseUrl: string = `${mockApi}/${restClient}`;
    const api: string = 'api';
    const apiUrl: string = `${baseUrl}/${api}`;
    const defaultLimit: number = 255;
    const exceedTheLimit: number = 10;

    let responseOrder: string[] = [];
    let expectOrder: string[] = [];
    let client: Nullable<MyClient> = null;
    let httpMock: HttpTestingController;

    type RequestParams = {
        api: string;
        url: string;
        delay: number;
        response: string;
    };

    const api_0: string = 'api-0';
    const api_1: string = 'api-1';
    const api_2: string = 'api-2';
    const api_3: string = 'api-3';
    const api_4: string = 'api-4';

    const requestList: RequestParams[] = [
        {
            api: api_0,
            url: `${baseUrl}/${api_0}`,
            delay: 5000,
            response: api_0
        },
        {
            api: api_1,
            url: `${baseUrl}/${api_1}`,
            delay: 1000,
            response: api_1
        },
        {
            api: api_2,
            url: `${baseUrl}/${api_2}`,
            delay: 3000,
            response: api_2
        },
        {
            api: api_3,
            url: `${baseUrl}/${api_3}`,
            delay: 1000,
            response: api_3
        },
        {
            api: api_4,
            url: `${baseUrl}/${api_4}`,
            delay: 2000,
            response: api_4
        }
    ];

    let req_0: TestRequest;
    let req_1: TestRequest;
    let req_2: TestRequest;
    let req_3: TestRequest;
    let req_4: TestRequest;

    @Injectable()
    @RestClient(restClient)
    class MyClient extends DataHttpClient {}

    type HttpServices = {
        client: MyClient;
        httpMock: HttpTestingController;
    };

    beforeEach(() => {
        responseOrder = [];
        expectOrder = [];
    });

    afterEach(() => {
        httpMock.verify();
    });

    function configureTestingModule(limitConcurrency?: number): HttpServices {
        const options: Any = limitConcurrency || limitConcurrency === 0 ? { limitConcurrency: limitConcurrency } : {};
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, DataHttpClientModule.forRoot([MyClient], options)]
        });
        return {
            client: TestBed.inject(MyClient),
            httpMock: TestBed.inject(HttpTestingController)
        };
    }

    function generateRequests(limit: number): void {
        requestList.slice(0, limit).forEach((params: RequestParams): void => {
            client?.get(params.api).subscribe((response: Any) => {
                responseOrder.push(response);
            });
        });
    }

    function expectResponseOrder(): void {
        responseOrder.forEach((item: string, index: number): void => {
            expect(item).toEqual(expectOrder[index]);
        });
    }

    it('should throw an error if limitConcurrency = 0', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(0));
        expect(() => generateRequests(3)).toThrow(new Error('Limit concurrency should be more than 0'));
    }));

    it('requests must complete in a right order: Limit Concurrency = 1', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(1));

        expectOrder = [requestList[0]!.response, requestList[1]!.response, requestList[2]!.response];

        generateRequests(3);

        req_0 = httpMock.expectOne(requestList[0]!.url);
        httpMock.expectNone(requestList[1]!.url);
        httpMock.expectNone(requestList[2]!.url);

        setTimeout(() => {
            req_0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);
        tick(requestList[0]!.delay);

        req_1 = httpMock.expectOne(requestList[1]!.url);
        setTimeout(() => {
            req_1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);
        tick(requestList[1]!.delay);

        req_2 = httpMock.expectOne(requestList[2]!.url);
        setTimeout(() => {
            req_2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);
        tick(requestList[2]!.delay);

        expectResponseOrder();
    }));

    it('requests must complete in a right order: Limit Concurrency = 3', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(3));

        expectOrder = [
            requestList[1]!.response,
            requestList[3]!.response,
            requestList[2]!.response,
            requestList[4]!.response,
            requestList[0]!.response
        ];

        generateRequests(5);

        req_0 = httpMock.expectOne(requestList[0]!.url);
        req_1 = httpMock.expectOne(requestList[1]!.url);
        req_2 = httpMock.expectOne(requestList[2]!.url);
        httpMock.expectNone(requestList[3]!.url);
        httpMock.expectNone(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);

        tick(1100);

        req_3 = httpMock.expectOne(requestList[3]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_3.flush(requestList[3]!.response);
        }, requestList[3]!.delay);

        tick(1100);

        req_4 = httpMock.expectOne(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_4.flush(requestList[4]!.response);
        }, requestList[4]!.delay);

        tick(3000);

        expectResponseOrder();
    }));

    it('requests must complete in a right order: Limit Concurrency = 5', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(5));

        expectOrder = [
            requestList[1]!.response,
            requestList[3]!.response,
            requestList[4]!.response,
            requestList[2]!.response,
            requestList[0]!.response
        ];

        generateRequests(5);

        req_0 = httpMock.expectOne(requestList[0]!.url);
        req_1 = httpMock.expectOne(requestList[1]!.url);
        req_2 = httpMock.expectOne(requestList[2]!.url);
        req_3 = httpMock.expectOne(requestList[3]!.url);
        req_4 = httpMock.expectOne(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_3.flush(requestList[3]!.response);
        }, requestList[3]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req_4.flush(requestList[4]!.response);
        }, requestList[4]!.delay);

        tick(5100);

        expectResponseOrder();
    }));

    it(`limit concurrency by default should be ${defaultLimit}`, fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule());
        for (let i = 0; i < defaultLimit + exceedTheLimit; i++) {
            client?.get(`api-${i}`).subscribe();
        }
        for (let i = 0; i < defaultLimit; i++) {
            httpMock.expectOne(`${apiUrl}-${i}`);
        }
        for (let i = defaultLimit; i < defaultLimit + exceedTheLimit; i++) {
            httpMock.expectNone(`${apiUrl}-${i}`);
        }
    }));

    it(`should be no limits if LimitConcurrency is Infinity`, fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(Infinity));
        for (let i = 0; i < defaultLimit + exceedTheLimit; i++) {
            client?.get(`api-${i}`).subscribe();
        }
        for (let i = 0; i < defaultLimit + exceedTheLimit; i++) {
            httpMock.expectOne(`${apiUrl}-${i}`);
        }
    }));
});
