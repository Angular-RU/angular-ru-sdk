import { TemplateRef } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipSize = 'small' | 'medium';

export interface TooltipOffset {
    top: number;
    left: number;
}

export interface TooltipTextInterceptor {
    instant?(value?: string | null): string | undefined | null;
}

export interface TooltipOptions {
    timeoutForWaitAfterBlurTooltip: number;
    durationAfterDestroy: number;
    durationBeforeCreate: number;
    cssStyle: string;
}

export type TooltipValue = number | string | TemplateRef<Any> | null | undefined;

export type TooltipContextValue<T = unknown> = T | null | undefined;
