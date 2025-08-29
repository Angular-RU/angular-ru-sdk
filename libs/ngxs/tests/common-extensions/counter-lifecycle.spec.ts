import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    Injectable,
    OnInit,
} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {ngxsInitTestingPlatform} from '@angular-ru/ngxs/testing';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {NgxsAfterBootstrap, NgxsOnInit, provideStore, State, Store} from '@ngxs/store';

describe('complex lifecycle', () => {
    it('should be throw when use context before app initial', () => {
        @Injectable()
        @StateRepository()
        @State({
            name: 'count',
            defaults: 0,
        })
        class CountState extends NgxsImmutableDataRepository<number> {
            public value: number | null = null;
            constructor() {
                super();
                this.value = 1;
                this.ctx.setState(this.value);
            }
        }

        TestBed.configureTestingModule({
            providers: [
                provideStore([CountState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        let message: string | null = null;

        try {
            TestBed.inject<CountState>(CountState);
            TestBed.inject<Store>(Store);
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_PROVIDER_EXCEPTION);
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
            constructor() {
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
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class NgxsTestComponent implements OnInit, AfterViewInit {
            public ngOnInit(): void {
                hooks.push('NgxsTestComponent - ngOnInit');
            }

            public ngAfterViewInit(): void {
                hooks.push('NgxsTestComponent - ngAfterViewInit');
            }
        }

        TestBed.configureTestingModule({
            imports: [NgxsTestComponent],
            providers: [
                provideStore([CountState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        });

        ngxsInitTestingPlatform(NgxsTestComponent);

        expect(hooks).toEqual([
            'CountState - create',
            'CountState - ngxsOnInit',
            'NgxsTestComponent - ngOnInit',
            'NgxsTestComponent - ngAfterViewInit',
            'CountState - ngxsAfterBootstrap',
        ]);
    });
});
