import { NumberFormatPipe, NumberFormatPipeModule } from '@angular-ru/common/pipes';
import { inject, TestBed } from '@angular/core/testing';

describe('[TEST]: number format pipe', () => {
    beforeEach(() => TestBed.configureTestingModule({ imports: [NumberFormatPipeModule] }));

    it('format number', inject([NumberFormatPipe], (pipe: NumberFormatPipe) => {
        expect(pipe.transform(1500300.5)).toEqual('1 500 300,5');
        expect(pipe.transform(1500300.5, { formatOptions: { minimumFractionDigits: 2 } })).toEqual('1 500 300,50');
        expect(pipe.transform(1500300, { formatOptions: { style: 'currency', currency: 'EUR' } })).toEqual(
            '1 500 300,00 €'
        );
        expect(
            pipe.transform(1500300, {
                locales: 'us',
                formatOptions: { style: 'currency', currency: 'rub', useGrouping: false }
            })
        ).toEqual('RUB 1500300.00');
        expect(pipe.transform(1500300, { formatOptions: { maximumFractionDigits: 0 } })).toEqual('1 500 300');
        expect(pipe.transform()).toEqual('');
        expect(pipe.transform(null)).toEqual('');
        expect(pipe.transform(undefined)).toEqual('');
        expect(pipe.transform(NaN)).toEqual('');
    }));
});
