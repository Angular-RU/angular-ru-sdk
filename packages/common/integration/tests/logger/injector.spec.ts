import { LoggerInjector, LoggerService } from '@angular-ru/common/logger';
import { Nullable } from '@angular-ru/common/typings';

describe('[TEST]: Check injector error', () => {
    it('should return error', (): void => {
        let message: Nullable<string> = null;

        try {
            LoggerInjector.getInjector().get<LoggerService>(LoggerService).log;
        } catch (e) {
            message = e.message;
        }

        expect(message).toEqual(`You've forgotten to import \`LoggerModule\``);
    });
});
