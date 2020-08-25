import { TakeSecondItemPipe, TakeSecondItemPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('take second pipe', () => {
    let pipe: TakeSecondItemPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TakeSecondItemPipeModule] }).compileComponents();
        pipe = TestBed.inject(TakeSecondItemPipe);
    });

    it('take second', () => {
        expect(pipe.transform([1, 2])).toEqual(2);
        expect(pipe.transform([2])).toEqual(null);
        expect(pipe.transform([])).toEqual(null);
    });
});
