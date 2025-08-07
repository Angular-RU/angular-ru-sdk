import {TestBed} from '@angular/core/testing';
import {DeepPathPipe} from '@angular-ru/cdk/pipes';

describe('deep path', () => {
    let pipe: DeepPathPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DeepPathPipe],
        }).compileComponents();
        pipe = TestBed.inject(DeepPathPipe);
    });

    it('ensure deep value', () => {
        const object: {a: {b: {c: string}}} = {a: {b: {c: 'str'}}};
        const result = pipe.transform(object, 'a.b.c');

        expect(result).toBe('str');
    });
});
