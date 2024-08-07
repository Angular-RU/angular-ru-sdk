import {TestBed} from '@angular/core/testing';
import {FormatDatePipe, FormatDatePipeModule} from '@angular-ru/cdk/pipes';

describe('format date pipe', () => {
    let pipe: FormatDatePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormatDatePipeModule],
        }).compileComponents();
        pipe = TestBed.inject(FormatDatePipe);
    });

    it('format date', () => {
        expect(pipe.transform(1544532097434, {timezone: '+0300'})).toBe('11.12.2018');
    });
});
