import {ElementRef} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Fn, Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {AutoHeight} from '../../../virtual-table/directives/auto-height.directive';

describe('[TEST]: auto height', () => {
    let directive: AutoHeight<PlainObject>;
    // @ts-ignore
    let recalculateDispatcher: Nullable<Fn> = null;
    let addedEvent = false;
    let style: string;

    const mockElementRef: ElementRef = {
        nativeElement: {
            setAttribute: (_: string, styleResult: string): void => {
                style = styleResult;
            },
            getBoundingClientRect: (): Partial<DOMRect> => ({top: 10}),
        },
    };

    beforeEach(() => {
        Object.defineProperty(document.body, 'clientHeight', {
            value: 1000,
        });

        Object.defineProperty(window, 'setTimeout', {
            value: (callback: Fn<void, void>): void => callback(),
        });

        Object.defineProperty(window, 'requestAnimationFrame', {
            value: (callback: Fn): unknown => callback(),
        });

        Object.defineProperties(window, {
            addEventListener: {
                value: (): void => {
                    addedEvent = true;
                },
            },
            removeEventListener: {
                value: (): void => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    recalculateDispatcher = null;
                },
            },
        });

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: ElementRef,
                    useValue: mockElementRef,
                },
                AutoHeight,
            ],
        });
        directive = TestBed.inject(AutoHeight);
        directive.sourceRef = [{a: 1}];
        style = '';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // ticked = 0;
    });

    it('should be correct invoke ngOnInit', () => {
        directive.ngOnInit();

        expect(addedEvent).toBe(true);
    });

    it('should be correct invoke ngOnDestroy', () => {
        expect(directive.destroy$.closed).toBe(false);
        expect(directive.destroy$.isStopped).toBe(false);

        directive.ngOnDestroy();

        expect(directive.destroy$.closed).toBe(false);
        expect(directive.destroy$.isStopped).toBe(true);
    });

    it('should be correct calculate auto height when columnHeight = 45px', fakeAsync(() => {
        directive.autoHeight = {
            detect: true,
            inViewport: true,
            sourceLength: 1,
            columnHeight: 45,
        };

        directive.recalculateTableSize();
        tick(100);

        expect(style).toBe('display: block; height: calc(59px)'); // 45px + 12px + 2px boarding (scrollbar height)
    }));

    it('should be correct calculate auto height when columnHeight = 2000px', fakeAsync(() => {
        directive.autoHeight = {
            detect: true,
            inViewport: true,
            sourceLength: 45,
            columnHeight: 2000,
        };

        directive.recalculateTableSize();
        tick(100);

        expect(style).toBe('display: block; height: calc(980px - 0px - 0px - 14px)');
    }));

    it('should be correct hide height not in viewport', () => {
        directive.autoHeight = {detect: true, inViewport: false};
        directive.calculateHeight();

        expect(style).toBe('');

        directive.autoHeight = {
            detect: false,
            rootHeight: '200px',
            inViewport: false,
            sourceLength: 1,
        };
        directive.calculateHeight();

        expect(style).toBe('');
    });

    it('should be correct calculate custom height', () => {
        directive.autoHeight = {
            detect: true,
            rootHeight: '500px',
            inViewport: true,
            sourceLength: 1,
        };
        directive.calculateHeight();

        expect(style).toBe('display: block; height: 500px');
    });

    it('should be correct empty style when autoHeight not called', () => {
        directive.autoHeight = {
            detect: false,
            rootHeight: null,
            inViewport: true,
            sourceLength: 1,
        };
        directive.calculateHeight();

        expect(style).toBe('');
    });

    it('should be correct recalculate height', fakeAsync(() => {
        directive.autoHeight = {rootHeight: '200px', inViewport: true, sourceLength: 1};

        directive.recalculateTableSize();
        tick(100);

        expect(style).toBe('display: block; height: 200px');
    }));
});
