import { LimitConcurrencyService } from '../../../src/services/limit-concurency.service';
import { merge } from 'rxjs';
import { Any } from '@angular-ru/common/typings';
import { TestScheduler } from 'rxjs/testing';

describe('[TEST]: HTTP limit concurrency service with Marble', () => {
    let service: LimitConcurrencyService;
    let testScheduler: TestScheduler;

    const TEST_DATA: Any = {
        a: 'AAA',
        b: 'BBB',
        c: 'CCC',
        d: 'DDD',
        e: 'EEE'
    };

    beforeEach(() => {
        service = new LimitConcurrencyService();
        testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    });

    describe('Infinity', () => {
        const limitConcurrency: number = Infinity;

        it('should run all Observables in parallel if there is no limit Infinity', () => {
            // noinspection DuplicatedCode
            testScheduler.run(({ cold, expectObservable }) => {
                const request_1$ = cold('-----a|', TEST_DATA);
                const request_2$ = cold('-b|', TEST_DATA);
                const request_3$ = cold('---c|', TEST_DATA);

                const mergedObservable = merge(
                    service.add(request_1$, limitConcurrency),
                    service.add(request_2$, limitConcurrency),
                    service.add(request_3$, limitConcurrency)
                );

                expectObservable(mergedObservable).toBe('-b-c-a|', TEST_DATA);
            });
        });
    });

    describe('limitConcurrency = -1', () => {
        const limitConcurrency: number = -1;

        it('should throw an error if limitConcurrency = -1', () => {
            testScheduler.run(({ cold }) => {
                const expected$ = cold('-a|', TEST_DATA);
                expect(() => service.add(expected$, limitConcurrency)).toThrow(
                    new Error('Limit concurrency should be more than 0')
                );
            });
        });
    });

    describe('limitConcurrency = 0', () => {
        const limitConcurrency: number = 0;

        it('should throw an error if limitConcurrency = 0', () => {
            testScheduler.run(({ cold }) => {
                const expected$ = cold('-a|', TEST_DATA);
                expect(() => service.add(expected$, limitConcurrency)).toThrow(
                    new Error('Limit concurrency should be more than 0')
                );
            });
        });
    });

    describe('limitConcurrency = 1', () => {
        const limitConcurrency: number = 1;

        it('should return Observable with the same data', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const expected$ = cold('1s-a-b|', TEST_DATA);
                expectObservable(service.add(expected$, limitConcurrency)).toBe('1s-a-b|', TEST_DATA);
            });
        });

        it('should wait until one observable complete before start another if limit is reached', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const request_1$ = cold('-----a|', TEST_DATA);
                const request_2$ = cold('-b|', TEST_DATA);

                const mergedObservable = merge(service.add(request_1$, limitConcurrency), service.add(request_2$, 1));
                expectObservable(mergedObservable).toBe('-----a-b|', TEST_DATA);
            });
        });
    });

    describe('limitConcurrency = 3', () => {
        const limitConcurrency: number = 3;

        it('should run all Observables in parallel if the limit allows', () => {
            // noinspection DuplicatedCode
            testScheduler.run(({ cold, expectObservable }) => {
                const request_1$ = cold('-----a|', TEST_DATA);
                const request_2$ = cold('-b|', TEST_DATA);
                const request_3$ = cold('---c|', TEST_DATA);

                const mergedObservable = merge(
                    service.add(request_1$, limitConcurrency),
                    service.add(request_2$, limitConcurrency),
                    service.add(request_3$, limitConcurrency)
                );

                expectObservable(mergedObservable).toBe('-b-c-a|', TEST_DATA);
            });
        });

        it('maximum of 3 Observables must be executed in parallel. And immediately start the next one if one of them is completed', () => {
            testScheduler.run(({ cold, expectObservable }) => {
                const request_1$ = cold('---------------------a|', TEST_DATA);
                const request_2$ = cold('----b|', TEST_DATA);
                const request_3$ = cold('--------------c|', TEST_DATA);
                const request_4$ = cold('----d|', TEST_DATA);
                const request_5$ = cold('-------e|', TEST_DATA);

                const mergedObservable$ = merge(
                    service.add(request_1$, limitConcurrency),
                    service.add(request_2$, limitConcurrency),
                    service.add(request_3$, limitConcurrency),
                    service.add(request_4$, limitConcurrency),
                    service.add(request_5$, limitConcurrency)
                );

                expectObservable(mergedObservable$).toBe('----b----d----c--e---a|', TEST_DATA);
            });
        });
    });
});
