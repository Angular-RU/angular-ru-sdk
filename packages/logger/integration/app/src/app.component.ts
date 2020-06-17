/* eslint-disable */
/* tslint:disable:no-duplicate-string */
import {
    DebugLog,
    ErrorLog,
    Group,
    InfoLog,
    Log,
    LogFn,
    Logger,
    LoggerLevel,
    LoggerService,
    TimerLog,
    TraceLog,
    WarnLog
} from '@angular-ru/logger';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as devtools from 'devtools-detect';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    @Logger() public loggerInjection!: LoggerService;
    @TraceLog() public trace!: LogFn;
    @DebugLog() public debug!: LogFn;
    @InfoLog() public info!: LogFn;
    @ErrorLog() public error!: LogFn;
    @WarnLog() public warn!: LogFn;
    @Log() public log!: LogFn;

    public isLoaded: boolean = false;
    public devToolsIsOpen: boolean = devtools.isOpen;

    private readonly traceIsWork: string = 'trace is worked';
    private readonly debugIsWork: string = 'debug is worked';
    private readonly infoIsWork: string = 'info is worked';
    private readonly warnIsWork: string = 'warn is worked';
    private readonly errorIsWork: string = 'error is worked';

    constructor(private readonly logger: LoggerService) {}

    public ngOnInit(): void {
        this.isLoaded = true;
        window.addEventListener('devtoolschange', (e: devtools.DevToolsEvent) => {
            this.devToolsIsOpen = e.detail.isOpen;
        });
    }

    public showExample1(): void {
        this.logger.clear();
        this.log('log is worked');
        this.trace(this.traceIsWork, 1, { a: 1 });
        this.debug(this.debugIsWork, 2, console);
        this.info(this.infoIsWork, 3, Object);
        this.warn(this.warnIsWork, 4, String);
        this.error(this.errorIsWork, 5, (2.55).toFixed());
    }

    public showExample2(): void {
        this.logger.clear();

        this.logger.groupCollapsed('EXAMPLE 2: show stack', () => {
            this.trace(this.traceIsWork, 1, { a: 1 });
            this.debug(this.debugIsWork, 2, console);
            this.info(this.infoIsWork, 3, Object);
            this.warn(this.warnIsWork, 4, String);
            this.error(this.errorIsWork, 5, (2.55).toFixed());
        });

        this.logger.group('Show trace in opened group', ({ trace }: LoggerService): void => {
            for (let i: number = 0; i < 20; i++) {
                trace(this.traceIsWork, i);
            }
        });

        this.logger
            .groupCollapsed('Show trace in collapsed group', ({ debug }: LoggerService): void => {
                for (let i: number = 0; i < 15; i++) {
                    debug(this.traceIsWork, i);
                }
            })
            .closeAll();
    }

    public showExample3(): void {
        this.logger.clear();

        this.logger
            .groupCollapsed('GROUP TEST')
            .pipe(({ trace, debug, info, warn, error }: LoggerService) => {
                trace(this.traceIsWork);
                debug(this.debugIsWork);
                info(this.infoIsWork);
                warn(this.warnIsWork);
                error(this.errorIsWork);
            })
            .close();

        this.logger
            .group('A')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .groupCollapsed('B')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .group('C')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .closeAll();
    }

    public showExample4(): void {
        this.logger.clear();

        this.logger.level = LoggerLevel.INFO;

        this.logger.log('log is working', 1, String);
        this.trace(this.traceIsWork, 4, String);
        this.debug(this.debugIsWork, 4, String);
        this.warn(this.warnIsWork, 4, String);
        this.error(this.errorIsWork, 5, (2.55).toFixed());

        this.logger.level = LoggerLevel.ALL;
    }

    public showExample5(): void {
        this.logger.clear();

        this.logger.css('text-transform: uppercase; font-weight: bold').debug('window current ', window);

        this.logger.css('color: red; text-decoration: underline; font-weight: bold').info('It is awesome logger');
        this.debug({ a: 1 });

        this.warn('logger.css(...) does not define a global format!');
        this.info('For global configuration, use the constructor parameters');
    }

    public showExample6(): void {
        this.logger.clear();

        const jsonExample: object = {
            id: 1,
            hello: 'world'
        };

        this.debug('Classic output json', jsonExample);

        this.logger.log(...this.logger.prettyJSON(jsonExample));
    }

    public showExample7(): void {
        this.logger.clear();

        const example: string = 'test string';

        this.logger.log(example);
        this.logger.copy(example);
    }

    public showExample8(): void {
        this.logger.clear();
        this.logger.level = LoggerLevel.INFO;

        this.trace
            .group('A')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .debug.group('B')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .info.group('C')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .warn.group('D')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close()

            .error.group('E')
            .pipe(
                ({ trace }: LoggerService) => trace(this.traceIsWork),
                ({ debug }: LoggerService) => debug(this.debugIsWork),
                ({ info }: LoggerService) => info(this.infoIsWork),
                ({ warn }: LoggerService) => warn(this.warnIsWork),
                ({ error }: LoggerService) => error(this.errorIsWork)
            )
            .close();

        this.logger.level = LoggerLevel.ALL;
    }

    public showExample9(): void {
        this.logger.clear();

        this.logger.css('font-weight: normal; text-decoration: none; font-style: italic;').info(3.14);
        this.logger.css('font-weight: normal;').info(3.14);
        this.warn('global format with style!');
    }

    public showExample10(): void {
        this.logger.clear();

        this.logger.cssClass('bold line-through').log('JavaScript sucks', 'JavaScript is the best');

        this.logger
            .cssClass('code-sandbox')
            .log('\n   @Component({ .. })' + '\n   export class AppComponent { .. }    \n\n');

        this.logger.cssClass('bold line-through').debug('JavaScript sucks', 'JavaScript is the best');

        this.logger.level = LoggerLevel.INFO;
    }

    public showExample11(): void {
        this.loggerInjection.clear();
        this.logger.log(this.helloWorld('Max'));
    }

    @Group((name: string) => `Test group with ${name}`)
    public method(name: string): string {
        this.loggerInjection.log('group is worked');
        return name;
    }

    public showExample12(): void {
        this.loggerInjection.clear();
        this.method('hello world');
    }

    @TimerLog('Test timer')
    public showExample13(): void {
        this.logger.clear();
        this.log('test log');
    }

    @TimerLog('Advanced timer', LoggerLevel.WARN, false)
    public showExample14(): void {
        this.logger.clear();
        this.log('Advanced test log');
    }

    @Group('test title', LoggerLevel.WARN)
    private helloWorld(name: string): string {
        this.logger.log('log only in group', name);
        return 'hello world';
    }
}
