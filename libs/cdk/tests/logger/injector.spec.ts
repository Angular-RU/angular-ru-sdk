import {LoggerInjector, LoggerService} from '@angular-ru/cdk/logger';
import {Nullable} from '@angular-ru/cdk/typings';

describe('[TEST]: Check injector error', () => {
    it('should return error', (): void => {
        let message: Nullable<string> = null;

        try {
            LoggerInjector.getInjector().get<LoggerService>(LoggerService).log();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe("You've forgotten to provide `Logger`");
    });
});
