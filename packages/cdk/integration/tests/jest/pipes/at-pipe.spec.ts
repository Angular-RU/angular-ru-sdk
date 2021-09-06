import { TestBed } from '@angular/core/testing';
import { AtPipe, AtPipeModule } from '@angular-ru/cdk/pipes';

describe('deep path', () => {
    let pipe: AtPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [AtPipeModule] }).compileComponents();
        pipe = TestBed.inject(AtPipe);
    });

    it('get element at index', () => {
        const array: string[] = ['first', 'second', 'third', 'last'];
        expect(pipe.transform(array, 0)).toEqual('first');
        expect(pipe.transform(array, 1)).toEqual('second');
        expect(pipe.transform(array, 3)).toEqual('last');
        expect(pipe.transform(array, 4)).toEqual(undefined);
        expect(pipe.transform(array, -1)).toEqual('last');
        expect(pipe.transform(array, -2)).toEqual('third');
        expect(pipe.transform(array, -4)).toEqual('first');
        expect(pipe.transform(array, -5)).toEqual(undefined);
    });
});
