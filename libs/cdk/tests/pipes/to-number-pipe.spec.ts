import {TestBed} from '@angular/core/testing';
import {ToNumberPipe} from '@angular-ru/cdk/pipes';

describe('to number pipe', () => {
    let pipe: ToNumberPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ToNumberPipe],
        }).compileComponents();
        pipe = TestBed.inject(ToNumberPipe);
    });

    it('to number', () => {
        expect(pipe.transform(1)).toBe(1);
        expect(pipe.transform(null as any)).toBeNaN();
        expect(pipe.transform('1')).toBe(1);
        expect(pipe.transform('  ')).toBeNaN();
        expect(pipe.transform([] as any)).toBeNaN();
        expect(pipe.transform([1, 2] as any)).toBe(1.2);
        expect(pipe.transform({a: 1, b: 2} as any)).toBeNaN();
    });
});
