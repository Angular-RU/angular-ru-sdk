import {InjectionToken, ModuleWithProviders, NgModule, Self} from '@angular/core';

import {LOGGER_OPTIONS, LoggerOptions} from './interfaces/logger.external';
import {LoggerInjector} from './logger.injector';
import {LoggerOptionsImpl} from './logger.options';
import {LoggerService} from './logger.service';
import {ConsoleService} from './services/console.service';
import {CssFactory} from './services/css-factory.service';
import {LoggerFactory} from './services/factory.service';
import {GroupFactory} from './services/group-factory.service';
import {JsonFactory} from './services/json-factory.service';
import {TimerFactory} from './services/timer-factory.service';

@NgModule({
    providers: [
        ConsoleService,
        CssFactory,
        GroupFactory,
        JsonFactory,
        LoggerFactory,
        LoggerInjector,
        LoggerService,
        TimerFactory,
    ],
})
export class LoggerModule {
    private static readonly ROOT_OPTIONS: InjectionToken<string> =
        new InjectionToken<string>('ROOT_OPTIONS');

    constructor(@Self() public loggerInjector: LoggerInjector) {}

    public static forRoot(
        config: Partial<LoggerOptions> = {},
    ): ModuleWithProviders<LoggerModule> {
        return {
            ngModule: LoggerModule,
            providers: [
                {
                    provide: LoggerModule.ROOT_OPTIONS,
                    useValue: config,
                },
                {
                    provide: LOGGER_OPTIONS,
                    useFactory: LoggerModule.loggerConfigFactory,
                    deps: [LoggerModule.ROOT_OPTIONS],
                },
            ],
        };
    }

    private static loggerConfigFactory(
        config: Partial<LoggerOptions>,
    ): LoggerOptionsImpl {
        return Object.assign(new LoggerOptionsImpl(), config);
    }
}
