import {TestBed} from '@angular/core/testing';
import {MarkByFilterPipe, MarkByFilterPipeModule} from '@angular-ru/cdk/pipes';

describe('mark by filter pipe', () => {
    let pipe: MarkByFilterPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MarkByFilterPipeModule],
        }).compileComponents();
        pipe = TestBed.inject(MarkByFilterPipe);
    });

    it('mark by filter', () => {
        expect(pipe.transform('hello world')).toBe('hello world');

        expect(pipe.transform('hello world', 'world')).toEqual({
            changingThisBreaksApplicationSecurity:
                'hello <span style="background: #ffdd2d">world</span>',
        });

        expect(pipe.transform('hello world', 'world', '#c3c3c3')).toEqual({
            changingThisBreaksApplicationSecurity:
                'hello <span style="background: #c3c3c3">world</span>',
        });
    });
});
