import { Inject, Injectable } from '@angular/core';

import { FormatOutput, GroupMethod, LOGGER_OPTIONS, LoggerLevel, Pipeline } from '../interfaces/logger.external';
import { Any } from '../interfaces/logger.internal';
import { LoggerOptionsImpl } from '../logger.options';
import { LoggerService } from '../logger.service';
import { ConsoleService } from './console.service';
import { CssFactory } from './css-factory.service';

@Injectable()
export class GroupFactory {
    public executePipesGroup: boolean = false;
    private counterOpenedGroup: number = 0;

    constructor(
        private readonly console: ConsoleService,
        private readonly cssFactory: CssFactory,
        @Inject(LOGGER_OPTIONS) public readonly options: LoggerOptionsImpl
    ) {}

    public close(): void {
        if (this.executePipesGroup) {
            this.counterOpenedGroup--;
            this.console.instance.groupEnd();
        }
    }

    public closeAll(): void {
        while (this.counterOpenedGroup > 0) {
            this.close();
        }
    }

    // eslint-disable-next-line max-params
    public group<T>(title: string, pipeline: Pipeline<T> | undefined, logger: LoggerService, level: LoggerLevel): T {
        const group: GroupMethod = this.console.instance.group.bind(this.console.instance);
        return this.createGroupLogger<T>(group, title, pipeline, logger, level);
    }

    // eslint-disable-next-line max-params
    public groupCollapsed<T = unknown>(
        title: string,
        pipeline: Pipeline<T> | undefined,
        logger: LoggerService,
        level: LoggerLevel
    ): T {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed.bind(this.console.instance);
        return this.createGroupLogger<T>(groupCollapsed, title, pipeline, logger, level);
    }

    // eslint-disable-next-line max-lines-per-function,max-params
    private createGroupLogger<T = unknown>(
        groupType: GroupMethod,
        title: string,
        pipeline: Pipeline | undefined,
        logger: LoggerService,
        level: LoggerLevel
    ): T {
        const showGroup: boolean = this.console.minLevel <= level;
        let pipeLineResult: T;

        if (showGroup) {
            this.executePipesGroup = true;
            this.counterOpenedGroup++;

            const lineStyle: string = this.cssFactory.getStyleLabel(level);
            const { label: formatLabel, style: formatStyle }: FormatOutput = this.getLabel(
                LoggerLevel[level],
                lineStyle
            );

            groupType(`%c${formatLabel}`, formatStyle, title);
            if (pipeline) {
                const result: Any = pipeline(logger);
                this.close();
                pipeLineResult = result;
            }
        } else {
            this.executePipesGroup = false;
        }

        // eslint-disable-next-line @typescript-eslint/tslint/config
        return pipeLineResult!;
    }

    private getLabel(level: string, style: string): FormatOutput {
        return this.options.format(level, style);
    }
}
