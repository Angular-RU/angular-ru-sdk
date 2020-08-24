import { NumberFormatPipe, NumberFormatPipeModule } from '@angular-ru/common/pipes';
import { TestBed } from '@angular/core/testing';

describe('number format pipe', () => {
    let pipe: NumberFormatPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [NumberFormatPipeModule] }).compileComponents();
        pipe = TestBed.inject(NumberFormatPipe);
    });

    it('format number', () => {
        expect(pipe.transform(1500300.5)).toEqual('1 500 300,5');
        expect(pipe.transform(1500300.5, { decimalPlaces: 2 })).toEqual('1 500 300,50');
        expect(pipe.transform(1500300, { decimalPlaces: 2 })).toEqual('1 500 300,00');
    });
});
