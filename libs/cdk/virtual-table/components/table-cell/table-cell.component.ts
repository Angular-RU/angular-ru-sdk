/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnDestroy,
    ViewEncapsulation,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isFalse, isNotNil, isTrue} from '@angular-ru/cdk/utils';
import {fromEvent, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TABLE_GLOBAL_OPTIONS} from '../../config/table-global-options';
import {
    ColumnsSchema,
    ImplicitContext,
    ViewPortInfo,
} from '../../interfaces/table-builder.external';
import {trim} from '../../operators/trim';

const TIME_IDLE: number = 1500;

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TableCellComponent<T> implements OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private readonly closeButtonSelector: string = 'table-close__button';
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private readonly timeIdle: number = TIME_IDLE;
    private nodeSubscription: Nullable<Subscription> = null;
    private closeElemSub: Nullable<Subscription> = null;
    private timeoutShowedFrameId: Nullable<number> = null;
    private timeoutOverflowId: Nullable<number> = null;
    @Input() public item: Nullable<T> = null;
    @Input() public index: Nullable<number> = null;
    @Input() public parent: Nullable<HTMLDivElement> = null;
    @Input() public isRendered: boolean = false;
    @Input('is-filterable') public isFilterable: boolean = false;
    @Input('column-schema') public columnSchema: Nullable<ColumnsSchema> = null;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('viewport-info') public viewportInfo: Nullable<ViewPortInfo> = null;
    @Input('disable-deep-path') public disableDeepPath: boolean = false;
    public contextType: typeof ImplicitContext = ImplicitContext;

    constructor(
        public readonly cd: ChangeDetectorRef,
        private readonly ngZone: NgZone,
    ) {}

    private get overflowContentElem(): HTMLDivElement {
        return document.querySelector(`.${this.overflowSelector}`) as HTMLDivElement;
    }

    private get overflowCloseElem(): HTMLDivElement {
        return document.querySelector(`.${this.closeButtonSelector}`) as HTMLDivElement;
    }

    public ngOnDestroy(): void {
        this.removeElement();
        window.clearTimeout(this.timeoutOverflowId ?? 0);
        window.clearTimeout(this.timeoutShowedFrameId ?? 0);
        this.destroy$.next();
        this.destroy$.complete();
    }

    public mouseEnterCell(element: HTMLDivElement, event: MouseEvent): void {
        if (
            isFalse(this.columnSchema?.overflowTooltip) ||
            isTrue(this.viewportInfo?.isScrolling)
        ) {
            return;
        }

        this.detectCheckOverflow(element, event);
    }

    public mouseLeaveCell(event: MouseEvent): void {
        const isTooltipAsRelatedTarget: boolean =
            event.relatedTarget === this.overflowContentElem;

        if (
            isFalse(this.columnSchema?.overflowTooltip) ||
            isTrue(isTooltipAsRelatedTarget)
        ) {
            return;
        }

        this.removeElement();
        window.clearInterval(this.timeoutShowedFrameId ?? 0);
    }

    public $castKey(key: Nullable<string>): keyof T {
        return key as keyof T;
    }

    private isEllipsisActive(element: HTMLElement): boolean {
        return (
            element.offsetWidth > (this.parent?.offsetWidth ?? 0) ||
            element.offsetHeight > (this.parent?.offsetHeight ?? 0) ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        window.clearInterval(this.timeoutShowedFrameId ?? 0);
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.timeoutShowedFrameId = window.setTimeout((): void => {
                const canEnableTooltip: boolean = isTrue(this.viewportInfo?.isScrolling)
                    ? false
                    : this.isEllipsisActive(element);

                if (canEnableTooltip) {
                    this.removeElement();
                    this.showTooltip(element, event);
                }
            }, this.timeIdle);
        });
    }

    // eslint-disable-next-line max-lines-per-function
    private showTooltip(element: HTMLDivElement, event: MouseEvent): void {
        const empty: boolean = trim(element.innerText).length === 0;

        if (empty) {
            this.removeElement();

            return;
        }

        const divElement: HTMLDivElement = document.createElement('div');

        divElement.classList.add(this.overflowSelector);
        const minOffset: number = 15;
        const left: number = event.clientX - minOffset;
        const top: number = event.clientY - minOffset;

        divElement.style.cssText = `left: ${left}px; top: ${top}px`;

        document.body.appendChild(divElement);
        const innerText: string = String(element.innerText || '').trim();

        this.overflowContentElem.innerHTML = `<div class="${this.closeButtonSelector}"></div>${innerText}`;

        this.nodeSubscription = fromEvent(divElement, 'mouseleave')
            .pipe(takeUntil(this.destroy$))
            .subscribe((): void => this.removeElement());

        this.closeElemSub = fromEvent(this.overflowCloseElem, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe((): void => this.removeElement());

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.timeoutOverflowId = window.setTimeout((): void => {
                if (isTrue(this.viewportInfo?.isScrolling)) {
                    this.removeElement();
                } else {
                    this.overflowContentElem.classList.add('visible');
                }
            }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
        });
    }

    private removeElement(): void {
        if (isNotNil(this.overflowContentElem)) {
            this.overflowContentElem.classList.remove('visible');
            this.ngZone.runOutsideAngular((): void => {
                // eslint-disable-next-line no-restricted-properties
                window.setTimeout((): void => {
                    if (isNotNil(this.overflowContentElem)) {
                        this.overflowContentElem.parentNode?.removeChild(
                            this.overflowContentElem,
                        );
                    }

                    this.nodeSubscription?.unsubscribe();
                    this.closeElemSub?.unsubscribe();
                }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
            });
        }
    }
}
