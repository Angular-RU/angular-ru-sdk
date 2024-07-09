import {PlainObject} from '@angular-ru/cdk/typings';

import {LoggerLevel} from './interfaces/logger.external';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const enum LABELS {
    TRACE = 'TRACE',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const enum COLORS {
    TRACE = '#000080',
    DEBUG = '#00BFFE',
    INFO = '#000000',
    WARN = '#FF6419',
    ERROR = '#F1062D',
}

export const DEFAULT_METHODS: PlainObject = {
    /**
     * Used `debug` instead `trace` method because need
     * output without stack trace in console
     * LoggerLevel.TRACE -> console.debug
     */
    [LoggerLevel.TRACE]: 'debug',
    [LoggerLevel.LOG]: 'log',
    [LoggerLevel.DEBUG]: 'info',
    [LoggerLevel.INFO]: 'info',
    [LoggerLevel.WARN]: 'warn',
    [LoggerLevel.ERROR]: 'error',
};

export const LEXER_JSON: RegExp =
    /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+\-]?\d+)?)/g;
