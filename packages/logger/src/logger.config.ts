import { LoggerLevel } from './interfaces/logger.external';
import { ObjectKeyMap } from './interfaces/logger.internal';

// eslint-disable-next-line no-restricted-syntax,@typescript-eslint/naming-convention
export enum LABELS {
    TRACE = 'TRACE',
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

// eslint-disable-next-line no-restricted-syntax,@typescript-eslint/naming-convention
export enum COLORS {
    TRACE = '#000080',
    DEBUG = '#00BFFE',
    INFO = '#000000',
    WARN = '#FF6419',
    ERROR = '#F1062D'
}

export const DEFAULT_METHODS: ObjectKeyMap = {
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
    [LoggerLevel.ERROR]: 'error'
};

// tslint:disable-next-line:max-line-length
export const LexerJSON: RegExp = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
