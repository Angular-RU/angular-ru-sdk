import {TestBed} from '@angular/core/testing';
import {ObjectSizePipe} from '@angular-ru/cdk/pipes';

describe('[TEST] Object size pipe', () => {
    let pipe: ObjectSizePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ObjectSizePipe],
        }).compileComponents();
        pipe = TestBed.inject(ObjectSizePipe);
    });

    it('correct detect object size', () => {
        expect(pipe.transform()).toBe(0);
        expect(pipe.transform({})).toBe(0);
        expect(pipe.transform(null)).toBe(0);
        expect(pipe.transform()).toBe(0);
        expect(pipe.transform([])).toBe(0);
        expect(pipe.transform([{a: 1}])).toBe(1);
        expect(pipe.transform({a: 1, b: 2})).toBe(2);
        expect(pipe.transform([{a: 1}, {b: 2}, {c: 3}])).toBe(3);
        expect(pipe.transform({a: 1, b: {c: 3, d: 4}})).toBe(2);
    });
});
