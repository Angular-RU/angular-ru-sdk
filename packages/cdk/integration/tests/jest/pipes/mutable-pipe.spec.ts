import { TestBed } from '@angular/core/testing';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { DeepPathPipe, MutableTypePipe, MutableTypePipeModule } from '@angular-ru/cdk/pipes';
import { Immutable, Nullable, PlainObject } from '@angular-ru/cdk/typings';

describe('mutable', () => {
    let pipe: MutableTypePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MutableTypePipeModule],
            providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }]
        }).compileComponents();
        pipe = TestBed.inject(MutableTypePipe);
    });

    it('unwrap immutable type', () => {
        const obj: Immutable<{ a: string }> = { a: 'str' };
        const mutableObj = pipe.transform(obj);

        mutableObj.a = 'str2';
        expect(obj.a).toEqual('str2');
        expect(mutableObj.a).toEqual('str2');
    });

    describe('instance', () => {
        let pipePath: DeepPathPipe;

        beforeEach(() => {
            pipePath = new DeepPathPipe();
        });

        it('should be correct extract', () => {
            const b: Nullable<string | PlainObject> = pipePath.transform(
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

            const c: Nullable<string | number> = pipePath.transform(
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
            const result: Nullable<string | PlainObject> = pipePath.transform({ a: { b: 1 } }, '');

            expect(result).toEqual({ a: { b: 1 } });
        });

        it('should be correct create cache and invalidate', () => {
            const a: PlainObject = { a: { b: 1 } };
            const b: PlainObject = { a: { b: 2 } };
            const c: PlainObject = { a: { b: [1, 2, 3] } };

            expect(pipePath.transform(a, 'a.b')).toEqual(1);
            expect(pipePath.transform(b, 'a.b')).toEqual(2);
            expect(pipePath.transform(b, 'a')).toEqual({ b: 2 });
            expect(pipePath.transform(c, 'a.b.2')).toEqual(3);
        });
    });
});
