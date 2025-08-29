import {
    Directive,
    ElementRef,
    inject,
    input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    output,
    SimpleChanges,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {checkValueIsFilled, isNotNil, isTrue} from '@angular-ru/cdk/utils';
import {fromEvent, Subject} from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';

import {TABLE_GLOBAL_OPTIONS} from '../config/table-global-options';
import {BoxView, DynamicHeightOptions} from '../interfaces/table-builder.internal';
import {
    BORDER_TOB_WITH_BOTTOM,
    HEAD_TOP,
    SCROLLBAR_SIZE,
} from '../table-builder.properties';

const MIN_RESIZE_DELAY = 500;
const RECALCULATE_HEIGHT = 100;

@Directive({selector: '[autoHeight]'})
export class AutoHeight<T> implements OnInit, OnChanges, OnDestroy {
    private readonly element = inject(ElementRef);
    public readonly ngZone = inject(NgZone);

    private readonly _destroy$: Subject<boolean> = new Subject<boolean>();
    private readonly minHeight: number = 0;
    private useOnlyAutoViewPort = false;
    private isDirtyCheck = false;
    private taskId: Nullable<number> = null;
    public readonly autoHeight = input<Partial<DynamicHeightOptions>>({});

    public readonly tableViewport = input<Partial<HTMLDivElement>>({});

    public readonly sourceRef = input<T[]>([]);

    public readonly recalculatedHeight = output();

    public get destroy$(): Subject<boolean> {
        return this._destroy$;
    }

    private get canCalculated(): boolean {
        const autoHeight = this.autoHeight();

        return (
            isTrue(autoHeight.inViewport) &&
            autoHeight.sourceLength! > 0 &&
            this.sourceRef().length > 0
        );
    }

    // eslint-disable-next-line complexity
    private get style(): string {
        let height: Nullable<string> = null;

        const autoHeight = this.autoHeight();

        if (checkValueIsFilled(autoHeight.rootHeight)) {
            height = autoHeight.rootHeight;
        } else if (isTrue(autoHeight.detect)) {
            const paddingTop: string = AutoHeight.getStyle(
                this.rootCurrentElement,
                'padding-top',
            );
            const paddingBottom: string = AutoHeight.getStyle(
                this.rootCurrentElement,
                'padding-bottom',
            );

            if (this.useOnlyAutoViewPort && this.columnHeight > this.parentOffsetHeight) {
                height = this.getHeightByViewPort({paddingTop, paddingBottom});
            } else if (this.parentOffsetHeight > this.columnHeight) {
                height = this.getDefaultHeight(this.parentOffsetHeight);
            } else if (this.isNotEmptyParentHeight) {
                height = this.getHeightByParent({paddingTop, paddingBottom});
            } else {
                height = this.getHeightByViewPort({paddingTop, paddingBottom});
            }
        }

        return isNotNil(height) ? `display: block; height: ${height}` : '';
    }

    private get isNotEmptyParentHeight(): boolean {
        // eslint-disable-next-line sonarjs/no-inverted-boolean-check
        return !(this.parentOffsetHeight < parseInt(HEAD_TOP));
    }

    private get parentOffsetHeight(): number {
        return (
            (this.rootCurrentElement.clientHeight ?? this.minHeight) -
            this.scrollbarHeight -
            BORDER_TOB_WITH_BOTTOM
        );
    }

    private get currentElement(): HTMLDivElement {
        return this.element.nativeElement;
    }

    private get rootCurrentElement(): Partial<HTMLElement> {
        return this.currentElement.parentNode?.parentElement || {};
    }

    private get columnHeight(): number {
        return this.autoHeight().columnHeight ?? 0;
    }

    private get autoViewHeight(): number {
        return (
            document.body.clientHeight - this.currentElement.getBoundingClientRect().top
        );
    }

    private get scrollbarHeight(): number {
        const scrollHeight: number =
            this.sourceRef().length === 1
                ? SCROLLBAR_SIZE
                : (this.tableViewport().offsetHeight ?? 0) -
                  (this.tableViewport().clientHeight ?? 0);

        return scrollHeight + BORDER_TOB_WITH_BOTTOM;
    }

    private get headerHeight(): number {
        return this.autoHeight().headerHeight ?? 0;
    }

    private get footerHeight(): number {
        return this.autoHeight().footerHeight ?? 0;
    }

    private static getStyle(element: Element | any, strCssRule: string): string {
        let strValue = '0px';
        let strRule: string = strCssRule;

        if (document.defaultView && isNotNil(document.defaultView.getComputedStyle)) {
            try {
                strValue = document.defaultView
                    .getComputedStyle(element, '')
                    .getPropertyValue(strRule);
            } catch {
                strValue = '0px';
            }
        } else if (isNotNil(element.currentStyle)) {
            strRule = strRule.replaceAll(/-(\w)/g, (_: string, p1: string): string =>
                p1.toUpperCase(),
            );
            strValue = element.currentStyle[strRule];
        }

        return strValue;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular((): void => {
            fromEvent(window, 'resize', {passive: true})
                .pipe(delay(MIN_RESIZE_DELAY), takeUntil(this._destroy$))
                .subscribe((): void => this.recalculateTableSize());
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('autoHeight' in changes) {
            this.recalculateTableSize();
        }
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);

        /**
         * @description
         * If you want an Observable to be done with his task, you call observable.complete().
         * This only exists on Subject and those who extend Subject.
         * The complete method in itself will also unsubscribe any possible subscriptions.
         */
        this._destroy$.complete();
    }

    public recalculateTableSize(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.taskId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.taskId = window.setTimeout((): void => {
                if (this.canCalculated && !this.isDirtyCheck) {
                    this.markForCheck();
                }

                if (this.isDirtyCheck && isTrue(this.autoHeight().inViewport)) {
                    this.calculateHeight();
                    this.recalculatedHeight.emit();
                }
            }, RECALCULATE_HEIGHT);
        });
    }

    public calculateHeight(): void {
        if (this.canCalculated) {
            this.setHeightByParent();
        }
    }

    public markForCheck(): void {
        this.isDirtyCheck = true;

        if (this.parentOffsetHeight <= TABLE_GLOBAL_OPTIONS.ROW_HEIGHT) {
            this.useOnlyAutoViewPort = true;
        }
    }

    private getDefaultHeight(parentHeight?: number): string {
        let height: number =
            this.columnHeight +
            this.scrollbarHeight +
            this.headerHeight +
            this.footerHeight;

        if (isNotNil(parentHeight)) {
            height = height > parentHeight ? parentHeight : height;
        }

        return `calc(${height}px)`;
    }

    private getHeightByParent({paddingTop, paddingBottom}: BoxView): string {
        const viewportHeight: number = this.parentOffsetHeight - parseInt(HEAD_TOP);

        return `calc(${viewportHeight}px - ${paddingTop.trim() || '0px'} - ${paddingBottom.trim() || '0px'})`;
    }

    private getHeightByViewPort({paddingTop, paddingBottom}: BoxView): string {
        const viewportHeight: number = this.autoViewHeight - parseInt(HEAD_TOP);

        return this.columnHeight > viewportHeight
            ? `calc(${viewportHeight}px - ${paddingTop.trim() || '0px'} - ${paddingBottom.trim() || '0px'} - ${this.scrollbarHeight}px)`
            : this.getDefaultHeight();
    }

    private setHeightByParent(): void {
        this.currentElement.setAttribute('style', this.style);
    }
}
