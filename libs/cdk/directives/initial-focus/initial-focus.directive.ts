import {
    AfterViewInit,
    Directive,
    ElementRef,
    inject,
    input,
    NgZone,
    OnDestroy,
} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const MIN_DELAY = 500;

@Directive({selector: '[initialFocus]'})
export class InitialFocus implements AfterViewInit, OnDestroy {
    private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);
    private readonly ngZone = inject<NgZone>(NgZone);

    private readonly className: string = 'initial-focused';
    private readonly unsubscribe$: Subject<boolean> = new Subject<boolean>();

    public readonly focusDelay = input<number>(MIN_DELAY);
    public readonly focusDisabled = input(false);
    public readonly type = input<string>();

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
        if (!this.focusDisabled() && !this.isFocused()) {
            this.ngZone.runOutsideAngular((): void => {
                timer(this.focusDelay())
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
        const type = this.type();

        if (type === 'number') {
            this.el.type = 'text';
        }

        this.el.setSelectionRange(this.el.value.length, this.el.value.length);

        if (type === 'number') {
            this.el.type = 'number';
        }

        if (this.elementIsActive()) {
            this.el.classList.add(this.className);
        }
    }
}
