import {inject, Injectable} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {
    FormatOutput,
    GroupMethod,
    LOGGER_OPTIONS,
    LoggerLevel,
    Pipeline,
} from '../interfaces/logger.external';
import {LoggerOptionsImpl} from '../logger.options';
import {LoggerService} from '../logger.service';
import {ConsoleService} from './console.service';
import {CssFactory} from './css-factory.service';

@Injectable()
export class GroupFactory {
    private readonly console = inject<ConsoleService>(ConsoleService);
    private readonly cssFactory = inject<CssFactory>(CssFactory);
    public readonly options = inject<LoggerOptionsImpl>(LOGGER_OPTIONS);

    private counterOpenedGroup = 0;
    public executePipesGroup = false;

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

    public group<T>(
        title: string,
        pipeline: Nullable<Pipeline<T>>,
        logger: LoggerService,
        level: LoggerLevel,
    ): T {
        const group: GroupMethod = this.console.instance.group.bind(
            this.console.instance,
        );

        return this.createGroupLogger<T>(group, title, pipeline, logger, level);
    }

    public groupCollapsed<T = unknown>(
        title: string,
        pipeline: Nullable<Pipeline<T>>,
        logger: LoggerService,
        level: LoggerLevel,
    ): T {
        const groupCollapsed: GroupMethod = this.console.instance.groupCollapsed.bind(
            this.console.instance,
        );

        return this.createGroupLogger<T>(groupCollapsed, title, pipeline, logger, level);
    }

    private createGroupLogger<T = unknown>(
        groupType: GroupMethod,
        title: string,
        pipeline: Nullable<Pipeline>,
        logger: LoggerService,
        level: LoggerLevel,
    ): T {
        const showGroup: boolean = this.console.minLevel <= level;
        let pipeLineResult: T;

        if (showGroup) {
            this.executePipesGroup = true;
            this.counterOpenedGroup++;

            const lineStyle: string = this.cssFactory.getStyleLabel(level);
            const {label: formatLabel, style: formatStyle}: FormatOutput = this.getLabel(
                LoggerLevel[level],
                lineStyle,
            );

            groupType(`%c${formatLabel}`, formatStyle, title);

            if (isNotNil(pipeline)) {
                const result: any = pipeline(logger);

                this.close();
                pipeLineResult = result;
            }
        } else {
            this.executePipesGroup = false;
        }

        return pipeLineResult!;
    }

    private getLabel(level: Nullable<string>, style: string): FormatOutput {
        return this.options.format(level, style);
    }
}
