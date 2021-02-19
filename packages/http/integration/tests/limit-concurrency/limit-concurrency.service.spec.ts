import { LimitConcurrencyService } from '../../../src/services/limit-concurency.service';
import { cold } from 'jasmine-marbles';
import { merge } from 'rxjs';
import { Any } from '@angular-ru/common/typings/any';
import { fakeAsync } from '@angular/core/testing';

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
        expect(() => service.add(expected$, 0)).toThrow(new Error('Limit concurrency should be more than 0'));
    });

    it('should throw an error if limitConcurrency = -1', () => {
        const expected$ = cold('-a|', TEST_DATA);
        expect(() => service.add(expected$, -1)).toThrow(new Error('Limit concurrency should be more than 0'));
    });

    it('should run all Observables in parallel if there is no limit Infinity', () => {
        const request_1$ = cold('-----a|', TEST_DATA);
        const request_2$ = cold('-b|', TEST_DATA);
        const request_3$ = cold('---c|', TEST_DATA);
        const expected$ = cold('-b-c-a|', TEST_DATA);

        const mergedObservable = merge(
            service.add(request_1$, Infinity),
            service.add(request_2$, Infinity),
            service.add(request_3$, Infinity)
        );

        expect(mergedObservable).toBeObservable(expected$);
    });

    it('should return Observable with the same data', () => {
        const expected$ = cold('1s-a-b|', TEST_DATA);
        expect(service.add(expected$, 1)).toBeObservable(expected$);
    });

    it('should run all Observables in parallel if the limit allows', () => {
        const request_1$ = cold('-----a|', TEST_DATA);
        const request_2$ = cold('-b|', TEST_DATA);
        const request_3$ = cold('---c|', TEST_DATA);
        const expected$ = cold('-b-c-a|', TEST_DATA);

        const mergedObservable = merge(
            service.add(request_1$, limit),
            service.add(request_2$, limit),
            service.add(request_3$, limit)
        );

        expect(mergedObservable).toBeObservable(expected$);
    });

    it('should wait until one observable complete before start another if limit is reached', () => {
        const request_1$ = cold('-----a|', TEST_DATA);
        const request_2$ = cold('-b|', TEST_DATA);
        const expected$ = cold('-----a-b|', TEST_DATA);

        const mergedObservable = merge(service.add(request_1$, 1), service.add(request_2$, 1));

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
            service.add(request_1$, limit),
            service.add(request_2$, limit),
            service.add(request_3$, limit),
            service.add(request_4$, limit),
            service.add(request_5$, limit)
        );

        expect(mergedObservable$).toBeObservable(expected$);
    });
});
