import {TestBed} from '@angular/core/testing';
import {LoggerLevel, LoggerModule, LoggerService} from '@angular-ru/cdk/logger';

import {
    ConsoleFake,
    TestLoggerGroupType,
    TestLoggerLineType,
} from './helpers/console-fake';
import {CUSTOM_COLORS, CUSTOM_LABELS} from './helpers/custom-colors';

describe('[TEST]: Check work in groups', () => {
    describe('case #1', () => {
        let logger: LoggerService;
        const fakeConsole: ConsoleFake = new ConsoleFake();

        const traceIsWork = 'trace is worked';
        const debugIsWork = 'debug is worked';
        const infoIsWork = 'info is worked';
        const warnIsWork = 'warn is worked';
        const errorIsWork = 'error is worked';

        const traceGroupIsWork = 'trace group is worked';
        const debugGroupIsWork = 'debug group is worked';
        const infoGroupIsWork = 'info group is worked';
        const warnGroupIsWork = 'warn group is worked';
        const errorGroupIsWork = 'error group is worked';

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
                            [LoggerLevel.ERROR]: CUSTOM_LABELS.ERROR,
                        },
                        labelColors: {
                            [LoggerLevel.TRACE]: CUSTOM_COLORS.TRACE,
                            [LoggerLevel.DEBUG]: CUSTOM_COLORS.DEBUG,
                            [LoggerLevel.INFO]: CUSTOM_COLORS.INFO,
                            [LoggerLevel.WARN]: CUSTOM_COLORS.WARN,
                            [LoggerLevel.ERROR]: CUSTOM_COLORS.ERROR,
                        },
                    }),
                ],
            });

            logger = TestBed.inject(LoggerService);
        });

        beforeEach(() => {
            logger.clear();
        });

        it('show classic group', () => {
            logger.group('group label', ({trace}: LoggerService): void => {
                trace(traceIsWork, 1, {a: 1});
            });

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_OPEN]: ['group label']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork, 1, {a: 1}]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('pipe group', () => {
            logger
                .group('group name')
                .pipe(({trace}: LoggerService) => trace(traceIsWork))
                .pipe(({debug}: LoggerService) => debug(debugIsWork))
                .pipe(({info}: LoggerService) => info(infoIsWork))
                .pipe(({warn}: LoggerService) => warn(warnIsWork))
                .pipe(({error}: LoggerService) => error(errorIsWork))
                .close();

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_OPEN]: ['group name']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                    {[TestLoggerLineType.INFO]: [infoIsWork]},
                    {[TestLoggerLineType.WARN]: [warnIsWork]},
                    {[TestLoggerLineType.ERROR]: [errorIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('pipe group-collapsed', () => {
            logger
                .groupCollapsed('group collapsed name')
                .pipe(({trace}: LoggerService) => trace(traceIsWork))
                .pipe(({debug}: LoggerService) => debug(debugIsWork))
                .pipe(({info}: LoggerService) => info(infoIsWork))
                .pipe(({warn}: LoggerService) => warn(warnIsWork))
                .pipe(({error}: LoggerService) => error(errorIsWork))
                .close();

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {
                        [TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: [
                            'group collapsed name',
                        ],
                    },
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                    {[TestLoggerLineType.INFO]: [infoIsWork]},
                    {[TestLoggerLineType.WARN]: [warnIsWork]},
                    {[TestLoggerLineType.ERROR]: [errorIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('pipe groups (with collapsed)', () => {
            logger
                .groupCollapsed('group A')
                .pipe(({trace}: LoggerService) => trace(traceIsWork))
                .close()
                .group('group B')
                .pipe(({trace}: LoggerService) => trace(traceIsWork))
                .close();

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: ['group A']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                    {[TestLoggerGroupType.GROUP_OPEN]: ['group B']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('great groups with group', () => {
            logger
                .group('A')
                .pipe(
                    ({trace}: LoggerService) => trace(traceIsWork),
                    ({debug}: LoggerService) => debug(debugIsWork),
                    ({info}: LoggerService) => info(infoIsWork),
                    ({warn}: LoggerService) => warn(warnIsWork),
                    ({error}: LoggerService) => error(errorIsWork),
                )
                .groupCollapsed('B')
                .pipe(
                    ({trace}: LoggerService) => trace(traceIsWork),
                    ({debug}: LoggerService) => debug(debugIsWork),
                    ({info}: LoggerService) => info(infoIsWork),
                    ({warn}: LoggerService) => warn(warnIsWork),
                    ({error}: LoggerService) => error(errorIsWork),
                )
                .group('C')
                .pipe(
                    ({trace}: LoggerService) => trace(traceIsWork),
                    ({debug}: LoggerService) => debug(debugIsWork),
                    ({info}: LoggerService) => info(infoIsWork),
                    ({warn}: LoggerService) => warn(warnIsWork),
                    ({error}: LoggerService) => error(errorIsWork),
                )
                .closeAll();

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_OPEN]: ['A']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                    {[TestLoggerLineType.INFO]: [infoIsWork]},
                    {[TestLoggerLineType.WARN]: [warnIsWork]},
                    {[TestLoggerLineType.ERROR]: [errorIsWork]},
                    {[TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: ['B']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                    {[TestLoggerLineType.INFO]: [infoIsWork]},
                    {[TestLoggerLineType.WARN]: [warnIsWork]},
                    {[TestLoggerLineType.ERROR]: [errorIsWork]},
                    {[TestLoggerGroupType.GROUP_OPEN]: ['C']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                    {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                    {[TestLoggerLineType.INFO]: [infoIsWork]},
                    {[TestLoggerLineType.WARN]: [warnIsWork]},
                    {[TestLoggerLineType.ERROR]: [errorIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                    {[TestLoggerGroupType.GROUP_END]: []},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('level pretty groups', () => {
            logger.level = LoggerLevel.ALL;

            logger.trace.group('A opened', ({trace}: LoggerService) =>
                trace(traceGroupIsWork),
            );
            logger.debug.group('B opened', ({debug}: LoggerService) =>
                debug(debugGroupIsWork),
            );
            logger.info.group('C opened', ({info}: LoggerService) =>
                info(infoGroupIsWork),
            );
            logger.warn.group('D opened', ({warn}: LoggerService) =>
                warn(warnGroupIsWork),
            );
            logger.error.group('E opened', ({error}: LoggerService) =>
                error(errorGroupIsWork),
            );

            logger.level = LoggerLevel.INFO;

            logger.trace.groupCollapsed('A collapsed', ({trace}: LoggerService) =>
                trace(traceGroupIsWork),
            );
            logger.debug.groupCollapsed('B collapsed', ({debug}: LoggerService) =>
                debug(debugGroupIsWork),
            );
            logger.info.groupCollapsed('C collapsed', ({info}: LoggerService) =>
                info(infoGroupIsWork),
            );
            logger.warn.groupCollapsed('D collapsed', ({warn}: LoggerService) =>
                warn(warnGroupIsWork),
            );
            logger.error.groupCollapsed('E collapsed', ({error}: LoggerService) =>
                error(errorGroupIsWork),
            );

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_OPEN]: ['A opened']},
                    {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['B opened']},
                    {[TestLoggerLineType.DEBUG]: [debugGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['C opened']},
                    {[TestLoggerLineType.INFO]: [infoGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['D opened']},
                    {[TestLoggerLineType.WARN]: [warnGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['E opened']},
                    {[TestLoggerLineType.ERROR]: [errorGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: ['C collapsed']},
                    {[TestLoggerLineType.INFO]: [infoGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: ['D collapsed']},
                    {[TestLoggerLineType.WARN]: [warnGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_COLLAPSED_OPEN]: ['E collapsed']},
                    {[TestLoggerLineType.ERROR]: [errorGroupIsWork]},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });

        it('level groups with pretty pipes', () => {
            logger.level = LoggerLevel.INFO;

            logger.trace
                .group('A')
                .pipe(({trace}: LoggerService) => trace('trace is worked from A'))
                .pipe(({debug}: LoggerService) => debug('debug is worked from A'))
                .pipe(({info}: LoggerService) => info('info is worked from A'))
                .pipe(({warn}: LoggerService) => warn('warn is worked from A'))
                .pipe(({error}: LoggerService) => error('error is worked from A'))
                .close()

                .debug.group('B')
                .pipe(({trace}: LoggerService) => trace('trace is worked from B'))
                .pipe(({debug}: LoggerService) => debug('debug is worked from B'))
                .pipe(({info}: LoggerService) => info('info is worked from B'))
                .pipe(({warn}: LoggerService) => warn('warn is worked from B'))
                .pipe(({error}: LoggerService) => error('error is worked from B'))
                .close()

                .info.group('C')
                .pipe(({trace}: LoggerService) => trace('trace is worked from C'))
                .pipe(({debug}: LoggerService) => debug('debug is worked from C'))
                .pipe(({info}: LoggerService) => info('info is worked from C'))
                .pipe(({warn}: LoggerService) => warn('warn is worked from C'))
                .pipe(({error}: LoggerService) => error('error is worked from C'))
                .close()

                .warn.group('D')
                .pipe(({trace}: LoggerService) => trace('trace is worked from D'))
                .pipe(({debug}: LoggerService) => debug('debug is worked from D'))
                .pipe(({info}: LoggerService) => info('info is worked from D'))
                .pipe(({warn}: LoggerService) => warn('warn is worked from D'))
                .pipe(({error}: LoggerService) => error('error is worked from D'))
                .close()

                .error.group('E')
                .pipe(({trace}: LoggerService) => trace('trace is worked from E'))
                .pipe(({debug}: LoggerService) => debug('debug is worked from E'))
                .pipe(({info}: LoggerService) => info('info is worked from E'))
                .pipe(({warn}: LoggerService) => warn('warn is worked from E'))
                .pipe(({error}: LoggerService) => error('error is worked from E'))
                .close();

            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack(
                    {[TestLoggerGroupType.GROUP_OPEN]: ['C']},
                    {[TestLoggerLineType.INFO]: ['info is worked from C']},
                    {[TestLoggerLineType.WARN]: ['warn is worked from C']},
                    {[TestLoggerLineType.ERROR]: ['error is worked from C']},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['D']},
                    {[TestLoggerLineType.INFO]: ['info is worked from D']},
                    {[TestLoggerLineType.WARN]: ['warn is worked from D']},
                    {[TestLoggerLineType.ERROR]: ['error is worked from D']},
                    {[TestLoggerGroupType.GROUP_END]: []},

                    {[TestLoggerGroupType.GROUP_OPEN]: ['E']},
                    {[TestLoggerLineType.INFO]: ['info is worked from E']},
                    {[TestLoggerLineType.WARN]: ['warn is worked from E']},
                    {[TestLoggerLineType.ERROR]: ['error is worked from E']},
                    {[TestLoggerGroupType.GROUP_END]: []},
                ),
            );
        });
    });

    describe('case #2', () => {
        const fakeConsole: ConsoleFake = new ConsoleFake();
        let logger: LoggerService;

        beforeAll(() => {
            TestBed.configureTestingModule({
                imports: [
                    LoggerModule.forRoot({
                        instance: fakeConsole,
                        useLevelGroup: false,
                    }),
                ],
            });

            logger = TestBed.inject(LoggerService);
        });

        it('should be throw logger', () => {
            let message: string | null = null;

            try {
                logger.info.group('hello world');
            } catch (error: unknown) {
                message = (error as Error).message;
            }

            expect(message).toBe('logger.info.group is not a function');
        });
    });
});
