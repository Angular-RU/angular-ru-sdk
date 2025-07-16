import {TestBed} from '@angular/core/testing';
import {EntrySingleSetPipe} from '@angular-ru/cdk/pipes';

describe('entry single pipe', () => {
    let pipe: EntrySingleSetPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EntrySingleSetPipe],
        }).compileComponents();
        pipe = TestBed.inject(EntrySingleSetPipe);
    });

    it('entry single', () => {
        expect(pipe.transform('a', new Set(['a']))).toBe(true);
        expect(pipe.transform('b', new Set(['a']))).toBe(false);
        expect(pipe.transform('c')).toBe(false);
    });
});
