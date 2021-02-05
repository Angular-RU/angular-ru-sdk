import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    Renderer2,
    TemplateRef
} from '@angular/core';
import { generateQuickGuid } from '@angular-ru/common/string';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';
import { fromEvent, Subscription } from 'rxjs';

import {
    TooltipContextValue,
    TooltipOffset,
    TooltipOptions,
    TooltipPlacement,
    TooltipSize,
    TooltipTextInterceptor,
    TooltipValue
} from './tooltip.interfaces';
import { TOOLTIP_OPTIONS_TOKEN, TOOLTIP_TEXT_INTERCEPTOR_TOKEN } from './tooltip.tokens';
import { TooltipDomLeakService } from './tooltip-dom-leak.service';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
    public uid: string = generateQuickGuid();
    @Input('tooltip-disabled') public tooltipDisabled!: boolean;
    @Input('tooltip-placement') public placement: TooltipPlacement = 'top';
    @Input('tooltip-css-style') public localCssStyle: string | null = null;
    @Input('tooltip-size') public size: TooltipSize = 'small';
    private readonly delta: number = 2;
    private readonly layoutMinDuration: number = 100;
    private tooltipDomElement: HTMLElement | null = null;
    private timeoutId: number | null = null;
    private frameId: number | null = null;
    private createLayoutId: number | null = null;
    private hideId: number | null = null;
    private mouseLeaveTooltipId: number | null = null;
    private tooltipMouseenter: Subscription | null = null;
    private tooltipMouseleave: Subscription | null = null;
    private handlerOptions: AddEventListenerOptions = { passive: true };
    private internalTooltipValue: TooltipValue = null;
    private internalContext: TooltipContextValue = null;

    constructor(
        private readonly el: ElementRef,
        private readonly renderer: Renderer2,
        private readonly ngZone: NgZone,
        @Inject(TOOLTIP_OPTIONS_TOKEN)
        private readonly options: TooltipOptions,
        @Inject(TOOLTIP_TEXT_INTERCEPTOR_TOKEN)
        private readonly interceptor: TooltipTextInterceptor,
        private readonly domLeak: TooltipDomLeakService
    ) {
        this.addUidToElement();
        this.connectMouseEvents();
    }

    @Input('tooltip-context')
    public set context(contextValue: TooltipContextValue) {
        this.internalContext = contextValue;
        this.refreshTooltipContent();
    }

    @Input('tooltip')
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
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
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
        if (this.tooltipDomElement) {
            this.addTooltipShowClass();
            return;
        }

        this.addTooltipToBodyWithAnimation();
    }

    public hideTooltip(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearTimeout(this.hideId!);
            this.hideId = window.setTimeout((): void => {
                this.removeTooltipShowClass();
                this.timeoutId = window.setTimeout(
                    (): void => this.removeOldNodes(),
                    this.options.durationAfterDestroy
                );
            }, this.layoutMinDuration);
        });
    }

    public addTooltipElementToBody(): void {
        this.tooltipDomElement = this.createTooltipElement();

        if (this.tooltipDomElement) {
            this.renderer.appendChild(document.body, this.tooltipDomElement);
            this.renderer.setAttribute(this.tooltipDomElement, 'id', this.uid);
            this.renderer.addClass(this.tooltipDomElement, 'ng-tooltip');
            this.renderer.addClass(this.tooltipDomElement, `ng-tooltip-${this.placement}`);
            this.renderer.addClass(this.tooltipDomElement, `ng-tooltip-${this.size}`);
        }
    }

    public setPosition(): void {
        const hostPos: DOMRect = this.el.nativeElement.getBoundingClientRect();
        const tooltipPos: DOMRect | undefined = this.tooltipDomElement?.getBoundingClientRect();
        const scrollPos: number = TooltipDirective.getScrollPos();

        if (this.placement === 'top') {
            const { top, left }: TooltipOffset = this.calculateByTop(hostPos, tooltipPos);
            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'bottom') {
            const { top, left }: TooltipOffset = this.calculateByBottom(hostPos, tooltipPos);
            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'left') {
            const { top, left }: TooltipOffset = this.calculateByLeft(hostPos, tooltipPos);
            this.setStyle(top, left, scrollPos);
        } else if (this.placement === 'right') {
            const { top, left }: TooltipOffset = this.calculateByRight(hostPos, tooltipPos);
            this.setStyle(top, left, scrollPos);
        }
    }

    private addTooltipToBodyWithAnimation(): void {
        this.ngZone.runOutsideAngular((): void => {
            this.frameId = window.setTimeout((): void => {
                this.addTooltipElementToBody();

                if (this.tooltipDomElement) {
                    this.tooltipListenOnHoverEvent();

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
        if (this.tooltipDomElement) {
            const contentDomElement: HTMLElement | null = this.createTooltipContent();
            if (contentDomElement) {
                const childElements: HTMLCollection = this.tooltipDomElement.children;
                for (const child of Array.from(childElements)) {
                    this.renderer.removeChild(this.tooltipDomElement, child);
                }

                this.renderer.appendChild(this.tooltipDomElement, contentDomElement);
            }
        }
    }

    private markElementAddInDom(): void {
        if (this.tooltipDomElement) {
            this.domLeak.actualContainsInDomUidCollections.add(this.uid);
        }
    }

    private markElementRemoveFromDom(): void {
        if (!this.tooltipDomElement) {
            this.domLeak.actualContainsInDomUidCollections.delete(this.uid);
        }
    }

    private connectMouseEvents(): void {
        this.ngZone.runOutsideAngular((): void => {
            this.el.nativeElement.addEventListener(
                'mouseenter',
                (): void => this.onMouseenterHandler(),
                this.handlerOptions
            );

            this.el.nativeElement.addEventListener(
                'mouseleave',
                (): void => this.onMouseleaveHandler(),
                this.handlerOptions
            );
        });
    }

    private disconnectMouseEvents(): void {
        this.el.nativeElement.removeEventListener(
            'mouseenter',
            (): void => this.onMouseenterHandler(),
            this.handlerOptions
        );

        this.el.nativeElement.removeEventListener(
            'mouseleave',
            (): void => this.onMouseleaveHandler(),
            this.handlerOptions
        );
    }

    private addUidToElement(): void {
        this.el.nativeElement.setAttribute('data-tooltip-uid', this.uid);
    }

    private addTooltipShowClass(): void {
        if (this.tooltipDomElement) {
            this.renderer.addClass(this.tooltipDomElement, 'ng-tooltip-show');
        }
    }

    private removeTooltipShowClass(): void {
        if (this.tooltipDomElement) {
            this.renderer.removeClass(this.tooltipDomElement, 'ng-tooltip-show');
        }
    }

    private tooltipListenOnHoverEvent(): void {
        window.clearTimeout(this.mouseLeaveTooltipId!);

        if (this.tooltipDomElement) {
            this.tooltipMouseenter?.unsubscribe();
            this.tooltipMouseleave?.unsubscribe();

            this.tooltipMouseenter = fromEvent(this.tooltipDomElement, 'mouseenter').subscribe((): void => {
                window.clearTimeout(this.hideId!);
                window.clearTimeout(this.mouseLeaveTooltipId!);
            });

            this.tooltipMouseleave = fromEvent(this.tooltipDomElement, 'mouseleave').subscribe((): void => {
                window.clearTimeout(this.mouseLeaveTooltipId!);
                this.mouseLeaveTooltipId = window.setTimeout(
                    (): void => this.hideTooltip(),
                    this.options.timeoutForWaitAfterBlurTooltip
                );
            });
        }
    }

    private createTooltipContent(): HTMLDivElement | null {
        const content: HTMLDivElement = document.createElement('div');

        if (this.internalTooltipValue instanceof TemplateRef) {
            const view: EmbeddedViewRef<Any> = this.internalTooltipValue.createEmbeddedView({
                $implicit: this.internalContext
            });
            view.detectChanges();
            content.append(...view.rootNodes);
        } else if (checkValueIsEmpty(this.internalTooltipValue)) {
            return null;
        } else if (this.internalTooltipValue) {
            const value: string = this.internalTooltipValue?.toString();
            content.innerHTML = this.interceptor.instant?.(value) ?? value;
        }

        content.style.cssText = this.localCssStyle ?? this.options.cssStyle;

        return content;
    }

    private createTooltipElement(): HTMLElement | null {
        const contentDomElement: HTMLElement | null = this.createTooltipContent();

        if (contentDomElement) {
            const tooltipDomElement: HTMLElement = this.renderer.createElement('div');
            this.renderer.appendChild(tooltipDomElement, contentDomElement);
            return tooltipDomElement;
        }

        return null;
    }

    private destroyAllTimeouts(): void {
        window.clearTimeout(this.frameId!);
        window.clearTimeout(this.createLayoutId!);
        window.clearTimeout(this.mouseLeaveTooltipId!);
        window.clearTimeout(this.timeoutId!);
        window.clearTimeout(this.hideId!);
    }

    private removeOldNodes(): void {
        if (this.tooltipDomElement) {
            const element: HTMLElement | null = document.getElementById(this.uid);
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
        const left: number = hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / this.delta;
        return { top, left };
    }

    private calculateByBottom(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.bottom;
        const left: number = hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / this.delta;
        return { top, left };
    }

    private calculateByLeft(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / this.delta;
        const left: number = hostPos.left - this.offsetElementWidth;
        return { top, left };
    }

    private calculateByRight(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / this.delta;
        const left: number = hostPos.right;
        return { top, left };
    }
}
