import { LimitConcurrencyService } from '../../../src/services/limit-concurency.service';
import { cold } from 'jasmine-marbles';
import { merge } from 'rxjs';
import { Any } from '@angular-ru/common/typings/any';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { RestClient } from '@angular-ru/http/decorators';

describe('[TEST]: HTTP Limit Concurrency Service with Marbel', () => {
    const limit: number = 3;
    const TEST_DATA: Any = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
        d: 'DDD',
        e: 'EEE'
    };
    let service: LimitConcurrencyService;

    beforeEach(() => {
        service = new LimitConcurrencyService();
    });

    it('should throw an error if limitConcurrency = 0', () => {
        const expected$ = cold('-a|', TEST_DATA);
        expect(() => service.queue(expected$, 0)).toThrow(new Error('Limit concurrency should be more than 0'));
    });

    it('should throw an error if limitConcurrency = -1', () => {
        const expected$ = cold('-a|', TEST_DATA);
        expect(() => service.queue(expected$, -1)).toThrow(new Error('Limit concurrency should be more than 0'));
    });

    it('should return Observable with the same data', () => {
        const expected$ = cold('1s-a-b|', TEST_DATA);
        expect(service.queue(expected$, 1)).toBeObservable(expected$);
    });

    it('should run all Observables in parallel if the limit allows', () => {
        const request_1$ = cold('-----a|', TEST_DATA);
        const request_2$ = cold('-b|', TEST_DATA);
        const request_3$ = cold('---c|', TEST_DATA);
        const expected$ = cold('-b-c-a|', TEST_DATA);

        const mergedObservable = merge(
            service.queue(request_1$, limit),
            service.queue(request_2$, limit),
            service.queue(request_3$, limit)
        );

        expect(mergedObservable).toBeObservable(expected$);
    });

    it('should wait until one observable complete before start another if limit is reached', () => {
        const request_1$ = cold('-----a|', TEST_DATA);
        const request_2$ = cold('-b|', TEST_DATA);
        const expected$ = cold('-----a-b|', TEST_DATA);

        const mergedObservable = merge(service.queue(request_1$, 1), service.queue(request_2$, 1));

        expect(mergedObservable).toBeObservable(expected$);
    });

    it('maximum of 3 Observables must be executed in parallel. And immediately start the next one if one of them is completed', () => {
        const request_1$ = cold('---------------------a|', TEST_DATA);
        const request_2$ = cold('----b|', TEST_DATA);
        const request_3$ = cold('--------------c|', TEST_DATA);
        const request_4$ = cold('----d|', TEST_DATA);
        const request_5$ = cold('-------e|', TEST_DATA);
        const expected$ = cold('----b----d----c--e---a|', TEST_DATA);

        const mergedObservable$ = merge(
            service.queue(request_1$, limit),
            service.queue(request_2$, limit),
            service.queue(request_3$, limit),
            service.queue(request_4$, limit),
            service.queue(request_5$, limit)
        );

        expect(mergedObservable$).toBeObservable(expected$);
    });
});

describe('[TEST]: HTTP Limit Concurrency Service with Client API', () => {
    const mockApi: string = 'http://localhost';
    const restClient: string = 'hello';
    const baseUrl: string = `${mockApi}/${restClient}`;
    let responseOrder: string[] = [];
    let expectOrder: string[] = [];
    let client: MyClient | null = null;
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
        responseOrder.forEach((item: string, index: number): void => {
            expect(item).toEqual(expectOrder[index]);
        });
        httpMock.verify();
    });

    function configureTestingModule(limitConcurrency: number): HttpServices {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                DataHttpClientModule.forRoot([MyClient], { limitConcurrency: limitConcurrency })
            ]
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

    it('requests must complete in a right order: Limit Concurrency = 0', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(0));

        expectOrder = [requestList[1].response, requestList[2].response, requestList[0].response];

        generateRequests(3);

        req_0 = httpMock.expectOne(requestList[0].url);
        req_1 = httpMock.expectOne(requestList[1].url);
        req_2 = httpMock.expectOne(requestList[2].url);

        setTimeout(() => {
            req_0.flush(requestList[0].response);
        }, requestList[0].delay);
        setTimeout(() => {
            req_1.flush(requestList[1].response);
        }, requestList[1].delay);
        setTimeout(() => {
            req_2.flush(requestList[2].response);
        }, requestList[2].delay);

        tick(5100);
    }));

    it('requests must complete in a right order: Limit Concurrency = 1', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(1));

        expectOrder = [requestList[0].response, requestList[1].response, requestList[2].response];

        generateRequests(3);

        req_0 = httpMock.expectOne(requestList[0].url);
        httpMock.expectNone(requestList[1].url);
        httpMock.expectNone(requestList[2].url);

        setTimeout(() => {
            req_0.flush(requestList[0].response);
        }, requestList[0].delay);
        tick(requestList[0].delay);

        req_1 = httpMock.expectOne(requestList[1].url);
        setTimeout(() => {
            req_1.flush(requestList[1].response);
        }, requestList[1].delay);
        tick(requestList[1].delay);

        req_2 = httpMock.expectOne(requestList[2].url);
        setTimeout(() => {
            req_2.flush(requestList[2].response);
        }, requestList[2].delay);
        tick(requestList[2].delay);
    }));

    it('requests must complete in a right order: Limit Concurrency = 3', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(3));

        expectOrder = [
            requestList[1].response,
            requestList[3].response,
            requestList[2].response,
            requestList[4].response,
            requestList[0].response
        ];

        generateRequests(5);

        req_0 = httpMock.expectOne(requestList[0].url);
        req_1 = httpMock.expectOne(requestList[1].url);
        req_2 = httpMock.expectOne(requestList[2].url);
        httpMock.expectNone(requestList[3].url);
        httpMock.expectNone(requestList[4].url);

        setTimeout(() => {
            req_0.flush(requestList[0].response);
        }, requestList[0].delay);
        setTimeout(() => {
            req_1.flush(requestList[1].response);
        }, requestList[1].delay);
        setTimeout(() => {
            req_2.flush(requestList[2].response);
        }, requestList[2].delay);

        tick(1100);

        req_3 = httpMock.expectOne(requestList[3].url);
        setTimeout(() => {
            req_3.flush(requestList[3].response);
        }, requestList[3].delay);

        tick(1100);

        req_4 = httpMock.expectOne(requestList[4].url);
        setTimeout(() => {
            req_4.flush(requestList[4].response);
        }, requestList[4].delay);

        tick(3000);
    }));

    it('requests must complete in a right order: Limit Concurrency = 5', fakeAsync(() => {
        ({ client, httpMock } = configureTestingModule(5));

        expectOrder = [
            requestList[1].response,
            requestList[3].response,
            requestList[4].response,
            requestList[2].response,
            requestList[0].response
        ];

        generateRequests(5);

        req_0 = httpMock.expectOne(requestList[0].url);
        req_1 = httpMock.expectOne(requestList[1].url);
        req_2 = httpMock.expectOne(requestList[2].url);
        req_3 = httpMock.expectOne(requestList[3].url);
        req_4 = httpMock.expectOne(requestList[4].url);

        setTimeout(() => {
            req_0.flush(requestList[0].response);
        }, requestList[0].delay);
        setTimeout(() => {
            req_1.flush(requestList[1].response);
        }, requestList[1].delay);
        setTimeout(() => {
            req_2.flush(requestList[2].response);
        }, requestList[2].delay);
        setTimeout(() => {
            req_3.flush(requestList[3].response);
        }, requestList[3].delay);
        setTimeout(() => {
            req_4.flush(requestList[4].response);
        }, requestList[4].delay);

        tick(5100);
    }));
});
