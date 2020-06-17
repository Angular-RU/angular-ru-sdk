import { InjectionToken } from '@angular/core';

import { LoggerService } from '../logger.service';
import { ObjectKeyMap } from './logger.internal';

export type ConsoleOperation<T = unknown, P = unknown> = (message?: T, ...optionalParams: P[]) => void;

export interface GroupMethods extends Function {
    group(label: string, pipeline?: Pipeline): LoggerService;

    groupCollapsed(label: string, pipeline?: Pipeline): LoggerService;
}

export const LOGGER_OPTIONS: InjectionToken<string> = new InjectionToken<string>('LOGGER_OPTIONS');
export type TimerLevels =
    | LoggerLevel.TRACE
    | LoggerLevel.DEBUG
    | LoggerLevel.INFO
    | LoggerLevel.WARN
    | LoggerLevel.ERROR;
export type LogFn = GroupMethods & ConsoleOperation;

export interface FormatOutput {
    label: string;
    style: string;
}

// eslint-disable-next-line no-restricted-syntax
export enum LoggerLevel {
    ALL = 1,
    TRACE,
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR,
    OFF
}

// eslint-disable-next-line no-restricted-syntax
export enum GroupLevel {
    GROUP = 'group',
    GROUP_COLLAPSED = 'groupCollapsed'
}

export type Pipeline<T = unknown> = (logger: LoggerService) => T;

export interface TimerInfo {
    title: string;
    startTime: number;
}

export type PipeOperation = GroupMethods | ConsoleOperation;
export type GroupMethod<T = unknown> = (groupTitle?: string, ...optionalParams: T[]) => unknown;
export type GroupFactoryMethod = (
    title: string,
    pipeline: Pipeline | undefined,
    logger: LoggerService,
    level: LoggerLevel
) => void;

export interface LoggerOptions<T = unknown> {
    instance: T extends Console ? T : unknown;
    minLevel: LoggerLevel;
    globalLineStyle: string;
    cssClassMap: object;
    useLevelGroup: boolean;
    labelColors: ObjectKeyMap;
    labelNames: ObjectKeyMap;

    format?(label: string, style: string): FormatOutput;

    options?(config: Partial<LoggerOptions>): LoggerOptions;
}
