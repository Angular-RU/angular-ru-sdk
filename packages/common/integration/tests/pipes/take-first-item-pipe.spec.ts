import { TakeFirstItemPipe, TakeFirstItemPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('take item pipe', () => {
    let pipe: TakeFirstItemPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [TakeFirstItemPipeModule] }).compileComponents();
        pipe = TestBed.inject(TakeFirstItemPipe);
    });

    it('take item', () => {
        expect(pipe.transform([1, 2])).toEqual(1);
        expect(pipe.transform([])).toEqual(null);
    });
});
