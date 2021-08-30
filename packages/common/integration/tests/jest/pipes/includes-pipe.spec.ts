import { IncludesPipe, IncludesPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('deep path', () => {
    let pipe: IncludesPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [IncludesPipeModule] }).compileComponents();
        pipe = TestBed.inject(IncludesPipe);
    });

    it('decide if element is in array', () => {
        const array: string[] = ['first', 'second', 'third', 'last'];
        expect(pipe.transform(array, 'first')).toEqual(true);
        expect(pipe.transform(array, 'second')).toEqual(true);
        expect(pipe.transform(array, 'fifth')).toEqual(false);
        expect(pipe.transform(array, undefined)).toEqual(false);
        expect(pipe.transform(array, null)).toEqual(false);
        expect(pipe.transform(null, null)).toEqual(false);
        expect(pipe.transform(undefined, null)).toEqual(false);
        expect(pipe.transform(null, 'first')).toEqual(false);
        expect(pipe.transform(undefined, 'first')).toEqual(false);
    });
});
