import { EntrySingleSetPipe, EntrySingleSetPipeModule } from '@angular-ru/cdk/pipes';
import { TestBed } from '@angular/core/testing';

describe('entry single pipe', () => {
    let pipe: EntrySingleSetPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [EntrySingleSetPipeModule] }).compileComponents();
        pipe = TestBed.inject(EntrySingleSetPipe);
    });

    it('entry single', () => {
        expect(pipe.transform('a', new Set(['a']))).toBe(true);
        expect(pipe.transform('b', new Set(['a']))).toBe(false);
        expect(pipe.transform('c')).toBe(false);
    });
});
