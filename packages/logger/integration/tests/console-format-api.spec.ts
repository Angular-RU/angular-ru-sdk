import { PlainObject } from '@angular-ru/common/typings';
import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../../src/logger.module';
import { LoggerService } from '../../src/logger.service';
import { ConsoleFake } from './helpers/console-fake';
import { CUSTOM_COLORS, CUSTOM_LABELS } from './helpers/custom-colors';
import { FormatOutput, LoggerLevel } from '../../src/interfaces/logger.external';

describe('[TEST]: Check global style', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();

    const traceIsWork: string = 'trace is worked';
    const debugIsWork: string = 'debug is worked';
    const infoIsWork: string = 'info is worked';
    const warnIsWork: string = 'warn is worked';
    const errorIsWork: string = 'error is worked';

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                LoggerModule.forRoot({
                    instance: fakeConsole,
                    labelNames: {
                        [LoggerLevel.TRACE]: CUSTOM_LABELS.TRACE,
                        [LoggerLevel.DEBUG]: CUSTOM_LABELS.DEBUG,
                        [LoggerLevel.INFO]: CUSTOM_LABELS.INFO,
                        [LoggerLevel.WARN]: CUSTOM_LABELS.WARN,
                        [LoggerLevel.ERROR]: CUSTOM_LABELS.ERROR
                    },
                    labelColors: {
                        [LoggerLevel.TRACE]: CUSTOM_COLORS.TRACE,
                        [LoggerLevel.DEBUG]: CUSTOM_COLORS.DEBUG,
                        [LoggerLevel.INFO]: CUSTOM_COLORS.INFO,
                        [LoggerLevel.WARN]: CUSTOM_COLORS.WARN,
                        [LoggerLevel.ERROR]: CUSTOM_COLORS.ERROR
                    },
                    format(label: string, labelStyle: string): FormatOutput {
                        const customLabel: string = `${label}`;
                        return { label: customLabel, style: labelStyle };
                    }
                })
            ]
        });

        logger = TestBed.get(LoggerService);
    });

    beforeEach(() => {
        logger.clear();
    });

    it(`Set new text for labels: [trace, debug, info, warn, error]`, () => {
        logger.level = LoggerLevel.ALL;

        const traceLine: number = 0;
        logger.trace(traceIsWork, 1, { a: 1 });

        const debugLine: number = 1;
        logger.debug(debugIsWork, 2, {});

        const infoLine: number = 2;
        logger.info(infoIsWork, 3, Object);

        const warnLine: number = 3;
        logger.warn(warnIsWork, 4, String);

        const errorLine: number = 4;
        logger.error(errorIsWork, 5, (2.55).toFixed());

        const stackOptionsList: PlainObject = fakeConsole.stackOptionsList();

        const { label: traceLabel }: PlainObject = stackOptionsList[traceLine];
        const { label: debugLabel }: PlainObject = stackOptionsList[debugLine];
        const { label: infoLabel }: PlainObject = stackOptionsList[infoLine];
        const { label: warnLabel }: PlainObject = stackOptionsList[warnLine];
        const { label: errorLabel }: PlainObject = stackOptionsList[errorLine];

        expect(traceLabel).toEqual(CUSTOM_LABELS.TRACE);
        expect(debugLabel).toEqual(CUSTOM_LABELS.DEBUG);
        expect(infoLabel).toEqual(CUSTOM_LABELS.INFO);
        expect(warnLabel).toEqual(CUSTOM_LABELS.WARN);
        expect(errorLabel).toEqual(CUSTOM_LABELS.ERROR);
    });

    it(`Detect custom colors for labels`, () => {
        logger.level = LoggerLevel.ALL;

        const traceLine: number = 0;
        logger.trace(traceIsWork, 1, { a: 1 });

        const debugLine: number = 1;
        logger.debug(debugIsWork, 2, {});

        const infoLine: number = 2;
        logger.info(infoIsWork, 3, Object);

        const warnLine: number = 3;
        logger.warn(warnIsWork, 4, String);

        const errorLine: number = 4;
        logger.error(errorIsWork, 5, (2.55).toFixed());

        const stackOptionsList: PlainObject = fakeConsole.stackOptionsList();

        const { styles: traceStyle }: PlainObject = stackOptionsList[traceLine];
        const { styles: debugStyle }: PlainObject = stackOptionsList[debugLine];
        const { styles: infoStyle }: PlainObject = stackOptionsList[infoLine];
        const { styles: warnStyle }: PlainObject = stackOptionsList[warnLine];
        const { styles: errorStyle }: PlainObject = stackOptionsList[errorLine];

        expect(traceStyle.color).toEqual(CUSTOM_COLORS.TRACE);
        expect(debugStyle.color).toEqual(CUSTOM_COLORS.DEBUG);
        expect(infoStyle.color).toEqual(CUSTOM_COLORS.INFO);
        expect(warnStyle.color).toEqual(CUSTOM_COLORS.WARN);
        expect(errorStyle.color).toEqual(CUSTOM_COLORS.ERROR);
    });

    it(`Clear custom labels: `, () => {
        logger.setLabels({
            [LoggerLevel.TRACE]: CUSTOM_LABELS.TRACE,
            [LoggerLevel.DEBUG]: CUSTOM_LABELS.DEBUG,
            [LoggerLevel.INFO]: CUSTOM_LABELS.INFO,
            [LoggerLevel.WARN]: CUSTOM_LABELS.WARN,
            [LoggerLevel.ERROR]: CUSTOM_LABELS.ERROR
        });

        const traceLine: number = 0;
        logger.trace(traceIsWork, 1, { a: 1 });

        const debugLine: number = 1;
        logger.debug(debugIsWork, 2, {});

        const infoLine: number = 2;
        logger.info(infoIsWork, 3, Object);

        const warnLine: number = 3;
        logger.warn(warnIsWork, 4, String);

        const errorLine: number = 4;
        logger.error(errorIsWork, 5, (2.55).toFixed());

        const stackOptionsList: PlainObject = fakeConsole.stackOptionsList();

        const { label: traceLabel }: PlainObject = stackOptionsList[traceLine];
        const { label: debugLabel }: PlainObject = stackOptionsList[debugLine];
        const { label: infoLabel }: PlainObject = stackOptionsList[infoLine];
        const { label: warnLabel }: PlainObject = stackOptionsList[warnLine];
        const { label: errorLabel }: PlainObject = stackOptionsList[errorLine];

        expect(traceLabel).toEqual(CUSTOM_LABELS.TRACE);
        expect(debugLabel).toEqual(CUSTOM_LABELS.DEBUG);
        expect(infoLabel).toEqual(CUSTOM_LABELS.INFO);
        expect(warnLabel).toEqual(CUSTOM_LABELS.WARN);
        expect(errorLabel).toEqual(CUSTOM_LABELS.ERROR);
    });

    it(`Set new colors for labels`, () => {
        logger.level = LoggerLevel.ALL;
        logger.clear();

        logger.setColors({
            [LoggerLevel.TRACE]: CUSTOM_COLORS.TRACE,
            [LoggerLevel.DEBUG]: CUSTOM_COLORS.DEBUG,
            [LoggerLevel.INFO]: CUSTOM_COLORS.INFO,
            [LoggerLevel.WARN]: CUSTOM_COLORS.WARN,
            [LoggerLevel.ERROR]: CUSTOM_COLORS.ERROR
        });

        const traceLine: number = 0;
        logger.trace(traceIsWork, 1, { a: 1 });

        const debugLine: number = 1;
        logger.debug(debugIsWork, 2, {});

        const infoLine: number = 2;
        logger.info(infoIsWork, 3, Object);

        const warnLine: number = 3;
        logger.warn(warnIsWork, 4, String);

        const errorLine: number = 4;
        logger.error(errorIsWork, 5, (2.55).toFixed());

        const stackOptionsList: PlainObject = fakeConsole.stackOptionsList();

        const { styles: traceStyle }: PlainObject = stackOptionsList[traceLine];
        const { styles: debugStyle }: PlainObject = stackOptionsList[debugLine];
        const { styles: infoStyle }: PlainObject = stackOptionsList[infoLine];
        const { styles: warnStyle }: PlainObject = stackOptionsList[warnLine];
        const { styles: errorStyle }: PlainObject = stackOptionsList[errorLine];

        expect(traceStyle.color).toEqual(CUSTOM_COLORS.TRACE);
        expect(debugStyle.color).toEqual(CUSTOM_COLORS.DEBUG);
        expect(infoStyle.color).toEqual(CUSTOM_COLORS.INFO);
        expect(warnStyle.color).toEqual(CUSTOM_COLORS.WARN);
        expect(errorStyle.color).toEqual(CUSTOM_COLORS.ERROR);
    });
});
