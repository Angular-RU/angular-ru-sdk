import {TestBed} from '@angular/core/testing';
import {DetectBrowserPipe} from '@angular-ru/cdk/pipes';

describe('detect browser pipe', () => {
    let pipe: DetectBrowserPipe;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DetectBrowserPipe],
        }).compileComponents();
        pipe = TestBed.inject(DetectBrowserPipe);
    });

    it('detect Chrome 84', () => {
        expect(
            pipe.transform(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
            ),
        ).toBe('Chrome 84');
    });

    it('detect Firefox 79', () => {
        expect(
            pipe.transform(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:79.0) Gecko/20100101 Firefox/79.0',
            ),
        ).toBe('Firefox 79');
    });

    it('detect Safari 13', () => {
        expect(
            pipe.transform(
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
            ),
        ).toBe('Safari 13');
    });
});
