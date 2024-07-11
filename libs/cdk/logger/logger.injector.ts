import {Inject, Injectable, INJECTOR, Injector} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable()
export class LoggerInjector {
    private static injector: Nullable<Injector> = null;

    constructor(
        @Inject(INJECTOR)
        injector: Injector,
    ) {
        LoggerInjector.injector = injector;
    }

    public static getInjector(): Injector | never {
        if (isNil(LoggerInjector.injector)) {
            throw new Error("You've forgotten to import `LoggerModule`");
        }

        return LoggerInjector.injector;
    }
}
