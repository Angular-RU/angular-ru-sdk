import {TestBed} from '@angular/core/testing';
import {IsStringPipe, IsStringPipeModule} from '@angular-ru/cdk/pipes';

describe('is string pipe', () => {
    let pipe: IsStringPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IsStringPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(IsStringPipe);
    });

    it('is string', () => {
        expect(pipe.transform(1)).toBe(false);
        expect(pipe.transform([])).toBe(false);
        expect(pipe.transform(null)).toBe(false);
        expect(pipe.transform('1')).toBe(true);
        expect(pipe.transform('  ')).toBe(true);
    });
});
