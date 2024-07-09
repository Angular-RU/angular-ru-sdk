import {TestBed} from '@angular/core/testing';
import {TakeFirstItemPipe, TakeFirstItemPipeModule} from '@angular-ru/cdk/pipes';

describe('take item pipe', () => {
    let pipe: TakeFirstItemPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TakeFirstItemPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(TakeFirstItemPipe);
    });

    it('take item', () => {
        expect(pipe.transform([1, 2])).toBe(1);
        expect(pipe.transform([])).toBeUndefined();
    });
});
