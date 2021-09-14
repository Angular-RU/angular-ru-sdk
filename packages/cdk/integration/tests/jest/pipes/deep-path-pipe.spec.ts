import { TestBed } from '@angular/core/testing';
import { DeepPathPipe, DeepPathPipeModule } from '@angular-ru/cdk/pipes';

describe('deep path', () => {
    let pipe: DeepPathPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [DeepPathPipeModule] }).compileComponents();
        pipe = TestBed.inject(DeepPathPipe);
    });

    it('ensure deep value', () => {
        const obj: { a: { b: { c: string } } } = { a: { b: { c: 'str' } } };
        const result = pipe.transform(obj, 'a.b.c');

        expect(result).toEqual('str');
    });
});
