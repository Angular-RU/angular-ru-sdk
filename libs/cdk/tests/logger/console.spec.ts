import {TestBed} from '@angular/core/testing';
import {
    ConsoleService,
    LoggerLevel,
    LoggerModule,
    LoggerService,
} from '@angular-ru/cdk/logger';

import {ConsoleFake} from './helpers/console-fake';

describe('[TEST]: ConsoleService', () => {
    describe('case #1', () => {
        let consoleInternal: ConsoleService;
        const fakeConsole: ConsoleFake = new ConsoleFake();

        beforeAll(() => {
            TestBed.configureTestingModule({
                imports: [
                    LoggerModule.forRoot({
                        instance: fakeConsole,
                    }),
                ],
            });

            consoleInternal = TestBed.inject(ConsoleService);
        });

        it(`check console instance`, () => {
            consoleInternal.console = console;
            expect(consoleInternal.console).toEqual(console);
        });
    });

    describe('case #2', () => {
        describe('[TEST]: ConsoleService without options', () => {
            let logger: LoggerService;
            let consoleService: ConsoleService;

            beforeAll(() => {
                TestBed.configureTestingModule({
                    imports: [LoggerModule.forRoot()],
                });

                logger = TestBed.inject(LoggerService);
                consoleService = TestBed.inject(ConsoleService);
            });

            it(`should be truthy logger`, () => {
                expect(logger).toBeTruthy();
            });

            it(`should be correct minLevel and instance`, () => {
                expect(consoleService.minLevel).toEqual(LoggerLevel.ALL);
                expect(consoleService.instance).toEqual(console);
            });
        });
    });
});
