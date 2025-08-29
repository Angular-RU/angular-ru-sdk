import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideNgxsDataPlugin} from '@angular-ru/ngxs';
import {DataAction, Payload, StateRepository} from '@angular-ru/ngxs/decorators';
import {getRepository} from '@angular-ru/ngxs/internals';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {provideStore, State} from '@ngxs/store';

describe('[TEST]: Action decorator', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('should not be working without @StateRepository decorator', () => {
        let message: string | null = null;

        try {
            @State({name: 'custom', defaults: 'hello world'})
            @Injectable()
            class InvalidState extends NgxsImmutableDataRepository<string> {
                @DataAction()
                public setup(value: string): void {
                    this.ctx.setState(value);
                }
            }

            TestBed.configureTestingModule({
                providers: [
                    provideStore([InvalidState], {developmentMode: true}),
                    provideNgxsDataPlugin(),
                ],
                teardown: {destroyAfterEach: true},
            });

            const state: InvalidState = TestBed.inject(InvalidState);

            state.setState('new value');
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
    });

    it.skip('should not be working without @StateRepository and @State decorator', () => {
        let message: string | null = null;

        try {
            @Injectable()
            class InvalidState extends NgxsImmutableDataRepository<string> {
                @DataAction()
                public setup(@Payload('val') value: string): void {
                    this.ctx.setState(value);
                }
            }

            TestBed.configureTestingModule({
                providers: [
                    provideStore([InvalidState], {developmentMode: true}),
                    provideNgxsDataPlugin(),
                ],
                teardown: {destroyAfterEach: true},
            });

            const state: InvalidState = TestBed.inject(InvalidState);

            state.setState('new value');
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe(
            'States must be decorated with @State() decorator, but "InvalidState" isn\'t.',
        );
    });

    it.skip('should not be working without provided meta information', () => {
        let message: string | null = null;

        try {
            @State({name: 'custom', defaults: 'hello world'})
            @Injectable()
            class InvalidState {
                @DataAction()
                public setup(): void {
                    // ...
                }
            }

            TestBed.configureTestingModule({
                providers: [
                    provideStore([InvalidState], {developmentMode: true}),
                    provideNgxsDataPlugin(),
                ],
                teardown: {destroyAfterEach: true},
            });

            const state: InvalidState = TestBed.inject(InvalidState);

            state.setup();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
    });

    it.skip('should not be working when register as service', () => {
        let message: string | null = null;

        try {
            @State({name: 'custom', defaults: 'hello world'})
            @Injectable()
            class InvalidState {
                @DataAction()
                public setup(): void {
                    // ...
                }
            }

            TestBed.configureTestingModule({
                providers: [
                    provideStore([], {developmentMode: true}),
                    provideNgxsDataPlugin(),
                    InvalidState,
                ],
                teardown: {destroyAfterEach: true},
            });

            const state: InvalidState = TestBed.inject(InvalidState);

            state.setup();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
    });

    it.skip('should be correct mutate metadata', () => {
        @StateRepository()
        @State({name: 'a', defaults: 'a'})
        @Injectable()
        class A extends NgxsImmutableDataRepository<string> {
            @DataAction()
            public setup(): string {
                return this.getState();
            }
        }

        TestBed.configureTestingModule({
            providers: [
                provideStore([A], {developmentMode: true}),
                provideNgxsDataPlugin(),
            ],
            teardown: {destroyAfterEach: true},
        });

        const stateA: A = TestBed.inject(A);

        expect(getRepository(A)).toEqual({
            stateMeta: {
                name: 'a',
                actions: {},
                defaults: 'a',
                path: 'a',
                makeRootSelector: expect.any(Function),
                children: undefined,
            },
            stateClass: A,
            operations: {},
        });

        expect(stateA.setup()).toBe('a');

        expect(getRepository(A)).toEqual({
            stateMeta: {
                name: 'a',
                actions: {
                    '@a.setup()': [
                        {
                            type: '@a.setup()',
                            options: {cancelUncompleted: true},
                            fn: '@a.setup()',
                        },
                    ],
                },
                makeRootSelector: expect.any(Function),
                defaults: 'a',
                path: 'a',
            },
            stateClass: A,
            operations: {
                setup: {
                    type: '@a.setup()',
                    options: {cancelUncompleted: true},
                },
            },
        });
    });

    describe('complex inheritance', () => {
        @StateRepository()
        @State({name: 'a', defaults: 'a'})
        @Injectable()
        class A extends NgxsImmutableDataRepository<string> {
            // noinspection JSUnusedGlobalSymbols
            protected word = 'hello';

            @DataAction()
            public a(): string {
                return this.getState();
            }

            @DataAction()
            public withValueSetStateAsAction(@Payload('name') name: string): string {
                this.setState(`new value - ${this.word} - ${this.name} - ${name}`);

                return this.getState();
            }

            // noinspection JSUnusedGlobalSymbols
            public withValueSetStateAsMethod(name: string): string {
                this.setState(
                    `new value as method - ${this.word} - ${this.name} - ${name}`,
                );

                return this.getState();
            }
        }

        @StateRepository()
        @State({name: 'b', defaults: 'b'})
        @Injectable()
        class B extends A {
            @DataAction()
            public b(): string {
                return this.getState();
            }

            // noinspection JSUnusedGlobalSymbols
            public superA(): string {
                return super.a() + super.word;
            }

            // noinspection JSUnusedGlobalSymbols
            public thisB(): string {
                return this.a() + this.word;
            }
        }

        @StateRepository()
        @State({name: 'c', defaults: 'c'})
        @Injectable()
        class C extends B {
            @DataAction()
            public override b(): string {
                return this.getState();
            }

            public override superA(): string {
                return super.superA();
            }

            // noinspection JSUnusedGlobalSymbols
            public thisA(): string {
                return this.thisB();
            }
        }

        let stateA: A;
        let stateB: B;
        let stateC: C;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    provideStore([A, B, C], {developmentMode: true}),
                    provideNgxsDataPlugin(),
                ],
                teardown: {destroyAfterEach: true},
            });

            stateA = TestBed.inject(A);
            stateB = TestBed.inject(B);
            stateC = TestBed.inject(C);
        });

        it('should be correct metadata before invoked actions', () => {
            expect(getRepository(A)).toEqual({
                stateMeta: {
                    name: 'a',
                    actions: {},
                    defaults: 'a',
                    makeRootSelector: expect.any(Function),
                    path: 'a',
                },
                operations: {},
                stateClass: A,
            });

            expect(getRepository(B)).toEqual({
                stateMeta: {
                    name: 'b',
                    actions: {},
                    defaults: 'b',
                    makeRootSelector: expect.any(Function),
                    path: 'b',
                },
                operations: {},
                stateClass: B,
            });

            expect(getRepository(C)).toEqual({
                stateMeta: {
                    name: 'c',
                    actions: {},
                    defaults: 'c',
                    makeRootSelector: expect.any(Function),
                    path: 'c',
                },
                operations: {},
                stateClass: C,
            });
        });

        it('should be prepare metadata after invoke first action', () => {
            expect(stateA.a()).toBe('a');
            expect(stateB.a()).toBe('b');
            expect(stateC.a()).toBe('c');

            expect(getRepository(A)).toEqual({
                stateMeta: {
                    name: 'a',
                    actions: {
                        '@a.a()': [
                            {
                                type: '@a.a()',
                                options: {cancelUncompleted: true},
                                fn: '@a.a()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'a',
                    path: 'a',
                },
                stateClass: A,
                operations: {
                    a: {
                        type: '@a.a()',
                        options: {cancelUncompleted: true},
                    },
                },
            });

            expect(getRepository(B)).toEqual({
                stateMeta: {
                    name: 'b',
                    actions: {
                        '@b.a()': [
                            {
                                type: '@b.a()',
                                options: {cancelUncompleted: true},
                                fn: '@b.a()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'b',
                    path: 'b',
                },
                stateClass: B,
                operations: {
                    a: {
                        type: '@b.a()',
                        options: {cancelUncompleted: true},
                    },
                },
            });

            expect(getRepository(C)).toEqual({
                stateMeta: {
                    name: 'c',
                    actions: {
                        '@c.a()': [
                            {
                                type: '@c.a()',
                                options: {cancelUncompleted: true},
                                fn: '@c.a()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'c',
                    path: 'c',
                },
                stateClass: C,
                operations: {
                    a: {
                        type: '@c.a()',
                        options: {cancelUncompleted: true},
                    },
                },
            });
        });

        it('super !== this', () => {
            // noinspection SpellCheckingInspection
            expect(stateB.superA()).toBe('bundefined');
            // noinspection SpellCheckingInspection
            expect(stateC.superA()).toBe('cundefined');

            // noinspection SpellCheckingInspection
            expect(stateB.thisB()).toBe('bhello');
            // noinspection SpellCheckingInspection
            expect(stateC.thisA()).toBe('chello');
        });

        it('detect problem with invoke action into action', () => {
            // A
            expect(stateA.withValueSetStateAsAction('LEONARD')).toBe('a');
            expect(stateA.getState()).toBe('new value - hello - a - LEONARD');

            stateA.reset();

            expect(stateA.getState()).toBe('a');
            expect(stateA.withValueSetStateAsMethod('LEONARD')).toBe(
                'new value as method - hello - a - LEONARD',
            );
            expect(stateA.getState()).toBe('new value as method - hello - a - LEONARD');

            // B
            expect(stateB.withValueSetStateAsAction('SHELDON')).toBe('b');
            expect(stateB.getState()).toBe('new value - hello - b - SHELDON');

            stateB.reset();

            expect(stateB.getState()).toBe('b');
            expect(stateB.withValueSetStateAsMethod('SHELDON')).toBe(
                'new value as method - hello - b - SHELDON',
            );
            expect(stateB.getState()).toBe('new value as method - hello - b - SHELDON');

            // C
            expect(stateC.withValueSetStateAsAction('HOWARD')).toBe('c');
            expect(stateC.getState()).toBe('new value - hello - c - HOWARD');

            stateC.reset();

            expect(stateC.getState()).toBe('c');
            expect(stateC.withValueSetStateAsMethod('HOWARD')).toBe(
                'new value as method - hello - c - HOWARD',
            );
            expect(stateC.getState()).toBe('new value as method - hello - c - HOWARD');

            expect(getRepository(A)).toEqual({
                stateMeta: {
                    name: 'a',
                    actions: {
                        '@a.withValueSetStateAsAction(name)': [
                            {
                                type: '@a.withValueSetStateAsAction(name)',
                                options: {cancelUncompleted: true},
                                fn: '@a.withValueSetStateAsAction(name)',
                            },
                        ],
                        '@a.a()': [
                            {
                                type: '@a.a()',
                                options: {cancelUncompleted: true},
                                fn: '@a.a()',
                            },
                        ],
                        '@a.setState(stateValue)': [
                            {
                                type: '@a.setState(stateValue)',
                                options: {cancelUncompleted: true},
                                fn: '@a.setState(stateValue)',
                            },
                        ],
                        '@a.reset()': [
                            {
                                type: '@a.reset()',
                                options: {cancelUncompleted: true},
                                fn: '@a.reset()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'a',
                    path: 'a',
                },
                stateClass: A,
                operations: {
                    withValueSetStateAsAction: {
                        type: '@a.withValueSetStateAsAction(name)',
                        options: {cancelUncompleted: true},
                    },
                    setState: {
                        type: '@a.setState(stateValue)',
                        options: {cancelUncompleted: true},
                    },
                    a: {
                        type: '@a.a()',
                        options: {cancelUncompleted: true},
                    },
                    reset: {
                        type: '@a.reset()',
                        options: {cancelUncompleted: true},
                    },
                },
            });

            expect(getRepository(B)).toEqual({
                stateMeta: {
                    name: 'b',
                    actions: {
                        '@b.withValueSetStateAsAction(name)': [
                            {
                                type: '@b.withValueSetStateAsAction(name)',
                                options: {cancelUncompleted: true},
                                fn: '@b.withValueSetStateAsAction(name)',
                            },
                        ],
                        '@b.setState(stateValue)': [
                            {
                                type: '@b.setState(stateValue)',
                                options: {cancelUncompleted: true},
                                fn: '@b.setState(stateValue)',
                            },
                        ],
                        '@b.a()': [
                            {
                                type: '@b.a()',
                                options: {cancelUncompleted: true},
                                fn: '@b.a()',
                            },
                        ],
                        '@b.reset()': [
                            {
                                type: '@b.reset()',
                                options: {cancelUncompleted: true},
                                fn: '@b.reset()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'b',
                    path: 'b',
                },
                stateClass: B,
                operations: {
                    withValueSetStateAsAction: {
                        type: '@b.withValueSetStateAsAction(name)',
                        options: {cancelUncompleted: true},
                    },
                    setState: {
                        type: '@b.setState(stateValue)',
                        options: {cancelUncompleted: true},
                    },
                    a: {
                        type: '@b.a()',
                        options: {cancelUncompleted: true},
                    },
                    reset: {
                        type: '@b.reset()',
                        options: {cancelUncompleted: true},
                    },
                },
            });

            expect(getRepository(C)).toEqual({
                stateMeta: {
                    name: 'c',
                    actions: {
                        '@c.withValueSetStateAsAction(name)': [
                            {
                                type: '@c.withValueSetStateAsAction(name)',
                                options: {cancelUncompleted: true},
                                fn: '@c.withValueSetStateAsAction(name)',
                            },
                        ],
                        '@c.setState(stateValue)': [
                            {
                                type: '@c.setState(stateValue)',
                                options: {cancelUncompleted: true},
                                fn: '@c.setState(stateValue)',
                            },
                        ],
                        '@c.a()': [
                            {
                                type: '@c.a()',
                                options: {cancelUncompleted: true},
                                fn: '@c.a()',
                            },
                        ],
                        '@c.reset()': [
                            {
                                type: '@c.reset()',
                                options: {cancelUncompleted: true},
                                fn: '@c.reset()',
                            },
                        ],
                    },
                    makeRootSelector: expect.any(Function),
                    defaults: 'c',
                    path: 'c',
                },
                stateClass: C,
                operations: {
                    withValueSetStateAsAction: {
                        type: '@c.withValueSetStateAsAction(name)',
                        options: {
                            cancelUncompleted: true,
                        },
                    },
                    setState: {
                        type: '@c.setState(stateValue)',
                        options: {
                            cancelUncompleted: true,
                        },
                    },
                    a: {
                        type: '@c.a()',
                        options: {cancelUncompleted: true},
                    },
                    reset: {
                        type: '@c.reset()',
                        options: {cancelUncompleted: true},
                    },
                },
            });
        });
    });
});
