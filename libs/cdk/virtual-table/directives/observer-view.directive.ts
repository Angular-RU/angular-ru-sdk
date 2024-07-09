import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

// TODO: move this directive to common
@Directive({selector: '[observerView]'})
export class ObserverViewDirective implements AfterViewInit, OnDestroy {
    private observer: Nullable<IntersectionObserver> = null;
    private previousRation: number = 0.0;
    private frameId: Nullable<number> = null;
    @Input() public observerRoot?: HTMLElement;
    @Input() public observerRootMargin?: string;
    @Output() public readonly observeVisible: EventEmitter<boolean> = new EventEmitter(
        true,
    );

    constructor(
        private element: ElementRef,
        private readonly ngZone: NgZone,
    ) {}

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
                    root: this.observerRoot ?? null,
                    rootMargin: this.observerRootMargin ?? '0px 0px 0px 0px',
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
