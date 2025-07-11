import {TestBed} from '@angular/core/testing';
import {LoggerLevel, LoggerService, provideLogger} from '@angular-ru/cdk/logger';
import {PlainObject} from '@angular-ru/cdk/typings';

import {ConsoleFake, TestLoggerLineType} from './helpers/console-fake';

describe('[TEST]: Execute method by Level', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    const traceIsWork = 'trace is worked';
    const debugIsWork = 'debug is worked';
    const infoIsWork = 'info is worked';
    const warnIsWork = 'warn is worked';
    const errorIsWork = 'error is worked';
    const customLogOutput = 'custom log output';

    beforeAll(() => {
        TestBed.configureTestingModule({
            providers: [provideLogger({instance: fakeConsole})],
        });

        logger = TestBed.inject(LoggerService);
    });

    beforeEach(() => logger.clear());

    it('all data must go to the console, minimal level: TRACE', () => {
        logger.level = LoggerLevel.TRACE;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, {});
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {[TestLoggerLineType.LOG]: [customLogOutput]},
                {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork, 1, {a: 1}]},
                {[TestLoggerLineType.DEBUG]: [debugIsWork, 2, {}]},
                {[TestLoggerLineType.INFO]: [infoIsWork, 3, Object]},
                {[TestLoggerLineType.WARN]: [warnIsWork, 4, String]},
                {[TestLoggerLineType.ERROR]: [errorIsWork, 5, (2.55).toFixed(0)]},
            ),
        );
    });

    it('show console stack when minimal level: DEBUG', () => {
        logger.level = LoggerLevel.DEBUG;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, {b: 2});
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {[TestLoggerLineType.LOG]: [customLogOutput]},
                {[TestLoggerLineType.DEBUG]: [debugIsWork, 2, {b: 2}]},
                {[TestLoggerLineType.INFO]: [infoIsWork, 3, Object]},
                {[TestLoggerLineType.WARN]: [warnIsWork, 4, String]},
                {[TestLoggerLineType.ERROR]: [errorIsWork, 5, (2.55).toFixed(0)]},
            ),
        );
    });

    it('show console stack when minimal level: INFO', () => {
        logger.level = LoggerLevel.INFO;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, console);
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {[TestLoggerLineType.LOG]: [customLogOutput]},
                {[TestLoggerLineType.INFO]: [infoIsWork, 3, Object]},
                {[TestLoggerLineType.WARN]: [warnIsWork, 4, String]},
                {[TestLoggerLineType.ERROR]: [errorIsWork, 5, (2.55).toFixed(0)]},
            ),
        );
    });

    it('show console stack when minimal level: WARNING', () => {
        logger.level = LoggerLevel.WARN;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, console);
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {[TestLoggerLineType.WARN]: [warnIsWork, 4, String]},
                {[TestLoggerLineType.ERROR]: [errorIsWork, 5, (2.55).toFixed(0)]},
            ),
        );
    });

    it('show console stack when minimal level: ERROR', () => {
        logger.level = LoggerLevel.ERROR;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, console);
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.ERROR]: ['error is worked', 5, (2.55).toFixed(0)],
            }),
        );
    });

    it('not showing data in console, level: OFF', () => {
        logger.level = LoggerLevel.OFF;

        logger.log(customLogOutput);
        logger.trace(traceIsWork, 1, {a: 1});
        logger.debug(debugIsWork, 2, console);
        logger.info(infoIsWork, 3, Object);
        logger.warn(warnIsWork, 4, String);
        logger.error(errorIsWork, 5, (2.55).toFixed(0));

        expect(fakeConsole.stack()).toEqual(fakeConsole.createStack());
    });

    it('clear console stack is worked', () => {
        logger.level = LoggerLevel.ALL;

        expect(fakeConsole.stack()).toEqual(fakeConsole.createStack());
    });

    it('set minimal level: INFO', () => {
        logger.level = LoggerLevel.INFO;

        expect(logger.level).toEqual(LoggerLevel.INFO);
    });

    it('assert: 5 is not grater than 6', () => {
        logger.assert(5 > 6, '5 is not grater than 6');

        expect(fakeConsole.stack(0)).toEqual(
            fakeConsole.createStack({
                [TestLoggerLineType.ASSERT]: ['5 is not grater than 6'],
            }),
        );
    });

    it('assert: 10 is grater than 6', () => {
        logger.assert(10 > 6, '10 is not grater than 6');

        expect(fakeConsole.stack(0)).toEqual(fakeConsole.createStack());
    });

    it('table', () => {
        const data: PlainObject = [
            {name: 'Yusuf', age: 26},
            {age: 34, name: 'Chen'},
        ];

        logger.table(data);

        expect(fakeConsole.stack(0)).toEqual(
            fakeConsole.createStack({[TestLoggerLineType.TABLE]: [data]}),
        );
    });

    it('should be equals reference context (this)', () => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const {pipe}: LoggerService = logger;

        expect(pipe() === logger).toBeTruthy();
    });
});
