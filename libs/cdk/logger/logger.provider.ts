import {inject, makeEnvironmentProviders, provideAppInitializer} from '@angular/core';

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

export function provideLogger(config: Partial<LoggerOptions> = {}) {
    return makeEnvironmentProviders([
        ConsoleService,
        CssFactory,
        GroupFactory,
        JsonFactory,
        LoggerFactory,
        LoggerInjector,
        LoggerService,
        TimerFactory,
        {
            provide: LOGGER_OPTIONS,
            useFactory: () => loggerConfigFactory(config),
        },
        provideAppInitializer(() => {
            inject(LoggerInjector);
        }),
    ]);
}

function loggerConfigFactory(config: Partial<LoggerOptions>): LoggerOptionsImpl {
    return Object.assign(new LoggerOptionsImpl(), config);
}
