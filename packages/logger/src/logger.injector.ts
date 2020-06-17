import { Injectable, Injector } from '@angular/core';

@Injectable()
export class LoggerInjector {
    private static injector: Injector | null = null;

    constructor(injector: Injector) {
        LoggerInjector.injector = injector;
    }

    public static getInjector(): never | Injector {
        if (!LoggerInjector.injector) {
            throw new Error(`You've forgotten to import \`LoggerModule\``);
        }

        return LoggerInjector.injector;
    }
}
