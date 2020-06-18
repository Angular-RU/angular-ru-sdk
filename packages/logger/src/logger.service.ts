import { Inject, Injectable } from '@angular/core';

import { autoBind } from './decorators/autobind.decorator';
import { LogFn, LOGGER_OPTIONS, LoggerLevel, Pipeline, TimerInfo } from './interfaces/logger.external';
import { ObjectKeyMap } from './interfaces/logger.internal';
import { LoggerOptionsImpl } from './logger.options';
import { ClipboardFactory } from './services/clipboard-factory.service';
import { ConsoleService } from './services/console.service';
import { CssFactory } from './services/css-factory.service';
import { LoggerFactory } from './services/factory.service';
import { GroupFactory } from './services/group-factory.service';
import { JsonFactory } from './services/json-factory.service';
import { TimerFactory } from './services/timer-factory.service';

@autoBind
@Injectable()
export class LoggerService {
    private readonly DEFAULT_DEPTH: number = 2;

    // eslint-disable-next-line max-params
    constructor(
        private readonly clipboard: ClipboardFactory,
        private readonly cssFactory: CssFactory,
        private readonly console: ConsoleService,
        private readonly factory: LoggerFactory,
        private readonly groupFactory: GroupFactory,
        private readonly jsonFactory: JsonFactory,
        private readonly timerFactory: TimerFactory,
        @Inject(LOGGER_OPTIONS) private readonly options: LoggerOptionsImpl
    ) {}

    public get clear(): LogFn {
        return this.console.instance.clear.bind(this.console.instance) as LogFn;
    }

    public get table(): LogFn {
        return this.console.instance.table.bind(this.console.instance) as LogFn;
    }

    public get log(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.LOG, this);
    }

    public get trace(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.TRACE, this);
    }

    public get assert(): LogFn {
        return this.console.instance.assert.bind(this.console.instance) as LogFn;
    }

    public get debug(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.DEBUG, this);
    }

    public get info(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.INFO, this);
    }

    public get warn(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.WARN, this);
    }

    public get error(): LogFn {
        return this.factory.createLogger<LogFn>(LoggerLevel.ERROR, this);
    }

    public get level(): LoggerLevel {
        return this.console.minLevel;
    }

    public set level(level: LoggerLevel) {
        this.console.minLevel = level;
    }

    public getCurrentLineStyle(): string {
        return this.cssFactory.style;
    }

    public clearCssCurrentLine(): void {
        this.cssFactory.style = '';
    }

    public setLabels(labels: ObjectKeyMap<string>): void {
        this.options.labelNames = { ...this.options.labelNames, ...labels };
    }

    public setColors(colors: ObjectKeyMap<string>): void {
        this.options.labelColors = { ...this.options.labelColors, ...colors };
    }

    public pipe(...pipelines: Pipeline[]): LoggerService {
        if (this.groupFactory.executePipesGroup) {
            pipelines.forEach((pipeline: Pipeline): unknown => pipeline(this));
        }

        return this;
    }

    public groupCollapsed(title: string, pipeline?: Pipeline): LoggerService {
        this.groupFactory.groupCollapsed(title, pipeline, this, LoggerLevel.INFO);
        return this;
    }

    public close(): LoggerService {
        this.groupFactory.close();
        return this;
    }

    public closeAll(): LoggerService {
        this.groupFactory.closeAll();
        return this;
    }

    public group(title: string, pipeline?: Pipeline): LoggerService {
        this.groupFactory.group(title, pipeline, this, LoggerLevel.INFO);
        return this;
    }

    public css(style: string): LoggerService {
        this.cssFactory.style = style;
        return this;
    }

    public prettyJSON(json: ObjectKeyMap): string[] {
        return this.jsonFactory.colorsJSON(JSON.stringify(json, null, this.DEFAULT_DEPTH));
    }

    public cssClass(cssClassName: string): LoggerService {
        this.cssFactory.setClass(cssClassName);
        return this;
    }

    public copy(example: unknown): boolean {
        return this.clipboard.copyOnBuffer(example);
    }

    public startTime(title: string, level: LoggerLevel = LoggerLevel.DEBUG): TimerInfo | null {
        return this.timerFactory.startTime(title, level);
    }

    public endTime(
        info: TimerInfo | null,
        level: LoggerLevel = LoggerLevel.DEBUG,
        isMillisecond: boolean = true
    ): void {
        if (info) {
            this.timerFactory.endTime(info, level, isMillisecond, this);
        }
    }
}
