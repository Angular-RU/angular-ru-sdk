import {TestBed} from '@angular/core/testing';
import {AtPipe} from '@angular-ru/cdk/pipes';

describe('deep path', () => {
    let pipe: AtPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [AtPipe]}).compileComponents();
        pipe = TestBed.inject(AtPipe);
    });

    it('get element at index', () => {
        const array: string[] = ['first', 'second', 'third', 'last'];

        expect(pipe.transform(array, 0)).toBe('first');
        expect(pipe.transform(array, 1)).toBe('second');
        expect(pipe.transform(array, 3)).toBe('last');
        expect(pipe.transform(array, 4)).toBeUndefined();
        expect(pipe.transform(array, -1)).toBe('last');
        expect(pipe.transform(array, -2)).toBe('third');
        expect(pipe.transform(array, -4)).toBe('first');
        expect(pipe.transform(array, -5)).toBeUndefined();
    });
});
