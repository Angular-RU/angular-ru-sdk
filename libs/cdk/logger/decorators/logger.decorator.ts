import {LoggerInjector} from '../logger.injector';
import {LoggerService} from '../logger.service';

export function Logger(): PropertyDecorator {
    return (target: unknown, propertyName: string | symbol): void => {
        Object.defineProperty(target, propertyName, {
            configurable: false,
            get(): LoggerService {
                return LoggerInjector.getInjector().get<LoggerService>(LoggerService);
            },
        });
    };
}
