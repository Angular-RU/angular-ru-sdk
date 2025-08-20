import {
    AfterViewInit,
    Directive,
    ElementRef,
    inject,
    input,
    NgZone,
    OnDestroy,
    output,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

// TODO: move this directive to common
@Directive({selector: '[observerView]'})
export class ObserverView implements AfterViewInit, OnDestroy {
    private element = inject(ElementRef);
    private readonly ngZone = inject(NgZone);

    private observer: Nullable<IntersectionObserver> = null;
    private previousRation = 0.0;
    private frameId: Nullable<number> = null;
    public readonly observerRoot = input<HTMLElement>();

    public readonly observerRootMargin = input<string>();

    public readonly observeVisible = output<boolean>();

    public ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular((): void => {
            this.observer = new IntersectionObserver(
                (entries: IntersectionObserverEntry[]): void => {
                    for (const entry of entries) {
                        this.ngZone.runOutsideAngular((): void =>
                            this.observeChange(entry),
                        );
                        this.previousRation = entry.intersectionRatio;
                    }
                },
                {
                    root: this.observerRoot() ?? null,
                    rootMargin: this.observerRootMargin() ?? '0px 0px 0px 0px',
                    threshold: [0],
                },
            );

            this.observer?.observe?.(this.element.nativeElement);
        });
    }

    public ngOnDestroy(): void {
        this.element = {nativeElement: null};
        cancelAnimationFrame(this.frameId ?? 0);

        if (isNotNil(this.observer)) {
            this.observer?.disconnect?.();
        }
    }

    private observeChange(entry: IntersectionObserverEntry): void {
        const isVisible: boolean =
            entry.intersectionRatio > this.previousRation || entry.isIntersecting;

        cancelAnimationFrame(this.frameId ?? 0);
        this.frameId = window.requestAnimationFrame((): void =>
            this.observeVisible.emit(isVisible),
        );
    }
}
