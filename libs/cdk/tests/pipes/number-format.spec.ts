import {inject, TestBed} from '@angular/core/testing';
import {NumberFormatPipe, NumberFormatPipeModule} from '@angular-ru/cdk/pipes';

describe('[TEST]: number format pipe', () => {
    beforeEach(() => TestBed.configureTestingModule({imports: [NumberFormatPipeModule]}));

    it('format number', inject([NumberFormatPipe], (pipe: NumberFormatPipe) => {
        expect(pipe.transform(1500300.5)).toBe('1 500 300,5');
        expect(
            pipe.transform(1500300.5, {formatOptions: {minimumFractionDigits: 2}}),
        ).toBe('1 500 300,50');
        expect(
            pipe.transform(1500300, {
                formatOptions: {style: 'currency', currency: 'EUR'},
            }),
        ).toBe('1 500 300,00 €');
        expect(
            pipe.transform(1500300, {
                locales: 'en-US',
                formatOptions: {style: 'currency', currency: 'rub', useGrouping: false},
            }),
        ).toBe('RUB 1500300.00');
        expect(pipe.transform(1500300, {formatOptions: {maximumFractionDigits: 0}})).toBe(
            '1 500 300',
        );
        expect(pipe.transform()).toBe('');
        expect(pipe.transform(null)).toBe('');
        expect(pipe.transform(undefined)).toBe('');
        expect(pipe.transform(NaN)).toBe('');
    }));
});
