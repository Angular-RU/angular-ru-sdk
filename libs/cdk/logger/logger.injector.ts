import {Injectable, Injector} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

@Injectable()
export class LoggerInjector {
    private static injector: Nullable<Injector> = null;

    constructor(injector: Injector) {
        LoggerInjector.injector = injector;
    }

    public static getInjector(): never | Injector {
        if (isNil(LoggerInjector.injector)) {
            throw new Error(`You've forgotten to import \`LoggerModule\``);
        }

        return LoggerInjector.injector;
    }
}
