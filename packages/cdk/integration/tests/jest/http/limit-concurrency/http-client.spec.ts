import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { RestClient } from '@angular-ru/cdk/http/decorators';
import { Nullable } from '@angular-ru/cdk/typings';
import { Any } from '@angular-ru/cdk/typings/any';

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

    interface RequestParams {
        api: string;
        url: string;
        delay: number;
        response: string;
    }

    const api0: string = 'api-0';
    const api1: string = 'api-1';
    const api2: string = 'api-2';
    const api3: string = 'api-3';
    const api4: string = 'api-4';

    const requestList: RequestParams[] = [
        {
            api: api0,
            url: `${baseUrl}/${api0}`,
            delay: 5000,
            response: api0
        },
        {
            api: api1,
            url: `${baseUrl}/${api1}`,
            delay: 1000,
            response: api1
        },
        {
            api: api2,
            url: `${baseUrl}/${api2}`,
            delay: 3000,
            response: api2
        },
        {
            api: api3,
            url: `${baseUrl}/${api3}`,
            delay: 1000,
            response: api3
        },
        {
            api: api4,
            url: `${baseUrl}/${api4}`,
            delay: 2000,
            response: api4
        }
    ];

    let req0: TestRequest;
    let req1: TestRequest;
    let req2: TestRequest;
    let req3: TestRequest;
    let req4: TestRequest;

    @Injectable()
    @RestClient(restClient)
    class MyClient extends DataHttpClient {}

    interface HttpServices {
        client: MyClient;
        httpMock: HttpTestingController;
    }

    beforeEach(() => {
        responseOrder = [];
        expectOrder = [];
    });

    afterEach(() => {
        httpMock.verify();
    });

    function configureTestingModule(limitConcurrency?: number): HttpServices {
        const options: Any = limitConcurrency != null || limitConcurrency === 0 ? { limitConcurrency } : {};

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

    it('should throw an error if limitConcurrency = 0', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(0));
        expect(() => generateRequests(3)).toThrow(new Error('Limit concurrency should be more than 0'));
    }));

    it('requests must complete in a right order: Limit Concurrency = 1', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(1));

        expectOrder = [requestList[0]!.response, requestList[1]!.response, requestList[2]!.response];

        generateRequests(3);

        req0 = httpMock.expectOne(requestList[0]!.url);
        httpMock.expectNone(requestList[1]!.url);
        httpMock.expectNone(requestList[2]!.url);

        setTimeout(() => {
            req0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);
        tick(requestList[0]!.delay);

        req1 = httpMock.expectOne(requestList[1]!.url);
        setTimeout(() => {
            req1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);
        tick(requestList[1]!.delay);

        req2 = httpMock.expectOne(requestList[2]!.url);
        setTimeout(() => {
            req2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);
        tick(requestList[2]!.delay);

        responseOrder.forEach((item: string, index: number): void => {
            expect(item).toEqual(expectOrder[index]);
        });
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

        req0 = httpMock.expectOne(requestList[0]!.url);
        req1 = httpMock.expectOne(requestList[1]!.url);
        req2 = httpMock.expectOne(requestList[2]!.url);
        httpMock.expectNone(requestList[3]!.url);
        httpMock.expectNone(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);

        tick(1100);

        req3 = httpMock.expectOne(requestList[3]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req3.flush(requestList[3]!.response);
        }, requestList[3]!.delay);

        tick(1100);

        req4 = httpMock.expectOne(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req4.flush(requestList[4]!.response);
        }, requestList[4]!.delay);

        tick(3000);

        responseOrder.forEach((item: string, index: number): void => {
            expect(item).toEqual(expectOrder[index]);
        });
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

        req0 = httpMock.expectOne(requestList[0]!.url);
        req1 = httpMock.expectOne(requestList[1]!.url);
        req2 = httpMock.expectOne(requestList[2]!.url);
        req3 = httpMock.expectOne(requestList[3]!.url);
        req4 = httpMock.expectOne(requestList[4]!.url);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req0.flush(requestList[0]!.response);
        }, requestList[0]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req1.flush(requestList[1]!.response);
        }, requestList[1]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req2.flush(requestList[2]!.response);
        }, requestList[2]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req3.flush(requestList[3]!.response);
        }, requestList[3]!.delay);

        // noinspection DuplicatedCode
        setTimeout(() => {
            req4.flush(requestList[4]!.response);
        }, requestList[4]!.delay);

        tick(5100);

        responseOrder.forEach((item: string, index: number): void => {
            expect(item).toEqual(expectOrder[index]);
        });
    }));

    it(`limit concurrency by default should be ${defaultLimit}`, fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule());

        for (let i = 0; i < defaultLimit + exceedTheLimit; i++) {
            client?.get(`api-${i}`).subscribe();
        }

        for (let i = 0; i < defaultLimit; i++) {
            const result = httpMock.expectOne(`${apiUrl}-${i}`);

            expect(result.request.url).toEqual(`${apiUrl}-${i}`);
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
            const result = httpMock.expectOne(`${apiUrl}-${i}`);

            expect(result.request.url).toEqual(`${apiUrl}-${i}`);
        }
    }));
});
