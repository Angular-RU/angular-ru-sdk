import {DOCUMENT} from '@angular/common';
import {
    AfterViewInit,
    ApplicationRef,
    Component,
    Injectable,
    NgModule,
    OnInit,
} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {
    BrowserModule,
    ɵBrowserDomAdapter as BrowserDomAdapter,
} from '@angular/platform-browser';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsAfterBootstrap, NgxsModule, NgxsOnInit, State, Store} from '@ngxs/store';

describe('complex lifecycle', () => {
    @Injectable()
    class MyApiService {}

    it('should be throw when use context before app initial', () => {
        @Injectable()
        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        class CountState extends NgxsImmutableDataRepository<number> {
            public value: number | null = null;
            constructor(public myService: MyApiService) {
                super();
                this.value = 1;
                this.ctx.setState(this.value);
            }
        }

        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([CountState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
            providers: [MyApiService],
        });

        let message: string | null = null;

        try {
            TestBed.inject<CountState>(CountState);
            TestBed.inject<Store>(Store);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
    });

    it('should be correct lifecycle', () => {
        const hooks: string[] = [];

        @Injectable()
        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        class CountState
            extends NgxsImmutableDataRepository<number>
            implements NgxsOnInit, NgxsAfterBootstrap
        {
            constructor(public myService: MyApiService) {
                super();
                hooks.push('CountState - create');
            }

            public override ngxsOnInit(): void {
                hooks.push('CountState - ngxsOnInit');
            }

            public override ngxsAfterBootstrap(): void {
                hooks.push('CountState - ngxsAfterBootstrap');
            }
        }

        @Component({
            selector: 'app-root',
            template: '',
        })
        class NgxsTestComponent implements OnInit, AfterViewInit {
            public ngOnInit(): void {
                hooks.push('NgxsTestComponent - ngOnInit');
            }

            public ngAfterViewInit(): void {
                hooks.push('NgxsTestComponent - ngAfterViewInit');
            }
        }

        @NgModule({
            imports: [BrowserModule],
            declarations: [NgxsTestComponent],
            entryComponents: [NgxsTestComponent],
        })
        class AppTestModule {
            // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
            public static ngDoBootstrap(app: ApplicationRef): void {
                AppTestModule.createRootNode();
                app.bootstrap(NgxsTestComponent);
            }

            private static createRootNode(selector = 'app-root'): void {
                const document = TestBed.inject(DOCUMENT);
                const adapter = new BrowserDomAdapter();
                const root = adapter.createElement(selector);

                document.body.appendChild(root);
            }
        }

        TestBed.configureTestingModule({
            imports: [
                AppTestModule,
                NgxsModule.forRoot([CountState], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
            providers: [MyApiService],
        });

        AppTestModule.ngDoBootstrap(TestBed.inject(ApplicationRef));

        expect(hooks).toEqual([
            'CountState - create',
            'CountState - ngxsOnInit',
            'NgxsTestComponent - ngOnInit',
            'NgxsTestComponent - ngAfterViewInit',
            'CountState - ngxsAfterBootstrap',
        ]);
    });
});
