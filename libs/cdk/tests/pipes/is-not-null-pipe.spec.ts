import {TestBed} from '@angular/core/testing';
import {IsNotNullPipe} from '@angular-ru/cdk/pipes';

describe('is not null pipe', () => {
    let pipe: IsNotNullPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IsNotNullPipe],
        }).compileComponents();
        pipe = TestBed.inject(IsNotNullPipe);
    });

    it('is not null', () => {
        expect(pipe.transform({a: {b: {c: 'str'}}})).toBe(true);
        expect(pipe.transform(0)).toBe(true);
        expect(pipe.transform(NaN)).toBe(true);
        expect(pipe.transform(null)).toBe(false);
        expect(pipe.transform(undefined)).toBe(false);
    });
});
