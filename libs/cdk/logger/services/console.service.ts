import {Inject, Injectable} from '@angular/core';

import {
    ConsoleOperation,
    LOGGER_OPTIONS,
    LoggerLevel,
} from '../interfaces/logger.external';
import {ConsoleServiceInterface} from '../interfaces/logger.internal';
import {LoggerOptionsImpl} from '../logger.options';

@Injectable()
export class ConsoleService implements ConsoleServiceInterface {
    public instance: Console;
    public minLevel: LoggerLevel;

    constructor(@Inject(LOGGER_OPTIONS) public readonly options: LoggerOptionsImpl) {
        this.minLevel = options.minLevel;
        this.instance = options.instance;
    }

    public get noop(): ConsoleOperation {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return ((): void => {}) as ConsoleOperation;
    }

    public get console(): Console {
        return this.instance;
    }

    public set console(instance: Console) {
        this.instance = instance;
    }

    public getTemplateLabel(text: string): string {
        return `%c${text}`;
    }

    public getFormatTemplateLabel(text: string): string {
        return `%c${text} %c%s`;
    }

    public getTemplateWithoutLabel(): string {
        return '%c%s';
    }
}
