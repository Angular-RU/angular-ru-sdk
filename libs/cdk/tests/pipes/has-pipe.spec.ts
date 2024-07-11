import {TestBed} from '@angular/core/testing';
import {HasPipe, HasPipeModule} from '@angular-ru/cdk/pipes';

describe('[TEST]: has-pipe accessibility', () => {
    let pipe: HasPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [HasPipeModule]}).compileComponents();
        pipe = TestBed.inject(HasPipe);
    });

    it('decide if element is in set', () => {
        const set = new Set<string>(['first', 'second', 'third', 'last']);

        expect(pipe.transform(set, 'first')).toBe(true);
        expect(pipe.transform(set, 'second')).toBe(true);
        expect(pipe.transform(set, 'fifth')).toBe(false);
        expect(pipe.transform(set, undefined)).toBe(false);
        expect(pipe.transform(set, null)).toBe(false);
        expect(pipe.transform(new Set(), null)).toBe(false);
        expect(pipe.transform(null, null)).toBe(false);
        expect(pipe.transform(undefined, null)).toBe(false);
        expect(pipe.transform(null, 'first')).toBe(false);
        expect(pipe.transform(undefined, 'second')).toBe(false);
    });
});
