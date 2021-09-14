/* eslint-disable max-classes-per-file */
import { ApplicationRef, Component, Directive, Injectable, NgZone, Pipe, PipeTransform } from '@angular/core';

import { InjectFeatureTestService, InjectNgZone, InjectTestService } from './test-decorators';

@Injectable()
export class TestService {
    public testField: string = 'test';
}

@Directive({
    selector: '[test-directive]'
})
export class TestDirective {
    @InjectTestService() public testService!: TestService;

    constructor(public ngZone: NgZone) {}
}

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    selector: 'test-component',
    template: `
        <div test-directive></div>
        <p class="service">{{ testService.testField }}</p>
        <p class="pipe">{{ 'testValue' | test }}</p>
    `
})
export class TestComponent {
    @InjectTestService() public testService!: TestService;

    constructor(public ngZone: NgZone) {}
}

@Pipe({
    name: 'test',
    // eslint-disable-next-line @angular-eslint/no-pipe-impure
    pure: false
})
export class TestPipe implements PipeTransform {
    @InjectTestService() public testService!: TestService;

    constructor(public ngZone: NgZone) {}

    public transform(value: string): string {
        return `${value}: ${this.testService.testField} (besides ${this.ngZone.constructor.name})`;
    }
}

@Injectable()
export class FeatureTestService {
    @InjectTestService() public testService!: TestService;

    public callsCounter: number = 0;

    constructor(public ngZone: NgZone) {}
}

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    selector: 'feature-test-component',
    template: ''
})
export class FeatureTestComponent {
    @InjectFeatureTestService() public featureTestService!: FeatureTestService;

    @InjectNgZone() public ngZone!: NgZone;

    constructor(public appRef: ApplicationRef) {}
}

export class NonInjectable {
    @InjectNgZone() public ngZone!: NgZone;
}
