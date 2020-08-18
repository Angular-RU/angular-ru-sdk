import { TestBed } from '@angular/core/testing';
import {
    DeepPathModule,
    DeepPathPipe,
    DefaultValueModule,
    DefaultValuePipe,
    MutableTypeModule,
    MutableTypePipe
} from '@angular-ru/common/pipes';
import { Immutable } from '@angular-ru/common/typings';

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
