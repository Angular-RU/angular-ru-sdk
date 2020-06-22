import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    NgZone,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { ColumnsSchema, ImplicitContext, TableRow, ViewPortInfo } from '../../interfaces/table-builder.external';
import { trim } from '../../operators/trim';

const TIME_IDLE: number = 1500;

@Component({
    selector: 'table-cell',
    templateUrl: './table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableCellComponent implements OnDestroy {
    @Input() public item: TableRow | null = null;
    @Input() public index: number | null = null;
    @Input() public parent: HTMLDivElement | null = null;
    @Input() public isRendered: boolean = false;
    @Input('is-filterable') public isFilterable: boolean = false;
    @Input('column-schema') public columnSchema: ColumnsSchema | null = null;
    @Input('enable-filtering') public enableFiltering: boolean = false;
    @Input('viewport-info') public viewportInfo: ViewPortInfo | null = null;
    public contextType: typeof ImplicitContext = ImplicitContext;
    private readonly closeButtonSelector: string = 'table-close__button';
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private readonly timeIdle: number = TIME_IDLE;
    private nodeSubscription: Subscription | null = null;
    private closeElemSub: Subscription | null = null;
    private timeoutShowedFrameId: number | null = null;
    private timeoutOverflowId: number | null = null;

    constructor(public readonly cd: ChangeDetectorRef, private readonly ngZone: NgZone) {}

    private get overflowContentElem(): HTMLDivElement {
        return document.querySelector(`.${this.overflowSelector}`) as HTMLDivElement;
    }

    private get overflowCloseElem(): HTMLDivElement {
        return document.querySelector(`.${this.closeButtonSelector}`) as HTMLDivElement;
    }

    private get disableTooltip(): boolean {
        return this.viewportInfo?.isScrolling || !this.columnSchema?.overflowTooltip;
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutOverflowId!);
        window.clearTimeout(this.timeoutShowedFrameId!);
    }

    public mouseEnterCell(element: HTMLDivElement, event: MouseEvent): void {
        if (this.disableTooltip) {
            return;
        }

        this.detectCheckOverflow(element, event);
    }

    public mouseLeaveCell(): void {
        if (this.disableTooltip) {
            return;
        }

        window.clearInterval(this.timeoutShowedFrameId!);
    }

    private isEllipsisActive(element: HTMLElement): boolean {
        return (
            element.offsetWidth > this.parent?.offsetWidth! ||
            element.offsetHeight > this.parent?.offsetHeight! ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        window.clearInterval(this.timeoutShowedFrameId!);
        this.ngZone.runOutsideAngular((): void => {
            this.timeoutShowedFrameId = window.setTimeout((): void => {
                const canEnableTooltip: boolean = this.viewportInfo?.isScrolling
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

        const elem: HTMLDivElement = document.createElement('div');
        elem.classList.add(this.overflowSelector);
        const minOffset: number = 15;
        const left: number = event.clientX - minOffset;
        const top: number = event.clientY - minOffset;

        elem.style.cssText = `left: ${left}px; top: ${top}px`;

        document.body.appendChild(elem);
        const innerText: string = String(element.innerText || '').trim();
        this.overflowContentElem.innerHTML = `<div class="${this.closeButtonSelector}"></div>${innerText}`;

        this.nodeSubscription = fromEvent(elem, 'mouseleave').subscribe((): void => this.removeElement());
        this.closeElemSub = fromEvent(this.overflowCloseElem, 'click').subscribe((): void => this.removeElement());

        this.ngZone.runOutsideAngular((): void => {
            this.timeoutOverflowId = window.setTimeout((): void => {
                if (this.viewportInfo?.isScrolling) {
                    this.removeElement();
                } else {
                    this.overflowContentElem.classList.add('visible');
                }
            }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
        });
    }

    private removeElement(): void {
        if (this.overflowContentElem) {
            this.overflowContentElem.classList.remove('visible');
            this.ngZone.runOutsideAngular((): void => {
                window.setTimeout((): void => {
                    if (this.overflowContentElem) {
                        this.overflowContentElem.parentNode?.removeChild(this.overflowContentElem);
                    }

                    this.nodeSubscription && this.nodeSubscription.unsubscribe();
                    this.closeElemSub && this.closeElemSub.unsubscribe();
                }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
            });
        }
    }
}
