import {TestBed} from '@angular/core/testing';
import {TakeSecondItemPipe} from '@angular-ru/cdk/pipes';

describe('take second pipe', () => {
    let pipe: TakeSecondItemPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TakeSecondItemPipe],
        }).compileComponents();
        pipe = TestBed.inject(TakeSecondItemPipe);
    });

    it('take second', () => {
        expect(pipe.transform([1, 2])).toBe(2);
        expect(pipe.transform([2])).toBeUndefined();
        expect(pipe.transform([])).toBeUndefined();
    });
});
