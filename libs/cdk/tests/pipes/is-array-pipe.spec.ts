import {TestBed} from '@angular/core/testing';
import {IsArrayPipe, IsArrayPipeModule} from '@angular-ru/cdk/pipes';

describe('is array pipe', () => {
    let pipe: IsArrayPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IsArrayPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(IsArrayPipe);
    });

    it('is array', () => {
        expect(pipe.transform(1)).toBe(false);
        expect(pipe.transform(null)).toBe(false);
        expect(pipe.transform('1')).toBe(false);
        expect(pipe.transform('  ')).toBe(false);
        expect(pipe.transform([])).toBe(true);
    });
});
