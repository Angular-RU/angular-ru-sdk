import { LoggerInjector } from '../../src/logger.injector';
import { LoggerService } from '../../src/logger.service';

describe('[TEST]: Check injector error', () => {
    it('should return error', (): void => {
        let message: string | null = null;

        try {
            LoggerInjector.getInjector().get<LoggerService>(LoggerService).log;
        } catch (e) {
            message = e.message;
        }

        expect(message).toEqual(`You've forgotten to import \`LoggerModule\``);
    });
});
