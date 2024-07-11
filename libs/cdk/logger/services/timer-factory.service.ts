import {Inject, Injectable} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

import {LoggerLevel, TimerInfo} from '../interfaces/logger.external';
import {DEFAULT_METHODS} from '../logger.config';
import {LoggerService} from '../logger.service';
import {ConsoleService} from './console.service';

@Injectable()
export class TimerFactory {
    private readonly DIGITS_TO_FIX: number = 4;
    private readonly SECONDS: number = 1000;

    constructor(
        @Inject(ConsoleService)
        private readonly console: ConsoleService,
    ) {}

    public startTime(title: string, level: LoggerLevel): Nullable<TimerInfo> {
        let result: Nullable<TimerInfo> = null;
        // eslint-disable-next-line sonarjs/no-inverted-boolean-check
        const canExecute = !(this.console.minLevel > level);

        if (canExecute) {
            result = {startTime: performance.now(), title};
        }

        return result;
    }

    public endTime(
        info: TimerInfo,
        level: LoggerLevel,
        isMillisecond: boolean,
        logger: LoggerService,
    ): void {
        // eslint-disable-next-line sonarjs/no-inverted-boolean-check
        const canExecute = !(this.console.minLevel > level);

        if (canExecute) {
            const methodName: string = DEFAULT_METHODS[level];
            const time: string = this.ensureTime(info, isMillisecond);
            const logMethod: (...args: string[]) => void = (logger as any)[methodName];

            logMethod(`TimerLog: ${info.title}`, `took ${time} to execute`);
        }
    }

    private ensureTime(info: TimerInfo, isMillisecond: boolean): string {
        const msTime: number = parseFloat(
            (performance.now() - info.startTime).toFixed(this.DIGITS_TO_FIX),
        );

        return isMillisecond ? `${msTime}ms` : `${Math.floor(msTime / this.SECONDS)}s`;
    }
}
