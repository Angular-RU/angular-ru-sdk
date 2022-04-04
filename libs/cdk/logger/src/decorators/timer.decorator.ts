import { Fn, Nullable } from '@angular-ru/cdk/typings';

import { LoggerLevel, TimerInfo, TimerLevels } from '../interfaces/logger.external';
import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';

// eslint-disable-next-line max-lines-per-function
export function TimerLog(
    title: string,
    level: TimerLevels = LoggerLevel.DEBUG,
    isMillisecond: boolean = true
): MethodDecorator {
    return function (
        _target: unknown,
        _key: string | symbol,
        descriptor: TypedPropertyDescriptor<any>
    ): TypedPropertyDescriptor<any> {
        let result: PropertyDescriptor;
        const method: Fn = descriptor.value;

        descriptor.value = function (...args: any[]): PropertyDescriptor {
            const info: Nullable<TimerInfo> = LoggerInjector.getInjector()
                .get<LoggerService>(LoggerService)
                .startTime(title, level);

            result = method.apply(this, args) as PropertyDescriptor;

            LoggerInjector.getInjector().get<LoggerService>(LoggerService).endTime(info, level, isMillisecond);

            return result;
        };

        return descriptor;
    };
}
