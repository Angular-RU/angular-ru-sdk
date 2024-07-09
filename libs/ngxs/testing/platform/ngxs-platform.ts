/* eslint-disable deprecation/deprecation */
import {SchemaMetadata, Type} from '@angular/core';
import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {isNil} from '@angular-ru/cdk/utils';
import {getStateMetadata} from '@angular-ru/ngxs/internals';
import {Store} from '@ngxs/store';
import {ɵStateClass as StateClass} from "@ngxs/store/internals/symbols";

import {TestSpec} from './internal/types';
import {NgxsDataTestingModule} from './ngxs-data-testing.module';
import {resetPlatformAfterBootstrapping} from './reset-platform-after-bootrapping';

export type PlatformMetadata =
    | Required<Omit<TestModuleMetadata, 'teardown'>>
    | TestModuleMetadata;

/**
 * GENERICS
 * ngxsTestingPlatform({ states: [ ...StateClasses ] }, (store, ...states) => {});
 * ngxsTestingPlatform([ ...StateClasses ], (store, ...states) => {});
 */

export function ngxsTestingPlatform<A>(
    params: (PlatformMetadata & {states?: [StateClass<A>]}) | [StateClass<A>],
    fn: (store: Store, a: A) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B>(
    params:
        | (PlatformMetadata & {states?: [StateClass<A>, StateClass<B>]})
        | [StateClass<A>, StateClass<B>],
    fn: (store: Store, a: A, b: B) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C>(
    params:
        | (PlatformMetadata & {states?: [StateClass<A>, StateClass<B>, StateClass<C>]})
        | [StateClass<A>, StateClass<B>, StateClass<C>],
    fn: (store: Store, a: A, b: B, c: C) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D>(
    params:
        | (PlatformMetadata & {
              states?: [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>];
          })
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>],
    fn: (store: Store, a: A, b: B, c: C, d: D) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E>(
    params:
        | (PlatformMetadata & {
              states?: [
                  StateClass<A>,
                  StateClass<B>,
                  StateClass<C>,
                  StateClass<D>,
                  StateClass<E>,
              ];
          })
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>],
    // eslint-disable-next-line unicorn/prevent-abbreviations
    fn: (store: Store, a: A, b: B, c: C, d: D, e: E) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E, F>(
    params:
        | (PlatformMetadata & {
              states?: [
                  StateClass<A>,
                  StateClass<B>,
                  StateClass<C>,
                  StateClass<D>,
                  StateClass<E>,
                  StateClass<F>,
              ];
          })
        | [
              StateClass<A>,
              StateClass<B>,
              StateClass<C>,
              StateClass<D>,
              StateClass<E>,
              StateClass<F>,
          ],
    // eslint-disable-next-line unicorn/prevent-abbreviations
    fn: (store: Store, a: A, b: B, c: C, d: D, e: E, f: F) => any,
): TestSpec;

export function ngxsTestingPlatform(
    params: PlatformMetadata & {states?: StateClass[]},
    fn: (store: Store, ...states: StateClass[]) => any,
): TestSpec;

/**
 * PUBLIC API
 */
// eslint-disable-next-line max-lines-per-function
export function ngxsTestingPlatform(
    params: (PlatformMetadata & {states?: StateClass[]}) | StateClass[],
    fn: (store: Store, ...states: StateClass[]) => any,
): TestSpec {
    // eslint-disable-next-line max-lines-per-function
    return async function testWithNgxsTestingPlatform(this: any): Promise<void> {
        try {
            const {
                states,
                imports,
                declarations,
                providers,
                schemas,
            }: PlatformMetadata & {states?: StateClass[]} = ensure(params);

            for (const state of states ?? []) {
                if (isNil(getStateMetadata(state))) {
                    throw new Error(
                        `${state.name} class must be decorated with @State() decorator`,
                    );
                }
            }

            await TestBed.configureTestingModule({
                schemas,
                providers,
                declarations,
                imports: [NgxsDataTestingModule.forRoot(states), ...Array.from(imports as any[])],
            }).compileComponents();

            NgxsDataTestingModule.ngxsInitPlatform();

            const store: Store = TestBed.inject(Store);
            const injectedStates: StateClass[] =
                states?.map((state: StateClass): StateClass => TestBed.inject(state)) ??
                [];

            return await fn.apply(this, [store, ...injectedStates]);
        } finally {
            resetPlatformAfterBootstrapping();
        }
    };
}

// eslint-disable-next-line complexity,max-lines-per-function
function ensure(
    options: (TestModuleMetadata & {states?: StateClass[]}) | StateClass[],
): any {
    let states: StateClass[];
    let providers: Type<unknown>[] = [];
    let declarations: Type<unknown>[] = [];
    let imports: Type<unknown>[] = [];
    let schemas: (SchemaMetadata | any[])[] = [];

    if (Array.isArray(options)) {
        states = options;
    } else {
        states = options?.states ?? [];
        providers = options.providers ?? [];
        declarations = options.declarations ?? [];
        imports = options.imports ?? [];
        schemas = options.schemas ?? [];
    }

    return {states, imports, providers, declarations, schemas};
}
