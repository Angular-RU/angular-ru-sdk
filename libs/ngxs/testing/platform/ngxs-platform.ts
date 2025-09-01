import {SchemaMetadata, Type} from '@angular/core';
import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {isNil} from '@angular-ru/cdk/utils';
import {getStateMetadata} from '@angular-ru/ngxs/internals';
import {Store} from '@ngxs/store';
import {ɵStateClass as StateClass} from '@ngxs/store/internals';

import {TestSpec} from './internal/types';
import {
    ngxsInitTestingPlatform,
    provideNgxsDataTesting,
} from './ngxs-data-testing.provider';
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
    params: [StateClass<A>] | (PlatformMetadata & {states?: [StateClass<A>]}),
    fn: (store: Store, a: A) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B>(
    params:
        | [StateClass<A>, StateClass<B>]
        | (PlatformMetadata & {states?: [StateClass<A>, StateClass<B>]}),
    fn: (store: Store, a: A, b: B) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C>(
    params:
        | [StateClass<A>, StateClass<B>, StateClass<C>]
        | (PlatformMetadata & {states?: [StateClass<A>, StateClass<B>, StateClass<C>]}),
    fn: (store: Store, a: A, b: B, c: C) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D>(
    params:
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>]
        | (PlatformMetadata & {
              states?: [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>];
          }),
    fn: (store: Store, a: A, b: B, c: C, d: D) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E>(
    params:
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>]
        | (PlatformMetadata & {
              states?: [
                  StateClass<A>,
                  StateClass<B>,
                  StateClass<C>,
                  StateClass<D>,
                  StateClass<E>,
              ];
          }),
    // eslint-disable-next-line unicorn/prevent-abbreviations
    fn: (store: Store, a: A, b: B, c: C, d: D, e: E) => any,
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E, F>(
    params:
        | [
              StateClass<A>,
              StateClass<B>,
              StateClass<C>,
              StateClass<D>,
              StateClass<E>,
              StateClass<F>,
          ]
        | (PlatformMetadata & {
              states?: [
                  StateClass<A>,
                  StateClass<B>,
                  StateClass<C>,
                  StateClass<D>,
                  StateClass<E>,
                  StateClass<F>,
              ];
          }),
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
    params: StateClass[] | (PlatformMetadata & {states?: StateClass[]}),
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
                imports: Array.from(imports as any[]),
                declarations,
                providers: [
                    ...Array.from(providers as any[]),
                    provideNgxsDataTesting(states),
                ],
            }).compileComponents();

            ngxsInitTestingPlatform();

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
    options: StateClass[] | (TestModuleMetadata & {states?: StateClass[]}),
): any {
    let states: StateClass[];
    let providers: Array<Type<unknown>> = [];
    let declarations: Array<Type<unknown>> = [];
    let imports: Array<Type<unknown>> = [];
    let schemas: Array<any[] | SchemaMetadata> = [];

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
