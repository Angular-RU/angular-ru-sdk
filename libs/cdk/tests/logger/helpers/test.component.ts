// noinspection AngularMissingOrInvalidDeclarationInModule

import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
    DebugLog,
    ErrorLog,
    Group,
    GroupCollapsed,
    InfoLog,
    Log,
    LogFn,
    Logger,
    LoggerLevel,
    LoggerService,
    TimerInfo,
    TimerLog,
    TraceLog,
    WarnLog,
} from '@angular-ru/cdk/logger';
import {Fn, Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

interface HttpDebugInterface {
    method: string;
    url: string;
    queryParams: string;
    data: unknown;
    body: unknown;
    errorData: unknown;
}

@Component({
    selector: 'lib-hello-test',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTestComponent implements OnInit {
    @Logger() public logger!: LoggerService;
    @TraceLog() public trace!: LogFn;
    @DebugLog() public debug!: LogFn;
    @InfoLog() public info!: LogFn;
    @ErrorLog() public error!: LogFn;
    @WarnLog() public warn!: LogFn;
    @Log() public log!: LogFn;

    public count: number = 0;
    public hook: Nullable<string> = null;
    public doneHeavy: boolean = false;
    public name: string = 'MockLoggerComponent';

    public static getUrlInfo({
        method,
        url,
        queryParams,
    }: Partial<HttpDebugInterface>): string {
        const params: string = isNotNil(queryParams) ? `?${queryParams}` : '';

        return `[${method}] - ${url}${params}`;
    }

    @Group('Test group')
    public print(value: string): string {
        this.logger.log(value);

        return value;
    }

    @Group('Test group', LoggerLevel.WARN)
    public printLevel(value: string): string {
        this.logger.log(value);

        return value;
    }

    @GroupCollapsed('Test group-collapsed')
    public printCollapsed(value: string): string {
        this.logger.log(value);

        return value;
    }

    @GroupCollapsed('Test group-collapsed', LoggerLevel.WARN)
    public printCollapsedLevel(value: string): string {
        this.logger.log(value);

        return value;
    }

    @Group('INCREMENT', LoggerLevel.DEBUG)
    public increment(): void {
        this.logger.debug('count', this.count);
        this.count++;
    }

    @Group((name: string): string => `Test group with ${name}`)
    public method(name: string): string {
        this.logger.log('group is worked');

        return name;
    }

    @Group((options: Partial<HttpDebugInterface>): string =>
        MyTestComponent.getUrlInfo(options),
    )
    public hello(name: string): string {
        this.logger.log('group is worked');

        return name;
    }

    @TimerLog('mock:ngOnInit')
    public ngOnInit(): void {
        this.hook = 'ngOnInit';
    }

    @TimerLog('longQueryBySecond', LoggerLevel.INFO, false)
    public longQueryBySecond(seconds: number, done: Fn): void {
        this.extracted(seconds, done);
    }

    @TimerLog('badRequest', LoggerLevel.DEBUG, false)
    public badRequest(): void {
        throw new Error('error');
    }

    public init(): void {
        this.logger.level = LoggerLevel.INFO;
        this.increment();
    }

    public longQueryBySecondMs(seconds: number, done: Fn): void {
        const info: Nullable<TimerInfo> = this.logger.startTime('longQueryBySecondMs');

        this.extracted(seconds, done);
        this.logger.endTime(info);
    }

    private extracted(seconds: number, done: Fn): void {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const date: number = Date.now() + seconds * 1000;

        while (Date.now() <= date) {
            this.doneHeavy = true;
        }

        done();
    }
}
