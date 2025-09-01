import {inject, Injectable} from '@angular/core';

import {ConsoleOperation, LOGGER_OPTIONS} from '../interfaces/logger.external';
import {ConsoleServiceInterface} from '../interfaces/logger.internal';
import {LoggerOptionsImpl} from '../logger.options';

@Injectable()
export class ConsoleService implements ConsoleServiceInterface {
    public readonly options = inject<LoggerOptionsImpl>(LOGGER_OPTIONS);

    public instance = this.options.instance;
    public minLevel = this.options.minLevel;

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
