import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DataHttpClient, DataHttpClientModule } from '@angular-ru/cdk/http';
import { Get, RestClient } from '@angular-ru/cdk/http/decorators';
import { Nullable } from '@angular-ru/cdk/typings';
import { Observable, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

describe('[TEST]: Canceling requests and unsubscribing', () => {
    const mockApi: string = 'http://localhost';
    const restClient: string = 'hello';
    const api: string = 'api_';
    const apiUrl: string = `${mockApi}/${restClient}/${api}`;
    const countRequests: number = 10;
    const limitConcurrency: number = 5;

    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: TestComponent;
    let httpMock: HttpTestingController;
    const active: TestRequest[] = [];
    const queue: TestRequest[] = [];
    let req: TestRequest;

    @Injectable()
    @RestClient(restClient)
    class ApiClient extends DataHttpClient {
        @Get(`${api}0`) public getData_0(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}1`) public getData_1(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}2`) public getData_2(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}3`) public getData_3(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}4`) public getData_4(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}5`) public getData_5(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}6`) public getData_6(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}7`) public getData_7(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}8`) public getData_8(): Observable<string> {
            return this.emulate();
        }

        @Get(`${api}9`) public getData_9(): Observable<string> {
            return this.emulate();
        }

        private emulate(): Observable<string> {
            return this.restTemplate<string>().pipe(delay(2000));
        }
    }

    @Component({
        selector: '',
        template: ''
    })
    class TestComponent implements OnInit, OnDestroy {
        private destroy$: Subject<boolean> = new Subject<boolean>();
        constructor(public readonly _api: ApiClient) {}
        public ngOnInit(): void {
            this.generateRequests();
        }

        public ngOnDestroy(): void {
            this.destroy$.next(true);
            this.destroy$.complete();
        }

        private generateRequests(): void {
            this._api.getData_0().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_1().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_2().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_3().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_4().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_5().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_6().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_7().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_8().pipe(takeUntil(this.destroy$)).subscribe();
            this._api.getData_9().pipe(takeUntil(this.destroy$)).subscribe();
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule,
                DataHttpClientModule.forRoot([ApiClient], { limitConcurrency })
            ]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('all requests must be canceled when the component is destroyed', fakeAsync(() => {
        component.ngOnInit();
        for (let i = 0; i < limitConcurrency; i++) {
            req = httpMock.expectOne(`${apiUrl}${i}`);
            active.push(req);
        }
        for (let i = limitConcurrency; i < countRequests; i++) {
            httpMock.expectNone(`${apiUrl}${i}`);
        }
        component.ngOnDestroy();
        for (let i = limitConcurrency; i < countRequests; i++) {
            req = httpMock.expectOne(`${apiUrl}${i}`);
            queue.push(req);
        }
        active.forEach((item: TestRequest): void => {
            expect(item.cancelled).toBe(true);
        });
        queue.forEach((item: TestRequest): void => {
            expect(item.cancelled).toBe(true);
        });
    }));

    afterEach(() => {
        httpMock.verify();
    });
});
