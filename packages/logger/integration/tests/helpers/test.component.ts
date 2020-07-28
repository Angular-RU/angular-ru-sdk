import { Fn } from '@angular-ru/common/typings';
import { Component, OnInit } from '@angular/core';

import { DebugLog } from '../../../src/decorators/debug.decorator';
import { ErrorLog } from '../../../src/decorators/error.decorator';
import { GroupCollapsed } from '../../../src/decorators/groups/group-collapsed.decorator';
import { Group } from '../../../src/decorators/groups/group.decorator';
import { InfoLog } from '../../../src/decorators/info.decorator';
import { Log } from '../../../src/decorators/log.decorator';
import { Logger } from '../../../src/decorators/logger.decorator';
import { TimerLog } from '../../../src/decorators/timer.decorator';
import { TraceLog } from '../../../src/decorators/trace.decorator';
import { WarnLog } from '../../../src/decorators/warn.decorator';
import { LogFn, LoggerLevel, TimerInfo } from '../../../src/interfaces/logger.external';
import { LoggerService } from '../../../src/logger.service';

interface HttpDebugInterface {
    method: string;
    url: string;
    queryParams: string;
    data: unknown;
    body: unknown;
    errorData: unknown;
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({ selector: 'lib-hello-test', template: '' })
export class MyTestComponent implements OnInit {
    @Logger() public logger!: LoggerService;
    @TraceLog() public trace!: LogFn;
    @DebugLog() public debug!: LogFn;
    @InfoLog() public info!: LogFn;
    @ErrorLog() public error!: LogFn;
    @WarnLog() public warn!: LogFn;
    @Log() public log!: LogFn;

    public count: number = 0;
    public hook: string | null = null;
    public doneHeavy: boolean = false;
    public name: string = 'MockLoggerComponent';

    public static getUrlInfo({ method, url, queryParams }: Partial<HttpDebugInterface>): string {
        const params: string = queryParams ? `?${queryParams}` : '';
        return `[${method}] - ${url}${params}`;
    }

    @Group('Test group')
    public print(val: string): string {
        this.logger.log(val);
        return val;
    }

    @Group('Test group', LoggerLevel.WARN)
    public printLevel(val: string): string {
        this.logger.log(val);
        return val;
    }

    @GroupCollapsed('Test group-collapsed')
    public printCollapsed(val: string): string {
        this.logger.log(val);
        return val;
    }

    @GroupCollapsed('Test group-collapsed', LoggerLevel.WARN)
    public printCollapsedLevel(val: string): string {
        this.logger.log(val);
        return val;
    }

    public init(): void {
        this.logger.level = LoggerLevel.INFO;
        this.increment();
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

    @Group((options: Partial<HttpDebugInterface>): string => MyTestComponent.getUrlInfo(options))
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

    public longQueryBySecondMs(seconds: number, done: Fn): void {
        const info: TimerInfo | null = this.logger.startTime('longQueryBySecondMs');
        this.extracted(seconds, done);
        this.logger.endTime(info);
    }

    @TimerLog('badRequest', LoggerLevel.DEBUG, false)
    public badRequest(): void {
        throw new Error('error');
    }

    private extracted(seconds: number, done: Fn): void {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const e: number = new Date().getTime() + seconds * 1000;
        while (new Date().getTime() <= e) {
            this.doneHeavy = true;
        }
        done();
    }
}
