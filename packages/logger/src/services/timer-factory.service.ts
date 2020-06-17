import { Injectable } from '@angular/core';

import { LoggerLevel, TimerInfo } from '../interfaces/logger.external';
import { Any } from '../interfaces/logger.internal';
import { DEFAULT_METHODS } from '../logger.config';
import { LoggerService } from '../logger.service';
import { ConsoleService } from './console.service';

@Injectable()
export class TimerFactory {
    private readonly DIGITS_TO_FIX: number = 4;
    private readonly SECONDS: number = 1000;
    constructor(private readonly console: ConsoleService) {}

    public startTime(title: string, level: LoggerLevel): TimerInfo | null {
        let result: TimerInfo | null = null;
        const canExecute: boolean = !(this.console.minLevel > level);
        if (canExecute) {
            result = { startTime: performance.now(), title };
        }
        return result;
    }

    // eslint-disable-next-line max-params
    public endTime(info: TimerInfo, level: LoggerLevel, isMillisecond: boolean, logger: LoggerService): void {
        const canExecute: boolean = !(this.console.minLevel > level);

        if (canExecute) {
            const methodName: string = DEFAULT_METHODS[level];
            const time: string = this.ensureTime(info, isMillisecond);
            const logMethod: (...args: string[]) => void = (logger as Any)[methodName];
            logMethod(`TimerLog: ${info.title}`, `took ${time} to execute`);
        }
    }

    private ensureTime(info: TimerInfo, isMillisecond: boolean): string {
        const msTime: number = parseFloat((performance.now() - info.startTime).toFixed(this.DIGITS_TO_FIX));
        return isMillisecond ? `${msTime}ms` : `${Math.floor(msTime / this.SECONDS)}s`;
    }
}
