import { ToNumberPipe, ToNumberPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('to number pipe', () => {
    let pipe: ToNumberPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [ToNumberPipeModule] }).compileComponents();
        pipe = TestBed.inject(ToNumberPipe);
    });

    it('to number', () => {
        expect(pipe.transform(1)).toEqual(1);
        expect(pipe.transform(null as any)).toEqual(NaN);
        expect(pipe.transform('1')).toEqual(1);
        expect(pipe.transform('  ')).toEqual(NaN);
        expect(pipe.transform([] as any)).toEqual(NaN);
        expect(pipe.transform([1, 2] as any)).toEqual(1);
        expect(pipe.transform({ a: 1, b: 2 } as any)).toEqual(NaN);
    });
});
