import {TestBed} from '@angular/core/testing';
import {DateToNativePipe} from '@angular-ru/cdk/pipes';

describe('date to native pipe', () => {
    let pipe: DateToNativePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateToNativePipe],
        }).compileComponents();
        pipe = TestBed.inject(DateToNativePipe);
    });

    it('date to native', () => {
        const date: Date = pipe.transform('27.02.2019 14:25');

        expect(date.getDate()).toBe(27);
        expect(date.getFullYear()).toBe(2019);
        expect(date.getMonth()).toBe(1);
        expect(date.getHours()).toBe(14);
        expect(date.getMinutes()).toBe(25);
    });
});
