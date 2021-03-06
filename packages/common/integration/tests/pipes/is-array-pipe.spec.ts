import { IsArrayPipe, IsArrayPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('is array pipe', () => {
    let pipe: IsArrayPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [IsArrayPipeModule] }).compileComponents();
        pipe = TestBed.inject(IsArrayPipe);
    });

    it('is array', () => {
        expect(pipe.transform(1)).toEqual(false);
        expect(pipe.transform(null)).toEqual(false);
        expect(pipe.transform('1')).toEqual(false);
        expect(pipe.transform('  ')).toEqual(false);
        expect(pipe.transform([])).toEqual(true);
    });
});
