import { Inject, Injectable } from '@angular/core';

import { LOGGER_OPTIONS, LoggerLevel } from '../interfaces/logger.external';
import { LoggerOptionsImpl } from '../logger.options';

@Injectable()
export class CssFactory {
    private lineStyle: string | null = null;

    constructor(@Inject(LOGGER_OPTIONS) private readonly options: LoggerOptionsImpl) {}

    public get style(): string {
        const style: string = this.localStyle;
        this.clearLocalStyle();
        return `${this.globalStyles}${style}`;
    }

    public set style(css: string) {
        this.lineStyle = css;
    }

    private get globalStyles(): string {
        return this.options.globalLineStyle ? `${this.options.globalLineStyle};` : '';
    }

    private get localStyle(): string {
        return this.lineStyle ? `${this.lineStyle};` : '';
    }

    public getStyleLabel(level: LoggerLevel): string {
        const color: string = this.options.labelColors[level];
        return `color: ${color}; font-weight: bold`;
    }

    public setClass(cssClassName: string): void {
        const classList: string[] = cssClassName.split(/\s+/g);
        const styles: string[] = [];

        classList.forEach((className: string): void => {
            const style: string | undefined = this.options.cssClassMap[className];
            if (style) {
                styles.push(style);
            }
        });

        const localStyles: string = styles.length ? styles.join('; ') : '';
        this.lineStyle = `${this.globalStyles}${localStyles}`;
    }

    private clearLocalStyle(): void {
        this.lineStyle = '';
    }
}
