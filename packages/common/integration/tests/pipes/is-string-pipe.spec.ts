import { IsStringPipe, IsStringPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('is string pipe', () => {
    let pipe: IsStringPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [IsStringPipeModule] }).compileComponents();
        pipe = TestBed.inject(IsStringPipe);
    });

    it('is string', () => {
        expect(pipe.transform(1)).toEqual(false);
        expect(pipe.transform([])).toEqual(false);
        expect(pipe.transform(null)).toEqual(false);
        expect(pipe.transform('1')).toEqual(true);
        expect(pipe.transform('  ')).toEqual(true);
    });
});
