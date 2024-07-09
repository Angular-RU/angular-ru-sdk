import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {NgxsDataTestingModule} from '@angular-ru/ngxs/testing';
import {NgxsDataAfterReset, NgxsDataDoCheck} from '@angular-ru/ngxs/typings';
import {State} from '@ngxs/store';

describe('[TEST]: NgxsTestingModule', () => {
    describe('appState', () => {
        const events: string[] = [];

        @StateRepository()
        @State({
            name: 'app',
            defaults: 0,
        })
        @Injectable()
        class AppState
            extends NgxsDataRepository<number>
            implements NgxsDataDoCheck, NgxsDataAfterReset
        {
            @DataAction()
            public increment(): void {
                this.ctx.setState((state: number) => state + 1);
                events.push(`${this.name}::increment`);
            }

            public override ngxsOnChanges(): void {
                events.push(`${this.name}::ngxsOnChanges`);
                super.ngxsOnChanges();
            }

            public override ngxsOnInit(): void {
                events.push(`${this.name}::ngxsOnInit`);
                super.ngxsOnInit();
            }

            public ngxsDataDoCheck(): void {
                events.push(`${this.name}::ngxsDataDoCheck`);
            }

            public ngxsDataAfterReset(): void {
                events.push(`${this.name}::ngxsDataAfterReset`);
            }

            public override ngxsAfterBootstrap(): void {
                events.push(`${this.name}::ngxsAfterBootstrap`);
                super.ngxsAfterBootstrap();
            }
        }

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NgxsDataTestingModule.forRoot([AppState])],
            });
        });

        it('should be correct bootstrap ngxs testing', () => {
            NgxsDataTestingModule.ngxsInitPlatform();
            const app: AppState = TestBed.inject(AppState);

            app.increment();
            app.increment();

            expect(app.getState()).toBe(2);

            app.reset();

            app.increment();
            app.increment();
            app.increment();

            expect(app.getState()).toBe(3);

            app.reset();

            expect(events).toEqual([
                'app::ngxsOnChanges',
                'app::ngxsOnInit',
                'app::ngxsAfterBootstrap',
                'app::ngxsDataDoCheck',
                'app::ngxsOnChanges',
                'app::increment',
                'app::ngxsOnChanges',
                'app::increment',
                'app::ngxsOnChanges',
                'app::ngxsDataAfterReset',
                'app::ngxsOnChanges',
                'app::ngxsDataDoCheck',
                'app::increment',
                'app::ngxsOnChanges',
                'app::increment',
                'app::ngxsOnChanges',
                'app::increment',
                'app::ngxsOnChanges',
                'app::ngxsDataAfterReset',
            ]);
        });
    });
});
