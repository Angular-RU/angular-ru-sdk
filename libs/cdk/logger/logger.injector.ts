import {inject, Injectable, Injector} from '@angular/core';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable()
export class LoggerInjector {
    private static injector: Injector | null = null;

    constructor() {
        LoggerInjector.injector = inject(Injector, {optional: true});
    }

    public static getInjector(): Injector | never {
        if (isNil(LoggerInjector.injector)) {
            throw new Error("You've forgotten to provide `Logger`");
        }

        return LoggerInjector.injector;
    }
}
