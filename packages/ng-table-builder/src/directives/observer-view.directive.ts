import { AfterViewInit, Directive, ElementRef, EventEmitter, NgZone, OnDestroy, Output } from '@angular/core';

@Directive({ selector: '[observerView]' })
export class ObserverViewDirective implements AfterViewInit, OnDestroy {
    @Output() public observeVisible: EventEmitter<boolean> = new EventEmitter(true);
    private observer: IntersectionObserver | null = null;
    private previousRation: number = 0.0;
    private frameId: number | null = null;

    constructor(private element: ElementRef, private readonly ngZone: NgZone) {}

    public ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular((): void => {
            this.observer = new IntersectionObserver(
                (entries: IntersectionObserverEntry[]): void => {
                    entries.forEach((entry: IntersectionObserverEntry): void => {
                        this.ngZone.runOutsideAngular((): void => this.observeChange(entry));
                        this.previousRation = entry.intersectionRatio;
                    });
                },
                { root: null, rootMargin: '0px 0px 0px 0px', threshold: [0] }
            );

            this.observer.observe(this.element.nativeElement);
        });
    }

    public ngOnDestroy(): void {
        this.element = { nativeElement: null };
        cancelAnimationFrame(this.frameId!);
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    private observeChange(entry: IntersectionObserverEntry): void {
        const isVisible: boolean = entry.intersectionRatio > this.previousRation || entry.isIntersecting;
        cancelAnimationFrame(this.frameId!);
        this.frameId = window.requestAnimationFrame((): void => this.observeVisible.emit(isVisible));
    }
}
