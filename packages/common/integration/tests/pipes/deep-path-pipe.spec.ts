import { DeepPathModule, DeepPathPipe } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('deep path', () => {
    let pipe: DeepPathPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [DeepPathModule] }).compileComponents();
        pipe = TestBed.inject(DeepPathPipe);
    });

    it('ensure deep value', () => {
        const obj: { a: { b: { c: string } } } = { a: { b: { c: 'str' } } };
        const result = pipe.transform(obj, 'a.b.c');
        expect(result).toEqual('str');
    });
});
