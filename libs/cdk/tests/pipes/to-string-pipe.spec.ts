import {TestBed} from '@angular/core/testing';
import {ToStringPipe} from '@angular-ru/cdk/pipes';

describe('to string pipe', () => {
    let pipe: ToStringPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ToStringPipe],
        }).compileComponents();
        pipe = TestBed.inject(ToStringPipe);
    });

    it('to string', () => {
        expect(pipe.transform(1)).toBe('1');
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform('1')).toBe('1');
        expect(pipe.transform('  ')).toBe('  ');
        expect(pipe.transform([])).toBe('');
        expect(pipe.transform([1, 2])).toBe('1,2');
        expect(pipe.transform({a: 1, b: 2})).toBe('[object Object]');
        expect(
            pipe.transform({a: 1, b: 2}, (value: {a: number; b: number}) =>
                JSON.stringify(value),
            ),
        ).toBe('{"a":1,"b":2}');
    });
});
