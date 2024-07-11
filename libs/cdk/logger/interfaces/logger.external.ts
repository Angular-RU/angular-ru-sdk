import {InjectionToken} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';

import {LoggerService} from '../logger.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ConsoleOperation<T = unknown, P = unknown> = (
    message?: T,
    ...optionalParams: P[]
) => void;

export interface GroupMethods extends Function {
    group(label: string, pipeline?: Pipeline): LoggerService;

    groupCollapsed(label: string, pipeline?: Pipeline): LoggerService;
}

export const LOGGER_OPTIONS: InjectionToken<string> = new InjectionToken<string>(
    'LOGGER_OPTIONS',
);
export type TimerLevels =
    | LoggerLevel.DEBUG
    | LoggerLevel.ERROR
    | LoggerLevel.INFO
    | LoggerLevel.TRACE
    | LoggerLevel.WARN;

export type LogFn = ConsoleOperation & GroupMethods;

export interface FormatOutput {
    label: string;
    style: string;
}

/**
 * Used in factory methods
 */
// eslint-disable-next-line no-restricted-syntax
export enum LoggerLevel {
    ALL = 1,
    TRACE,
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR,
    OFF,
}

export const enum GroupLevel {
    GROUP = 'group',
    GROUP_COLLAPSED = 'groupCollapsed',
}

export type Pipeline<T = unknown> = (logger: LoggerService) => T;

export interface TimerInfo {
    title: string;
    startTime: number;
}

export type PipeOperation = ConsoleOperation | GroupMethods;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GroupMethod<T = unknown> = (
    groupTitle?: string,
    ...optionalParams: T[]
) => unknown;

export type GroupFactoryMethod = (
    title: string,
    pipeline: Nullable<Pipeline>,
    logger: LoggerService,
    level: LoggerLevel,
) => void;

export interface LoggerOptions<T = unknown> {
    instance: T extends Console ? T : unknown;
    minLevel: LoggerLevel;
    globalLineStyle: string;
    cssClassMap: Record<string, unknown>;
    useLevelGroup: boolean;
    labelColors: PlainObject;
    labelNames: PlainObject;

    format?(label: string, style: string): FormatOutput;

    options?(config: Partial<LoggerOptions>): LoggerOptions;
}
