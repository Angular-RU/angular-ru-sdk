import { Inject, Injectable } from '@angular/core';
import { Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

import { LOGGER_OPTIONS, LoggerLevel } from '../interfaces/logger.external';
import { LoggerOptionsImpl } from '../logger.options';

@Injectable()
export class CssFactory {
    private lineStyle: Nullable<string> = null;

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
        return (this.lineStyle?.length ?? 0) > 0 ? `${this.lineStyle};` : '';
    }

    public getStyleLabel(level: LoggerLevel): string {
        const color: Nullable<string> = this.options.labelColors[level];
        return `color: ${color}; font-weight: bold`;
    }

    public setClass(cssClassName: string): void {
        const classList: string[] = cssClassName.split(/\s+/g);
        const styles: string[] = [];

        classList.forEach((className: string): void => {
            const style: Nullable<string> = this.options.cssClassMap[className];

            if (isNotNil(style)) {
                styles.push(style as string);
            }
        });

        const localStyles: string = styles.length ? styles.join('; ') : '';
        this.lineStyle = `${this.globalStyles}${localStyles}`;
    }

    private clearLocalStyle(): void {
        this.lineStyle = '';
    }
}
