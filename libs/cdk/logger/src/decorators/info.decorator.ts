import { LogFn } from '../interfaces/logger.external';
import { LoggerInjector } from '../logger.injector';
import { LoggerService } from '../logger.service';

export function InfoLog(): PropertyDecorator {
    return (target: unknown, propertyName: string | symbol): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LogFn {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService).info;
            }
        });
    };
}
