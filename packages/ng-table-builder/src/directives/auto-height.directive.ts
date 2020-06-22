import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { TABLE_GLOBAL_OPTIONS } from '../config/table-global-options';
import { TableRow } from '../interfaces/table-builder.external';
import { Any, BoxView, DynamicHeightOptions } from '../interfaces/table-builder.internal';
import { BORDER_TOB_WITH_BOTTOM, HEAD_TOP, SCROLLBAR_WIDTH } from '../symbols';

const MIN_RESIZE_DELAY: number = 500;
const RECALCULATE_HEIGHT: number = 100;

@Directive({ selector: '[autoHeight]' })
export class AutoHeightDirective implements OnInit, OnChanges, OnDestroy {
    @Input() public autoHeight: Partial<DynamicHeightOptions> = {};
    @Input() public tableViewport: Partial<HTMLDivElement> = {};
    @Input() public sourceRef: TableRow[] = [];
    @Output() public recalculatedHeight: EventEmitter<void> = new EventEmitter(true);
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private readonly minHeight: number = 0;
    private useOnlyAutoViewPort: boolean = false;
    private isDirtyCheck: boolean | null = null;
    private taskId: number | null = null;

    constructor(private readonly element: ElementRef, public readonly ngZone: NgZone) {}

    private get height(): number {
        return this.autoHeight.height!;
    }

    private get canCalculated(): boolean {
        return !!this.autoHeight.inViewport && this.autoHeight.sourceLength! > 0 && this.sourceRef.length > 0;
    }

    // eslint-disable-next-line complexity
    private get style(): string {
        let height: string | null = null;

        if (this.height) {
            height = `${this.height}px`;
        } else if (this.autoHeight.detect) {
            const paddingTop: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-top');
            const paddingBottom: string = AutoHeightDirective.getStyle(this.rootCurrentElement, 'padding-bottom');

            if (this.useOnlyAutoViewPort && this.columnHeight > this.parentOffsetHeight) {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            } else if (this.parentOffsetHeight > this.columnHeight) {
                height = this.getDefaultHeight(this.parentOffsetHeight);
            } else if (this.isNotEmptyParentHeight) {
                height = this.getHeightByParent({ paddingTop, paddingBottom });
            } else {
                height = this.getHeightByViewPort({ paddingTop, paddingBottom });
            }
        }

        return height ? `display: block; height: ${height ?? 0}` : '';
    }

    private get isNotEmptyParentHeight(): boolean {
        return !(this.parentOffsetHeight < parseInt(HEAD_TOP));
    }

    private get parentOffsetHeight(): number {
        return (this.rootCurrentElement.clientHeight || this.minHeight) - this.scrollbarHeight - BORDER_TOB_WITH_BOTTOM;
    }

    private get currentElement(): HTMLDivElement {
        return this.element.nativeElement;
    }

    private get rootCurrentElement(): Partial<HTMLElement> {
        return (this.currentElement.parentNode && this.currentElement.parentNode.parentElement) || {};
    }

    private get columnHeight(): number {
        return this.autoHeight.columnHeight || 0;
    }

    private get autoViewHeight(): number {
        return document.body.clientHeight - this.currentElement.getBoundingClientRect().top;
    }

    private get scrollbarHeight(): number {
        const scrollHeight: number =
            this.sourceRef.length === 1
                ? SCROLLBAR_WIDTH
                : (this.tableViewport.offsetHeight ?? 0) - (this.tableViewport.clientHeight ?? 0);
        return scrollHeight + BORDER_TOB_WITH_BOTTOM;
    }

    private get headerHeight(): number {
        return this.autoHeight.headerHeight || 0;
    }

    private get footerHeight(): number {
        return this.autoHeight.footerHeight || 0;
    }

    private static getStyle(element: Element | Any, strCssRule: string): string {
        let strValue: string = '';

        if (document.defaultView && document.defaultView.getComputedStyle) {
            try {
                strValue = document.defaultView.getComputedStyle(element, '').getPropertyValue(strCssRule);
            } catch (e) {
                strValue = '0px';
            }
        } else if (element.currentStyle) {
            strCssRule = strCssRule.replace(/\-(\w)/g, (_: string, p1: string): string => p1.toUpperCase());
            strValue = element.currentStyle[strCssRule];
        }

        return strValue;
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular((): void => {
            fromEvent(window, 'resize', { passive: true })
                .pipe(delay(MIN_RESIZE_DELAY), takeUntil(this.destroy$))
                .subscribe((): void => this.recalculateTableSize());
        });
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('autoHeight' in changes) {
            this.recalculateTableSize();
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public recalculateTableSize(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.taskId!);
            this.taskId = window.setTimeout((): void => {
                if (this.canCalculated && !this.isDirtyCheck) {
                    this.markForCheck();
                }

                if (this.isDirtyCheck && this.autoHeight.inViewport) {
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
        let height: number = this.columnHeight + this.scrollbarHeight + this.headerHeight + this.footerHeight;

        if (parentHeight) {
            height = height > parentHeight ? parentHeight : height;
        }

        return `calc(${height}px)`;
    }

    private getHeightByParent({ paddingTop, paddingBottom }: BoxView): string {
        const viewportHeight: number = this.parentOffsetHeight - parseInt(HEAD_TOP);
        return `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom})`;
    }

    private getHeightByViewPort({ paddingTop, paddingBottom }: BoxView): string {
        const viewportHeight: number = this.autoViewHeight - parseInt(HEAD_TOP);
        return this.columnHeight > viewportHeight
            ? `calc(${viewportHeight}px - ${paddingTop} - ${paddingBottom} - ${this.scrollbarHeight}px)`
            : this.getDefaultHeight();
    }

    private setHeightByParent(): void {
        this.currentElement.setAttribute('style', this.style);
    }
}
