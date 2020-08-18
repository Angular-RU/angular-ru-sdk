import { TestBed } from '@angular/core/testing';
import {
    DeepPathModule,
    DeepPathPipe,
    DefaultValueModule,
    DefaultValuePipe,
    MutableTypeModule,
    MutableTypePipe
} from '@angular-ru/common/pipes';
import { Immutable, PlainObject } from '@angular-ru/common/typings';

describe('[TEST]: Pipes', () => {
    describe('mutable', () => {
        let pipe: MutableTypePipe;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [MutableTypeModule] });
            pipe = TestBed.inject(MutableTypePipe);
        });

        it('unwrap immutable type', () => {
            const obj: Immutable<{ a: string }> = { a: 'str' };
            const mutableObj = pipe.transform(obj);

            mutableObj.a = 'str2';
            expect(obj.a).toEqual('str2');
            expect(mutableObj.a).toEqual('str2');
        });

        describe('Instance', () => {
            let pipe: DeepPathPipe;

            beforeEach(() => {
                pipe = new DeepPathPipe();
            });

            it('should be correct extract', () => {
                const b: PlainObject = pipe.transform(
                    {
                        a: {
                            b: {
                                c: 1
                            }
                        }
                    },
                    'a.b'
                );

                expect(b).toEqual({
                    c: 1
                });

                const c: number = pipe.transform(
                    {
                        a: {
                            b: {
                                c: 1
                            }
                        }
                    },
                    'a.b.c'
                );

                expect(c).toEqual(1);
            });

            it('should be correct return object when set empty path', () => {
                const result: PlainObject = pipe.transform({ a: { b: 1 } }, '');
                expect(result).toEqual({ a: { b: 1 } });
            });

            it('should be correct create cache and invalidate', () => {
                const a: PlainObject = { a: { b: 1 } };
                const b: PlainObject = { a: { b: 2 } };
                const c: PlainObject = { a: { b: [1, 2, 3] } };
                expect(pipe.transform(a, 'a.b')).toEqual(1);
                expect(pipe.transform(b, 'a.b')).toEqual(2);
                expect(pipe.transform(b, 'a')).toEqual({ b: 2 });
                expect(pipe.transform(c, 'a.b.2')).toEqual(3);
            });
        });
    });

    describe('deep path', () => {
        let pipe: DeepPathPipe;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [DeepPathModule] });
            pipe = TestBed.inject(DeepPathPipe);
        });

        it('ensure deep value', () => {
            const obj: { a: { b: { c: string } } } = { a: { b: { c: 'str' } } };
            const result = pipe.transform(obj, 'a.b.c');
            expect(result).toEqual('str');
        });
    });

    describe('default value', () => {
        let pipe: DefaultValuePipe;

        beforeEach(() => {
            TestBed.configureTestingModule({ imports: [DefaultValueModule] });
            pipe = TestBed.inject(DefaultValuePipe);
        });

        it('fallback for empty', () => {
            const value: string | null = null;
            const result = pipe.transform(value);
            expect(result).toEqual('-');
        });
    });
});
