import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {PlainObject} from '@angular-ru/cdk/typings';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NgxsModule, State, Store} from '@ngxs/store';

describe('[TEST]: Reset', () => {
    let store: Store;

    @StateRepository()
    @State({
        name: 'D',
    })
    @Injectable()
    class D {}

    @StateRepository()
    @State({
        name: 'C',
        children: [D],
    })
    @Injectable()
    class C {}

    @StateRepository()
    @State({
        name: 'B',
        children: [],
    })
    @Injectable()
    class B {}

    @StateRepository()
    @State({
        name: 'A',
        children: [B, C],
    })
    @Injectable()
    class A extends NgxsImmutableDataRepository<PlainObject> {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([A, B, C, D], {developmentMode: true}),
                NgxsDataPluginModule.forRoot(),
            ],
        }).compileComponents();

        store = TestBed.inject<Store>(Store);
    });

    it('should be correct reset A state', () => {
        const a: A = TestBed.inject<A>(A);

        expect(store.snapshot()).toEqual({A: {C: {D: {}}, B: {}}});
        expect(a.getState()).toEqual({C: {D: {}}, B: {}});

        a.reset();

        expect(store.snapshot()).toEqual({A: {C: {D: {}}, B: {}}});
    });

    it('should be throw when incorrect children', () => {
        let message: string | null = null;

        try {
            @State({name: 'foo'})
            @Injectable()
            class FooState {}

            @StateRepository()
            @State({name: 'bar', defaults: 'string', children: [FooState]})
            @Injectable()
            class BarState {}

            new BarState();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            'Child states can only be added to an object. Cannot convert String to PlainObject',
        );

        try {
            @State({name: 'foo'})
            @Injectable()
            class FooState {}

            @StateRepository()
            @State({name: 'bar', defaults: [], children: [FooState]})
            @Injectable()
            class BarState {}

            new BarState();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            'Child states can only be added to an object. Cannot convert Array to PlainObject',
        );

        try {
            @State({name: 'foo'})
            @Injectable()
            class FooState {}

            @StateRepository()
            @State({name: 'bar', defaults: null, children: [FooState]})
            @Injectable()
            class BarState {}

            new BarState();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            'Child states can only be added to an object. Cannot convert null to PlainObject',
        );
    });
});
