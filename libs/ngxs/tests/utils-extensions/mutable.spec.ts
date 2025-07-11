import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MutableTypePipe} from '@angular-ru/cdk/pipes';
import {Immutable} from '@angular-ru/cdk/typings';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {provideStore, State} from '@ngxs/store';

describe('mutable', () => {
    interface A {
        a: number;
        b: number;
    }

    it('immutable<A> to A', () => {
        const a: Immutable<A> = {a: 1, b: 2};
        const mutableA = new MutableTypePipe().transform(a);

        mutableA.b++;

        expect(a).toEqual({a: 1, b: 3});
    });

    it('immutable<A>[] to A[]', () => {
        const arr: Immutable<A[]> = [
            {a: 1, b: 2},
            {a: 2, b: 3},
        ];

        const mutableArr = new MutableTypePipe().transform(arr);

        mutableArr[0].a++;
        mutableArr[1].b++;

        expect(mutableArr).toEqual([
            {a: 2, b: 2},
            {a: 2, b: 4},
        ]);

        expect(mutableArr.reverse()).toEqual([
            {a: 2, b: 4},
            {a: 2, b: 2},
        ]);
    });

    it('should be correct work pipe in template', () => {
        @StateRepository()
        @State({name: 'app', defaults: 0})
        @Injectable()
        class AppState extends NgxsImmutableDataRepository<number> {}

        @Component({
            selector: 'app',
            imports: [AsyncPipe, MutableTypePipe],
            template: '{{ appState.state$ | async | mutable }}',
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class AppComponent {
            constructor(public appState: AppState) {}
        }

        TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideStore([AppState], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
        }).compileComponents();

        const app = TestBed.createComponent(AppComponent);

        app.autoDetectChanges();

        expect(parseFloat(app.nativeElement.innerHTML)).toBe(0);
    });
});
