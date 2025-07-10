import {TestBed} from '@angular/core/testing';
import {BracePipe} from '@angular-ru/cdk/pipes';

describe('brace pipe', () => {
    let pipe: BracePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({providers: [BracePipe]}).compileComponents();
        pipe = TestBed.inject(BracePipe);
    });

    it('should correct wrap input string with braces', () => {
        const inputString = 'input';

        expect(pipe.transform(inputString)).toBe(`(${inputString})`);
    });

    it('should correct wrap input number with braces', () => {
        const inputNumber = 42;

        expect(pipe.transform(inputNumber)).toBe(`(${inputNumber})`);
    });
});
