export interface TooltipTextInterceptor {
    instant?(value?: string | null): string | undefined | null;
}
