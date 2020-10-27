import { Directive, ElementRef, HostListener, Input, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TooltipOffset, TooltipPlacement, TooltipSize } from './tooltip.interface';
import { TOOLTIP_DELTA, TOOLTIP_MIN_DURATION, TOOLTIP_OFFSET_ELEMENT_PX } from './tooltip.properties';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective implements OnDestroy {
    @Input('tooltip') public tooltipTitle!: string;
    @Input('tooltip-disabled') public tooltipDisabled!: boolean;
    @Input('tooltip-placement') public placement: TooltipPlacement = 'top';
    @Input('tooltip-offset') public offset: number = TOOLTIP_OFFSET_ELEMENT_PX;
    @Input('tooltip-size') public size: TooltipSize = 'small';
    private tooltip: HTMLElement | null = null;
    private timeoutId!: number;

    constructor(
        private readonly el: ElementRef,
        private readonly renderer: Renderer2,
        private readonly ngZone: NgZone,
        private readonly translate: TranslateService
    ) {}

    private get canBeShow(): boolean {
        return !this.tooltipDisabled && !!this.tooltipTitle;
    }

    private static getScrollPos(): number {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        if (this.canBeShow) {
            this.show();
        }
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        if (this.tooltip) {
            this.hide();
        }
    }

    public ngOnDestroy(): void {
        window.clearTimeout(this.timeoutId);
        this.removeOldNodes();
    }

    public show(): void {
        window.clearTimeout(this.timeoutId);
        this.create();
        this.setPosition();
        this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
    }

    public hide(): void {
        this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
        this.ngZone.runOutsideAngular((): void => {
            this.timeoutId = window.setTimeout((): void => this.removeOldNodes(), TOOLTIP_MIN_DURATION);
        });
    }

    public create(): void {
        this.removeOldNodes();
        const text: string = this.translate.instant(this.tooltipTitle);
        this.tooltip = this.renderer.createElement('span');
        const div: HTMLDivElement = document.createElement('div');
        div.innerHTML = text;
        this.renderer.appendChild(this.tooltip, div);
        this.renderer.appendChild(document.body, this.tooltip);
        this.renderer.addClass(this.tooltip, 'ng-tooltip');
        this.renderer.addClass(this.tooltip, `ng-tooltip-${this.placement}`);
        this.renderer.addClass(this.tooltip, `ng-tooltip-${this.size}`);
    }

    public setPosition(): void {
        const hostPos: DOMRect = this.el.nativeElement.getBoundingClientRect();
        const tooltipPos: DOMRect | undefined = this.tooltip?.getBoundingClientRect();
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

    private removeOldNodes(): void {
        this.tooltip?.parentNode?.removeChild(this.tooltip);
        this.tooltip = null;
    }

    private setStyle(top: number, left: number, scrollPos: number): void {
        this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }

    private calculateByTop(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top - (tooltipPos?.height ?? 0) - this.offset;
        const left: number = hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / TOOLTIP_DELTA;
        return { top, left };
    }

    private calculateByBottom(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.bottom + this.offset;
        const left: number = hostPos.left + (hostPos.width - (tooltipPos?.width ?? 0)) / TOOLTIP_DELTA;
        return { top, left };
    }

    private calculateByLeft(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / TOOLTIP_DELTA;
        const left: number = hostPos.left - (tooltipPos?.width ?? 0) - this.offset;
        return { top, left };
    }

    private calculateByRight(hostPos: DOMRect, tooltipPos?: DOMRect): TooltipOffset {
        const top: number = hostPos.top + (hostPos.height - (tooltipPos?.height ?? 0)) / TOOLTIP_DELTA;
        const left: number = hostPos.right + this.offset;
        return { top, left };
    }
}
