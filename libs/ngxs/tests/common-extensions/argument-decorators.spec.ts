import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { DataAction, Named, Payload, StateRepository } from '@angular-ru/ngxs/decorators';
import { getRepository } from '@angular-ru/ngxs/internals';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { NGXS_DATA_EXCEPTIONS } from '@angular-ru/ngxs/tokens';
import { NgxsRepositoryMeta } from '@angular-ru/ngxs/typings';
import { NgxsModule, State } from '@ngxs/store';

describe('[TEST]: Argument decorators', () => {
    it('should be correct ensure meta from A', () => {
        @StateRepository()
        @State({ name: 'a', defaults: '' })
        @Injectable()
        class A extends NgxsImmutableDataRepository<string> {}

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([A], { developmentMode: true }), NgxsDataPluginModule.forRoot()]
        });

        const a: A = TestBed.inject<A>(A);

        a.setState('1');

        const repo: NgxsRepositoryMeta = getRepository(A);

        expect(repo.stateMeta?.actions).toEqual({
            '@a.setState(stateValue)': [
                {
                    type: '@a.setState(stateValue)',
                    options: { cancelUncompleted: true },
                    fn: '@a.setState(stateValue)'
                }
            ]
        });

        expect(a.getState()).toBe('1');
    });

    it('should be correct ensure meta from B', () => {
        @StateRepository()
        @State({ name: 'b', defaults: '' })
        @Injectable()
        class B extends NgxsImmutableDataRepository<string> {
            @DataAction()
            public set(value: string, plus: string = '3'): void {
                this.ctx.setState(`${value}${plus}`);
            }
        }

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([B], { developmentMode: true }), NgxsDataPluginModule.forRoot()]
        });

        const b: B = TestBed.inject<B>(B);

        b.set('2');

        const repo: NgxsRepositoryMeta = getRepository(B);

        expect(repo.stateMeta?.actions).toEqual({
            '@b.set($arg0, $arg1)': [
                {
                    type: '@b.set($arg0, $arg1)',
                    options: { cancelUncompleted: true },
                    fn: '@b.set($arg0, $arg1)'
                }
            ]
        });

        expect(b.getState()).toBe('23');
    });

    it('should be correct ensure meta from C', () => {
        @StateRepository()
        @State({ name: 'c', defaults: '' })
        @Injectable()
        class C extends NgxsImmutableDataRepository<string> {
            @DataAction()
            public set(@Named('val') value: string, @Named('plus') plus: string = '3'): void {
                this.ctx.setState(`${value}${plus}`);
            }
        }

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([C], { developmentMode: true }), NgxsDataPluginModule.forRoot()]
        });

        const c: C = TestBed.inject<C>(C);

        c.set('4', '10');

        const repo: NgxsRepositoryMeta = getRepository(C);

        expect(repo.stateMeta?.actions).toEqual({
            '@c.set(val, plus)': [
                {
                    type: '@c.set(val, plus)',
                    options: { cancelUncompleted: true },
                    fn: '@c.set(val, plus)'
                }
            ]
        });

        expect(c.getState()).toBe('410');
    });

    it('should be correct ensure meta from D', () => {
        @StateRepository()
        @State({ name: 'd', defaults: '' })
        @Injectable()
        class D extends NgxsImmutableDataRepository<string> {
            @DataAction()
            public set(@Payload('X') x?: string, @Payload(' Y ') @Named(' y ') y?: string, z?: string): void {
                this.ctx.setState(`${x}${y}${z}`);
            }
        }

        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([D], { developmentMode: true }), NgxsDataPluginModule.forRoot()]
        });

        const d: D = TestBed.inject<D>(D);

        d.set('1', '2', '3');

        const repo: NgxsRepositoryMeta = getRepository(D);

        expect(repo.stateMeta?.actions).toEqual({
            '@d.set(X, y, $arg2)': [
                {
                    type: '@d.set(X, y, $arg2)',
                    options: { cancelUncompleted: true },
                    fn: '@d.set(X, y, $arg2)'
                }
            ]
        });

        expect(d.getState()).toBe('123');
    });

    it('should be invalid payload', () => {
        let message: string | null = null;

        try {
            @StateRepository()
            @State({ name: 'e', defaults: '' })
            @Injectable()
            class E extends NgxsImmutableDataRepository<string> {
                @DataAction()
                public setX(@Payload('') x?: string): void {
                    this.ctx.setState(`${x}`);
                }
            }

            new E().setX();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_INVALID_PAYLOAD_NAME);
    });

    it('should be invalid argument', () => {
        let message: string | null = null;

        try {
            @StateRepository()
            @State({ name: 'g', defaults: '' })
            @Injectable()
            class G extends NgxsImmutableDataRepository<string> {
                @DataAction()
                public setY(@Named('') y?: string): void {
                    this.ctx.setState(`${y}`);
                }
            }

            new G().setY();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toEqual(NGXS_DATA_EXCEPTIONS.NGXS_INVALID_ARG_NAME);
    });

    describe('check duplicate name', () => {
        it('should be duplicate argument name', () => {
            let message: string | null = null;

            try {
                @StateRepository()
                @State({ name: 'g', defaults: '' })
                @Injectable()
                class G extends NgxsImmutableDataRepository<string> {
                    @DataAction()
                    public setYZ(@Named('y') y?: string, @Named('y') _z?: string): void {
                        this.ctx.setState(`${y}`);
                    }
                }

                new G().setYZ();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toBe(`An argument with the name 'y' already exists in the method 'setYZ'`);
        });

        it('should be duplicate payload name', () => {
            let message: string | null = null;

            try {
                @StateRepository()
                @State({ name: 'g', defaults: '' })
                @Injectable()
                class G extends NgxsImmutableDataRepository<string> {
                    @DataAction()
                    public setYZ(@Payload('y') y?: string, @Payload('y') _z?: string): void {
                        this.ctx.setState(`${y}`);
                    }
                }

                new G().setYZ();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toBe(`An argument with the name 'y' already exists in the method 'setYZ'`);
        });

        it('should be duplicate payload name as argument name', () => {
            let message: string | null = null;

            try {
                @StateRepository()
                @State({ name: 'g', defaults: '' })
                @Injectable()
                class G extends NgxsImmutableDataRepository<string> {
                    @DataAction()
                    public setYZ(@Payload('y') y?: string, @Named('y') _z?: string): void {
                        this.ctx.setState(`${y}`);
                    }
                }

                new G().setYZ();
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toBe(`An argument with the name 'y' already exists in the method 'setYZ'`);
        });
    });
});
