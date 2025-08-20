/* eslint-disable @angular-eslint/no-input-rename */
import {NgTemplateOutlet} from '@angular/common';
import {ChangeDetectorRef, inject, input, NgZone, OnDestroy} from '@angular/core';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {DeepPathPipe} from '@angular-ru/cdk/pipes';
import {DefaultValuePipe} from '@angular-ru/cdk/pipes';
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
import {NgxFilterViewer} from '../ngx-filter-viewer/ngx-filter-viewer.component';

const TIME_IDLE = 1500;

@Component({
    selector: 'table-cell',
    imports: [DeepPathPipe, DefaultValuePipe, NgTemplateOutlet, NgxFilterViewer],
    templateUrl: './table-cell.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCell<T> implements OnDestroy {
    public readonly cd = inject(ChangeDetectorRef);
    private readonly ngZone = inject(NgZone);

    private readonly destroy$ = new Subject<void>();
    private readonly closeButtonSelector: string = 'table-close__button';
    private readonly overflowSelector: string = 'table-grid__cell-overflow-content';
    private readonly timeIdle: number = TIME_IDLE;
    private nodeSubscription: Nullable<Subscription> = null;
    private closeElemSub: Nullable<Subscription> = null;
    private timeoutShowedFrameId: Nullable<number> = null;
    private timeoutOverflowId: Nullable<number> = null;

    public readonly item = input<Nullable<T>>(null);
    public readonly index = input<Nullable<number>>(null);
    public readonly parent = input<Nullable<HTMLDivElement>>(null);
    public readonly isRendered = input(false);
    public readonly isFilterable = input(false, {alias: 'is-filterable'});
    public readonly columnSchema = input<Nullable<ColumnsSchema>>(null, {
        alias: 'column-schema',
    });

    public readonly enableFiltering = input(false, {alias: 'enable-filtering'});
    public readonly viewportInfo = input<Nullable<ViewPortInfo>>(null, {
        alias: 'viewport-info',
    });

    public readonly disableDeepPath = input(false, {alias: 'disable-deep-path'});

    public contextType: typeof ImplicitContext = ImplicitContext;

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
            isFalse(this.columnSchema()?.overflowTooltip) ||
            isTrue(this.viewportInfo()?.isScrolling)
        ) {
            return;
        }

        this.detectCheckOverflow(element, event);
    }

    public mouseLeaveCell(event: MouseEvent): void {
        const isTooltipAsRelatedTarget: boolean =
            event.relatedTarget === this.overflowContentElem;

        if (
            isFalse(this.columnSchema()?.overflowTooltip) ||
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
            element.offsetWidth > (this.parent()?.offsetWidth ?? 0) ||
            element.offsetHeight > (this.parent()?.offsetHeight ?? 0) ||
            element.scrollWidth > element.offsetWidth ||
            element.scrollHeight > element.offsetHeight
        );
    }

    private detectCheckOverflow(element: HTMLDivElement, event: MouseEvent): void {
        window.clearInterval(this.timeoutShowedFrameId ?? 0);
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.timeoutShowedFrameId = window.setTimeout((): void => {
                const canEnableTooltip: boolean = isTrue(this.viewportInfo()?.isScrolling)
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
        const minOffset = 15;
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
                if (isTrue(this.viewportInfo()?.isScrolling)) {
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
