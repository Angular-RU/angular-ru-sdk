/* eslint-disable max-classes-per-file */
import {ApplicationRef, NgZone, PipeTransform} from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    Injectable,
    Pipe,
} from '@angular/core';

import {
    InjectFeatureTestService,
    InjectNgZone,
    InjectTestService,
} from './test-decorators';

@Injectable()
export class TestService {
    public testField = 'test';
}

@Directive({standalone: false, selector: '[test-directive]'})
export class TestDirective {
    @InjectTestService()
    public testService!: TestService;

    constructor(public ngZone: NgZone) {}
}

@Component({
    standalone: false,
    selector: 'test-component',
    template: `
        <div test-directive></div>
        <p class="service">{{ testService.testField }}</p>
        <p class="pipe">{{ 'testValue' | test }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
    @InjectTestService()
    public testService!: TestService;

    constructor(public ngZone: NgZone) {}
}

@Pipe({standalone: false, name: 'test'})
export class TestPipe implements PipeTransform {
    @InjectTestService()
    public testService!: TestService;

    constructor(public ngZone: NgZone) {}

    public transform(value: string): string {
        return `${value}: ${this.testService.testField} (besides ${this.ngZone.constructor.name})`;
    }
}

@Injectable()
export class FeatureTestService {
    @InjectTestService()
    public testService!: TestService;

    public callsCounter = 0;

    constructor(public ngZone: NgZone) {}
}

@Component({
    standalone: false,
    selector: 'feature-test-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTestComponent {
    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;

    @InjectNgZone()
    public ngZone!: NgZone;

    constructor(public appRef: ApplicationRef) {}
}

export class NonInjectable {
    @InjectNgZone()
    public ngZone!: NgZone;
}
