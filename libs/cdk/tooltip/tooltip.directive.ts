/* eslint-disable @angular-eslint/no-input-rename */
import {
    ElementRef,
    EmbeddedViewRef,
    inject,
    NgZone,
    OnDestroy,
    Renderer2,
} from '@angular/core';
import {Directive, Input, TemplateRef} from '@angular/core';
import {generateQuickGuid} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty, isFalsy, isNotNil} from '@angular-ru/cdk/utils';
import {fromEvent, Subscription} from 'rxjs';

import {TooltipContextValue} from './interfaces/tooltip-context-value';
import {TooltipOffset} from './interfaces/tooltip-offset';
import {TooltipOptions} from './interfaces/tooltip-options';
import {TooltipPlacement} from './interfaces/tooltip-placement';
import {TooltipSize} from './interfaces/tooltip-size';
import {TooltipTextInterceptor} from './interfaces/tooltip-text-interceptor';
import {TooltipValue} from './interfaces/tooltip-value';
import {TooltipDomLeakService} from './services/tooltip-dom-leak.service';
import {TOOLTIP_OPTIONS_TOKEN, TOOLTIP_TEXT_INTERCEPTOR_TOKEN} from './tooltip.tokens';

@Directive({selector: '[tooltip]'})
export class Tooltip implements OnDestroy {
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly renderer = inject<Renderer2>(Renderer2);
    private readonly ngZone = inject<NgZone>(NgZone);
    private readonly options = inject<TooltipOptions>(TOOLTIP_OPTIONS_TOKEN);
    private readonly interceptor = inject<TooltipTextInterceptor>(
        TOOLTIP_TEXT_INTERCEPTOR_TOKEN,
    );

    private readonly domLeak = inject<TooltipDomLeakService>(TooltipDomLeakService);

    private readonly delta: number = 2;
    private readonly layoutMinDuration: number = 100;
    private tooltipDomElement: Nullable<HTMLElement> = null;
    private timeoutId?: number;
    private frameId?: number;
    private createLayoutId?: number;
    private hideId?: number;
    private mouseLeaveTooltipId?: number;
    private tooltipMouseenter: Nullable<Subscription> = null;
    private tooltipMouseleave: Nullable<Subscription> = null;
    private readonly handlerOptions: AddEventListenerOptions = {passive: true};
    private internalTooltipValue: TooltipValue = null;
    private internalContext: TooltipContextValue = null;
    private mouseenterListener!: EventListenerOrEventListenerObject;
    private mouseleaveListener!: EventListenerOrEventListenerObject;
    @Input('tooltip-disabled')
    public tooltipDisabled!: boolean;

    @Input('tooltip-placement')
    public placement: TooltipPlacement = 'top';

    @Input('tooltip-css-style')
    public localCssStyle: Nullable<string> = null;

    @Input('tooltip-size')
    public size: TooltipSize = 'small';

    public uid: string = generateQuickGuid();

    constructor() {
        this.addUidToElement();
        this.connectMouseEvents();
    }

    @Input('tooltip-context')
    public set context(contextValue: TooltipContextValue) {
        this.internalContext = contextValue;
        this.refreshTooltipContent();
    }

    @Input()
    public set tooltip(tooltipValue: TooltipValue) {
        this.internalTooltipValue = tooltipValue;
        this.refreshTooltipContent();
    }

    private get offsetElementHeight(): number {
        return this.tooltipDomElement?.clientHeight ?? 0;
    }

    private get offsetElementWidth(): number {
        return this.tooltipDomElement?.clientWidth ?? 0;
    }

    private static getScrollPos(): number {
        return (
            window.scrollY ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
        );
    }

    public onMouseenterHandler(): void {
        if (this.tooltipDisabled) {
            return;
        }

        this.domLeak.invalidationOfIrrelevantNodes();
        this.showTooltip();
    }

    public onMouseleaveHandler(): void {
        if (this.tooltipDisabled) {
            return;
        }

        this.destroyAllTimeouts();
        this.hideTooltip();
    }

    public ngOnDestroy(): void {
        this.disconnectMouseEvents();
        this.destroyAllTimeouts();
        this.removeOldNodes();
    }

    public showTooltip(): void {
        this.destroyAllTimeouts();

        if (isNotNil(this.tooltipDomElement)) {
            this.addTooltipShowClass();

            return;
        }

        this.addTooltipToBodyWithAnimation();
    }

    public hideTooltip(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.hideId);
            // eslint-disable-next-line no-restricted-properties
            this.hideId = window.setTimeout((): void => {
                this.removeTooltipShowClass();
                // eslint-disable-next-line no-restricted-properties
                this.timeoutId = window.setTimeout(
                    (): void => this.removeOldNodes(),
                    this.options.durationAfterDestroy,
                );
            }, this.layoutMinDuration);
        });
    }

    public addTooltipElementToBody(): void {
        this.tooltipDomElement = this.createTooltipElement();

        if (isNotNil(this.tooltipDomElement)) {
            this.renderer.appendChild(document.body, this.tooltipDomElement);
            this.renderer.setAttribute(this.tooltipDomElement, 'id', this.uid);
            this.renderer.addClass(this.tooltipDomElement, 'ng-tooltip');
            this.renderer.addClass(
                this.tooltipDomElement,
                `ng-tooltip-${this.placement}`,
            );
            this.renderer.addClass(this.tooltipDomElement, `ng-tooltip-${this.size}`);
        }
    }

    public setPosition(): void {
        const hostPos: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
        const tooltipPos: Nullable<DOMRect> =
            this.tooltipDomElement?.getBoundingClientRect();
        const scrollPos: number = Tooltip.getScrollPos();

        if (this.placement === 'top') {
            const {top, left}: TooltipOffset = this.calculateByTop(hostPos, tooltipPos);

            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'bottom') {
            const {top, left}: TooltipOffset = this.calculateByBottom(
                hostPos,
                tooltipPos,
            );

            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'left') {
            const {top, left}: TooltipOffset = this.calculateByLeft(hostPos, tooltipPos);

            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'right') {
            const {top, left}: TooltipOffset = this.calculateByRight(hostPos, tooltipPos);

            this.setStyle(top, left, scrollPos);
        }
    }

    private addTooltipToBodyWithAnimation(): void {
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.frameId = window.setTimeout((): void => {
                this.addTooltipElementToBody();

                if (isNotNil(this.tooltipDomElement)) {
                    this.tooltipListenOnHoverEvent();

                    // eslint-disable-next-line no-restricted-properties
                    this.createLayoutId = window.setTimeout((): void => {
                        this.setPosition();
                        this.addTooltipShowClass();
                        this.markElementAddInDom();
                    }, this.layoutMinDuration);
                }
            }, this.options.durationBeforeCreate);
        });
    }

    private refreshTooltipContent(): void {
        if (isNotNil(this.tooltipDomElement)) {
            const contentDomElement: Nullable<HTMLElement> = this.createTooltipContent();

            if (isNotNil(contentDomElement)) {
                const childElements: HTMLCollection | never[] =
                    this.tooltipDomElement?.children ?? [];

                for (const child of Array.from(childElements)) {
                    this.renderer.removeChild(this.tooltipDomElement, child);
                }

                this.renderer.appendChild(this.tooltipDomElement, contentDomElement);
            }
        }
    }

    private markElementAddInDom(): void {
        if (isNotNil(this.tooltipDomElement)) {
            this.domLeak.actualContainsInDomUidCollections.add(this.uid);
        }
    }

    private markElementRemoveFromDom(): void {
        if (isFalsy(this.tooltipDomElement)) {
            this.domLeak.actualContainsInDomUidCollections.delete(this.uid);
        }
    }

    private connectMouseEvents(): void {
        this.mouseenterListener = (): void => this.onMouseenterHandler();
        this.mouseleaveListener = (): void => this.onMouseleaveHandler();

        this.ngZone.runOutsideAngular((): void => {
            this.elementRef.nativeElement.addEventListener(
                'mouseenter',
                this.mouseenterListener,
                this.handlerOptions,
            );
            this.elementRef.nativeElement.addEventListener(
                'mouseleave',
                this.mouseleaveListener,
                this.handlerOptions,
            );
        });
    }

    private disconnectMouseEvents(): void {
        this.elementRef.nativeElement.removeEventListener(
            'mouseenter',
            this.mouseenterListener,
            this.handlerOptions,
        );
        this.elementRef.nativeElement.removeEventListener(
            'mouseleave',
            this.mouseleaveListener,
            this.handlerOptions,
        );
    }

    private addUidToElement(): void {
        this.elementRef.nativeElement.setAttribute('data-tooltip-uid', this.uid);
    }

    private addTooltipShowClass(): void {
        if (isNotNil(this.tooltipDomElement)) {
            this.renderer.addClass(this.tooltipDomElement, 'ng-tooltip-show');
        }
    }

    private removeTooltipShowClass(): void {
        if (isNotNil(this.tooltipDomElement)) {
            this.renderer.removeClass(this.tooltipDomElement, 'ng-tooltip-show');
        }
    }

    private tooltipListenOnHoverEvent(): void {
        window.clearTimeout(this.mouseLeaveTooltipId);

        if (isNotNil(this.tooltipDomElement)) {
            this.tooltipMouseenter?.unsubscribe();
            this.tooltipMouseleave?.unsubscribe();

            this.tooltipMouseenter = fromEvent(
                this.tooltipDomElement ?? [],
                'mouseenter',
            ).subscribe((): void => {
                window.clearTimeout(this.hideId);
                window.clearTimeout(this.mouseLeaveTooltipId);
            });

            this.tooltipMouseleave = fromEvent(
                this.tooltipDomElement ?? [],
                'mouseleave',
            ).subscribe((): void => {
                window.clearTimeout(this.mouseLeaveTooltipId);
                // eslint-disable-next-line no-restricted-properties
                this.mouseLeaveTooltipId = window.setTimeout(
                    (): void => this.hideTooltip(),
                    this.options.timeoutForWaitAfterBlurTooltip,
                );
            });
        }
    }

    // eslint-disable-next-line complexity
    private createTooltipContent(): Nullable<HTMLDivElement> {
        const content: HTMLDivElement = document.createElement('div');

        if (this.internalTooltipValue instanceof TemplateRef) {
            const view: EmbeddedViewRef<any> =
                this.internalTooltipValue.createEmbeddedView({
                    $implicit: this.internalContext,
                });

            view.detectChanges();
            content.append(...view.rootNodes);
        } else if (checkValueIsEmpty(this.internalTooltipValue)) {
            return null;
        } else if (isNotNil(this.internalTooltipValue)) {
            const value: string = this.internalTooltipValue?.toString() ?? '';

            content.innerHTML = this.interceptor.instant?.(value) ?? value;
        }

        content.style.cssText = this.localCssStyle ?? this.options.cssStyle;

        return content;
    }

    private createTooltipElement(): Nullable<HTMLElement> {
        const contentDomElement: Nullable<HTMLElement> = this.createTooltipContent();

        if (isNotNil(contentDomElement)) {
            const tooltipDomElement: HTMLElement = this.renderer.createElement('div');

            this.renderer.appendChild(tooltipDomElement, contentDomElement);

            return tooltipDomElement;
        }

        return null;
    }

    private destroyAllTimeouts(): void {
        window.clearTimeout(this.frameId);
        window.clearTimeout(this.createLayoutId);
        window.clearTimeout(this.mouseLeaveTooltipId);
        window.clearTimeout(this.timeoutId);
        window.clearTimeout(this.hideId);
    }

    private removeOldNodes(): void {
        if (isNotNil(this.tooltipDomElement)) {
            const element: Nullable<HTMLElement> = document.getElementById(this.uid);

            element?.remove();
            this.tooltipDomElement = null;
        }

        this.markElementRemoveFromDom();
    }

    private setStyle(top: number, left: number, scrollPos: number): void {
        this.renderer.setStyle(this.tooltipDomElement, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltipDomElement, 'left', `${left}px`);
    }

    private calculateByTop(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top - this.offsetElementHeight;
        const left: number =
            hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / this.delta;

        return {top, left};
    }

    private calculateByBottom(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.bottom;
        const left: number =
            hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / this.delta;

        return {top, left};
    }

    private calculateByLeft(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number =
            hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / this.delta;
        const left: number = hostPos.left - this.offsetElementWidth;

        return {top, left};
    }

    private calculateByRight(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number =
            hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / this.delta;
        const left: number = hostPos.right;

        return {top, left};
    }
}
