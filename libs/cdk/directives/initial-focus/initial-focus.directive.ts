import {
    AfterViewInit,
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const MIN_DELAY = 500;

@Directive({standalone: false, selector: '[initialFocus]'})
export class InitialFocusDirective implements AfterViewInit, OnDestroy {
    private readonly className: string = 'initial-focused';
    private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();
    @Input()
    public focusDelay: number = MIN_DELAY;

    @Input()
    public focusDisabled = false;

    @Input()
    public type?: string;

    constructor(
        @Inject(ElementRef)
        private readonly element: ElementRef<HTMLInputElement>,
        @Inject(NgZone)
        private readonly ngZone: NgZone,
    ) {}

    private get el(): HTMLInputElement {
        return this.element.nativeElement;
    }

    public ngAfterViewInit(): void {
        this.decideAndTryToFocus();
    }

    public ngOnDestroy(): void {
        this.unsubscribe$.next(true);
    }

    private decideAndTryToFocus(): void {
        if (!this.focusDisabled && !this.isFocused()) {
            this.ngZone.runOutsideAngular((): void => {
                timer(this.focusDelay)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe((_value: number): void => {
                        this.focus();
                    });
            });
        }
    }

    private isFocused(): boolean {
        return this.elementIsActive() || this.el.classList.contains(this.className);
    }

    private elementIsActive(): boolean {
        return document.activeElement === this.element.nativeElement;
    }

    private focus(): void {
        this.el.focus();

        // selection range doesn't work with number type
        if (this.type === 'number') {
            this.el.type = 'text';
        }

        this.el.setSelectionRange(this.el.value.length, this.el.value.length);

        if (this.type === 'number') {
            this.el.type = 'number';
        }

        if (this.elementIsActive()) {
            this.el.classList.add(this.className);
        }
    }
}
