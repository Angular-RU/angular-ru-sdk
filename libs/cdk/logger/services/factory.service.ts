import {Inject, Injectable} from '@angular/core';
import {Arguments, PlainObject} from '@angular-ru/cdk/typings';

import {
    ConsoleOperation as Operation,
    GroupFactoryMethod,
    GroupLevel,
    LOGGER_OPTIONS,
    LoggerLevel,
    Pipeline,
    PipeOperation,
} from '../interfaces/logger.external';
import {DEFAULT_METHODS} from '../logger.config';
import {LoggerOptionsImpl} from '../logger.options';
import {LoggerService} from '../logger.service';
import {ConsoleService} from './console.service';
import {CssFactory} from './css-factory.service';
import {GroupFactory} from './group-factory.service';

@Injectable()
export class LoggerFactory {
    // eslint-disable-next-line max-params
    constructor(
        @Inject(LOGGER_OPTIONS) private readonly options: LoggerOptionsImpl,
        @Inject(ConsoleService)
        private readonly console: ConsoleService,
        @Inject(CssFactory)
        private readonly cssFactory: CssFactory,
        @Inject(GroupFactory)
        private readonly groupFactory: GroupFactory,
    ) {}

    public createLogger<T>(level: LoggerLevel, logger: LoggerService): T {
        const args: Arguments = this.getArgumentsByType(level);
        const methodName: string = DEFAULT_METHODS[level];

        const operation: Operation =
            this.console.minLevel <= level
                ? (this.console.instance as any)[methodName].bind(...args)
                : this.console.noop;

        const pipeOperation: PipeOperation = this.options.useLevelGroup
            ? this.defineLevelGroups(level, operation, logger)
            : operation;

        return pipeOperation as unknown as T;
    }

    private defineLevelGroups(
        level: LoggerLevel,
        operation: Operation,
        logger: LoggerService,
    ): Operation {
        Object.defineProperties(operation, {
            [GroupLevel.GROUP]: this.setGroupMethod(GroupLevel.GROUP, level, logger),
            [GroupLevel.GROUP_COLLAPSED]: this.setGroupMethod(
                GroupLevel.GROUP_COLLAPSED,
                level,
                logger,
            ),
        });

        return operation;
    }

    private setGroupMethod(
        methodName: GroupLevel,
        level: LoggerLevel,
        logger: LoggerService,
    ): PropertyDescriptor {
        return {
            enumerable: true,
            configurable: true,
            value: (label: string, pipeLine?: Pipeline): LoggerService => {
                const groupMethod: GroupFactoryMethod = this.groupFactory[
                    methodName
                ].bind(this.groupFactory);

                groupMethod(label, pipeLine, logger, level);

                return logger;
            },
        };
    }

    // eslint-disable-next-line max-lines-per-function
    private getArgumentsByType(level: LoggerLevel): Arguments {
        const styleLabel: string = this.cssFactory.getStyleLabel(level);
        const lineStyle: string = this.cssFactory.style;
        const args: Arguments = [this.console.instance];
        const withLabel: boolean = level !== LoggerLevel.LOG;

        if (withLabel) {
            const {label: formatLabel, style}: PlainObject = this.options.format(
                this.options.labelNames[level],
                styleLabel,
            );

            if (lineStyle) {
                const label: string = this.console.getFormatTemplateLabel(formatLabel);

                args.push(label, style, lineStyle);
            } else {
                const label: string = this.console.getTemplateLabel(formatLabel);

                args.push(label, style);
            }
        } else if (lineStyle) {
            args.push(this.console.getTemplateWithoutLabel(), lineStyle);
        }

        return args;
    }
}
