import {TestBed} from '@angular/core/testing';
import {IsObjectPipe, IsObjectPipeModule} from '@angular-ru/cdk/pipes';

describe('is object pipe', () => {
    let pipe: IsObjectPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [IsObjectPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(IsObjectPipe);
    });

    it('is object', () => {
        class A {}

        expect(pipe.transform(new A())).toBe(true);
        expect(pipe.transform({a: {b: {c: 'str'}}})).toBe(true);

        expect(pipe.transform(0)).toBe(false);
        expect(pipe.transform([])).toBe(false);
        expect(pipe.transform(NaN)).toBe(false);
        expect(pipe.transform(Infinity)).toBe(false);
        expect(pipe.transform(null)).toBe(false);
        expect(pipe.transform(undefined)).toBe(false);
    });
});
