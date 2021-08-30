import { ConsoleFake } from './helpers/console-fake';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '@angular-ru/common/logger';
import { ConsoleService } from '@angular-ru/common/logger';
import { LoggerService } from '@angular-ru/common/logger';
import { LoggerLevel } from '@angular-ru/common/logger';

describe('[TEST]: ConsoleService', () => {
    let consoleInternal: ConsoleService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole
                })
            ]
        });

        consoleInternal = TestBed.get(ConsoleService);
    });

    it(`check console instance`, () => {
        consoleInternal.console = console;
        expect(consoleInternal.console).toEqual(console);
    });
});

describe('[TEST]: ConsoleService without options', () => {
    let logger: LoggerService;
    let consoleService: ConsoleService;

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [LoggerModule.forRoot()]
        });

        logger = TestBed.get(LoggerService);
        consoleService = TestBed.get(ConsoleService);
    });

    it(`should be truthy logger`, () => {
        expect(logger).toBeTruthy();
    });

    it(`should be correct minLevel and instance`, () => {
        expect(consoleService.minLevel).toEqual(LoggerLevel.ALL);
        expect(consoleService.instance).toEqual(console);
    });
});
