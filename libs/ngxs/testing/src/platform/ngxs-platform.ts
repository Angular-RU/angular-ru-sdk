import { SchemaMetadata, Type } from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Any } from '@angular-ru/cdk/typings';
import { isNil } from '@angular-ru/cdk/utils';
import { getStateMetadata } from '@angular-ru/ngxs/internals';
import { Store } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';

import { TestSpec } from './internal/types';
import { NgxsDataTestingModule } from './ngxs-data-testing.module';
import { resetPlatformAfterBootstrapping } from './reset-platform-after-bootrapping';

export type PlatformMetadata = Required<Omit<TestModuleMetadata, 'teardown'>> | TestModuleMetadata;

/**
 * GENERICS
 * ngxsTestingPlatform({ states: [ ...StateClasses ] }, (store, ...states) => {});
 * ngxsTestingPlatform([ ...StateClasses ], (store, ...states) => {});
 */

export function ngxsTestingPlatform<A>(
    params: (PlatformMetadata & { states?: [StateClass<A>] }) | [StateClass<A>],
    fn: (store: Store, a: A) => Any
): TestSpec;

export function ngxsTestingPlatform<A, B>(
    params: (PlatformMetadata & { states?: [StateClass<A>, StateClass<B>] }) | [StateClass<A>, StateClass<B>],
    fn: (store: Store, a: A, b: B) => Any
): TestSpec;

export function ngxsTestingPlatform<A, B, C>(
    params:
        | (PlatformMetadata & { states?: [StateClass<A>, StateClass<B>, StateClass<C>] })
        | [StateClass<A>, StateClass<B>, StateClass<C>],
    fn: (store: Store, a: A, b: B, c: C) => Any
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D>(
    params:
        | (PlatformMetadata & { states?: [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>] })
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>],
    fn: (store: Store, a: A, b: B, c: C, d: D) => Any
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E>(
    params:
        | (PlatformMetadata & {
              states?: [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>];
          })
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>],
    // eslint-disable-next-line unicorn/prevent-abbreviations
    fn: (store: Store, a: A, b: B, c: C, d: D, e: E) => Any
): TestSpec;

export function ngxsTestingPlatform<A, B, C, D, E, F>(
    params:
        | (PlatformMetadata & {
              states?: [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>, StateClass<F>];
          })
        | [StateClass<A>, StateClass<B>, StateClass<C>, StateClass<D>, StateClass<E>, StateClass<F>],
    // eslint-disable-next-line unicorn/prevent-abbreviations
    fn: (store: Store, a: A, b: B, c: C, d: D, e: E, f: F) => Any
): TestSpec;

export function ngxsTestingPlatform(
    params: PlatformMetadata & { states?: StateClass[] },
    fn: (store: Store, ...states: StateClass[]) => Any
): TestSpec;

/**
 * PUBLIC API
 */
// eslint-disable-next-line max-lines-per-function
export function ngxsTestingPlatform(
    params: (PlatformMetadata & { states?: StateClass[] }) | StateClass[],
    fn: (store: Store, ...states: StateClass[]) => Any
): TestSpec {
    // eslint-disable-next-line max-lines-per-function
    return async function testWithNgxsTestingPlatform(this: Any): Promise<void> {
        try {
            const {
                states,
                imports,
                declarations,
                providers,
                aotSummaries,
                schemas
            }: PlatformMetadata & { states?: StateClass[] } = ensure(params);

            states?.forEach((state: StateClass): void => {
                if (isNil(getStateMetadata(state))) {
                    throw new Error(`${state.name} class must be decorated with @State() decorator`);
                }
            });

            await TestBed.configureTestingModule({
                schemas,
                providers,
                declarations,
                aotSummaries,
                imports: [NgxsDataTestingModule.forRoot(states), ...imports]
            }).compileComponents();

            NgxsDataTestingModule.ngxsInitPlatform();

            const store: Store = TestBed.inject(Store);
            const injectedStates: StateClass[] =
                states?.map((state: StateClass): StateClass => TestBed.inject(state)) ?? [];

            return await fn.apply(this, [store, ...injectedStates]);
        } finally {
            resetPlatformAfterBootstrapping();
        }
    };
}

// eslint-disable-next-line complexity,max-lines-per-function
function ensure(
    options: (TestModuleMetadata & { states?: StateClass[] }) | StateClass[]
): Required<Omit<TestModuleMetadata, 'teardown'>> & { states?: StateClass[] } {
    let states: StateClass[] = [];
    let providers: Type<unknown>[] = [];
    let declarations: Type<unknown>[] = [];
    let imports: Type<unknown>[] = [];
    let schemas: (SchemaMetadata | Any[])[] = [];
    let aotSummaries: () => Any[] = (): Any[] => [];

    if (Array.isArray(options)) {
        states = options;
    } else {
        states = options?.states ?? [];
        providers = options.providers ?? [];
        declarations = options.declarations ?? [];
        imports = options.imports ?? [];
        schemas = options.schemas ?? [];
        aotSummaries = options.aotSummaries ?? ((): Any[] => []);
    }

    return { states, imports, providers, aotSummaries, declarations, schemas };
}
