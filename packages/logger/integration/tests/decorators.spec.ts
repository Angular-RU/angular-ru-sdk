import { Fn } from '@angular-ru/common/typings';
import { ConsoleFake, TestLoggerLineType } from './helpers/console-fake';
import { LoggerModule } from '../../src/logger.module';
import { LoggerService } from '../../src/logger.service';
import { MyTestComponent } from './helpers/test.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerLevel } from '../../src/interfaces/logger.external';

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
            imports: [LoggerModule.forRoot({ instance: fakeConsole })],
            declarations: [MyTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MyTestComponent);
        component = fixture.componentInstance;
        logger = TestBed.get(LoggerService);
        logger.clear();
    });

    it('Logger decorator should correct work', () => {
        component.logger.log('Hello world');
        expect(fakeConsole.stack()).toEqual(fakeConsole.createStack({ [TestLoggerLineType.LOG]: ['Hello world'] }));
    });

    it('Group decorator should correct work', () => {
        const result: string = component.print(groupIsWork);

        expect(result).toEqual(groupIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({ group_open: ['Test group'] }, { log: ['group is worked'] }, { group_end: [] })
        );
    });

    it('Group decorator with level should correct work', () => {
        const result: string = component.printLevel(groupIsWork);

        expect(result).toEqual(groupIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({ group_open: ['Test group'] }, { log: [groupIsWork] }, { group_end: [] })
        );
    });

    it('GroupCollapced decorator should correct work', () => {
        const result: string = component.printCollapsed(groupCollapsedIsWork);

        expect(result).toEqual(groupCollapsedIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                { group_collapsed_open: ['Test group-collapsed'] },
                { log: [groupCollapsedIsWork] },
                { group_end: [] }
            )
        );
    });

    it('GroupCollapsed decorator with level should correct work', () => {
        const result: string = component.printCollapsedLevel(groupCollapsedIsWork);

        expect(result).toEqual(groupCollapsedIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                { group_collapsed_open: ['Test group-collapsed'] },
                { log: [groupCollapsedIsWork] },
                { group_end: [] }
            )
        );
    });

    it('Method decorators should correct work', () => {
        component.log(logIsWork);
        component.trace(traceIsWork);
        component.debug(debugIsWork);
        component.info(infoIsWork);
        component.error(errorIsWork);
        component.warn(warnIsWork);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                { [TestLoggerLineType.LOG]: [logIsWork] },
                { [TestLoggerLineType.TRACE_OR_DEBUG]: [traceIsWork] },
                { [TestLoggerLineType.DEBUG]: [debugIsWork] },
                { [TestLoggerLineType.INFO]: [infoIsWork] },
                { [TestLoggerLineType.ERROR]: [errorIsWork] },
                { [TestLoggerLineType.WARN]: [warnIsWork] }
            )
        );
    });

    it('should be correct invoke methods', () => {
        component.init();
        expect(component.count).toEqual(1);
        expect(fakeConsole.stack()).toEqual('[]');
    });

    it('should be correct title methods', () => {
        const result: string = component.method('hello world');

        expect(result).toEqual('hello world');

        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack(
                { group_open: ['Test group with hello world'] },
                { log: [groupIsWork] },
                { group_end: [] }
            )
        );
    });

    it('timer invoke', () => {
        logger.level = LoggerLevel.ALL;
        component.ngOnInit();
        expect(fakeConsole.stack().includes('TimerLog: mock:ngOnInit')).toEqual(true);
    });

    it('can not execute', () => {
        logger.level = LoggerLevel.ERROR;
        component.ngOnInit();
        expect(fakeConsole.stack()).toEqual(fakeConsole.createStack());
    });

    it('query by second timer', (done: Fn) => {
        component.longQueryBySecond(3, done);
        expect(fakeConsole.stack()).toEqual(
            fakeConsole.createStack({ info: ['TimerLog: longQueryBySecond', 'took 3s to execute'] })
        );
    });

    it('query by ms timer', (done: Fn) => {
        component.longQueryBySecondMs(3, done);
        expect(fakeConsole.stack().includes('TimerLog: longQueryBySecondMs')).toEqual(true);
    });

    it('should correct work with errors', () => {
        try {
            component.badRequest();
        } catch (e) {
            expect(e.message).toEqual('error');
        }
    });
});
