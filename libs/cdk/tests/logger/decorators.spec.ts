import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoggerLevel, LoggerModule, LoggerService} from '@angular-ru/cdk/logger';

import {ConsoleFake, TestLoggerLineType} from './helpers/console-fake';
import {MyTestComponent} from './helpers/test.component';

describe('[TEST]: Decorator API', () => {
    let logger: LoggerService;
    const fakeConsole: ConsoleFake = new ConsoleFake();
    const logIsWork: string = 'log is worked';
    const traceIsWork: string = 'trace is worked';
    const debugIsWork: string = 'debug is worked';
    const infoIsWork: string = 'info is worked';
    const warnIsWork: string = 'warn is worked';
    const errorIsWork: string = 'error is worked';
    const groupIsWork: string = 'group is worked';
    const groupCollapsedIsWork: string = 'groupCollapsed is worked';

    let fixture: ComponentFixture<MyTestComponent>;
    let component: MyTestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LoggerModule.forRoot({instance: fakeConsole})],
            declarations: [MyTestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyTestComponent);
        component = fixture.componentInstance;
        logger = TestBed.inject(LoggerService);
        logger.clear();
    });

    it('logger decorator should correct work', () => {
        component.logger.log('Hello world');
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({[TestLoggerLineType.LOG]: ['Hello world']}),
        );
    });

    it('group decorator should correct work', () => {
        const result: string = component.print(groupIsWork);

        expect(result).toEqual(groupIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {group_open: ['Test group']},
                {log: ['group is worked']},
                {group_end: []},
            ),
        );
    });

    it('group decorator with level should correct work', () => {
        const result: string = component.printLevel(groupIsWork);

        expect(result).toEqual(groupIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {group_open: ['Test group']},
                {log: [groupIsWork]},
                {group_end: []},
            ),
        );
    });

    it('groupCollapced decorator should correct work', () => {
        const result: string = component.printCollapsed(groupCollapsedIsWork);

        expect(result).toEqual(groupCollapsedIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {group_collapsed_open: ['Test group-collapsed']},
                {log: [groupCollapsedIsWork]},
                {group_end: []},
            ),
        );
    });

    it('groupCollapsed decorator with level should correct work', () => {
        const result: string = component.printCollapsedLevel(groupCollapsedIsWork);

        expect(result).toEqual(groupCollapsedIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {group_collapsed_open: ['Test group-collapsed']},
                {log: [groupCollapsedIsWork]},
                {group_end: []},
            ),
        );
    });

    it('method decorators should correct work', () => {
        component.log(logIsWork);
        component.trace(traceIsWork);
        component.debug(debugIsWork);
        component.info(infoIsWork);
        component.error(errorIsWork);
        component.warn(warnIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {[TestLoggerLineType.LOG]: [logIsWork]},
                {[TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork]},
                {[TestLoggerLineType.DEBUG]: [debugIsWork]},
                {[TestLoggerLineType.INFO]: [infoIsWork]},
                {[TestLoggerLineType.ERROR]: [errorIsWork]},
                {[TestLoggerLineType.WARN]: [warnIsWork]},
            ),
        );
    });

    it('should be correct invoke methods', () => {
        component.init();
        expect(component.count).toBe(1);
        expect(fakeConsole.stack()).toBe('[]');
    });

    it('should be correct title methods', () => {
        const result: string = component.method('hello world');

        expect(result).toBe('hello world');

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                {group_open: ['Test group with hello world']},
                {log: [groupIsWork]},
                {group_end: []},
            ),
        );
    });

    it('timer invoke', () => {
        logger.level = LoggerLevel.ALL;
        component.ngOnInit();
        expect(fakeConsole.stack()).toContain('TimerLog: mock:ngOnInit');
    });

    it('can not execute', () => {
        logger.level = LoggerLevel.ERROR;
        component.ngOnInit();
        expect(fakeConsole.stack()).toEqual(fakeConsole.createStack());
    });

    it('query by second timer', () =>
        new Promise((done) => {
            component.longQueryBySecond(3, done);
            expect(fakeConsole.stack()).toEqual(
                fakeConsole.createStack({
                    info: ['TimerLog: longQueryBySecond', 'took 3s to execute'],
                }),
            );
        }));

    it('query by ms timer', () =>
        new Promise((done) => {
            component.longQueryBySecondMs(3, done);
            expect(fakeConsole.stack()).toContain('TimerLog: longQueryBySecondMs');
        }));

    it('should correct work with errors', () => {
        let message: string | null = null;

        try {
            component.badRequest();
        } catch (error: unknown) {
            message = (error as Error).message;
        }

        expect(message).toBe('error');
    });
});
