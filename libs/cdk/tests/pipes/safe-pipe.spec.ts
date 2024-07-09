import {TestBed} from '@angular/core/testing';
import {SafePipe, SafePipeModule} from '@angular-ru/cdk/pipes';

describe('safe pipe', () => {
    let pipe: SafePipe;

    beforeEach(() => {
        TestBed.configureTestingModule({imports: [SafePipeModule]}).compileComponents();
        pipe = TestBed.inject(SafePipe);
    });

    it('html', () => {
        expect(pipe.transform('<p>Hello world</p>', 'html')).toEqual({
            changingThisBreaksApplicationSecurity: '<p>Hello world</p>',
        });
    });

    it('style', () => {
        expect(pipe.transform('font-size: 12px', 'style')).toEqual({
            changingThisBreaksApplicationSecurity: 'font-size: 12px',
        });
    });
});
