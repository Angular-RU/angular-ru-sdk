/* eslint-disable max-classes-per-file */
import { ApplicationRef, Component, Directive, Injectable, NgZone } from '@angular/core';

import { InjectFeatureTestService, InjectNgZone, InjectTestService } from './test-decorators';
import { FeatureTestService, TestService } from './test-default';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Directive({
    selector: '[test-stairs-a]'
})
export class TestStairsADirective {
    @InjectNgZone() public ngZone!: NgZone;
}

@Injectable()
export class TestStairsB extends TestStairsADirective {
    @InjectTestService() public testService!: TestService;
}

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    selector: 'test-stairs-c',
    template: '{{ ngZone.constructor.name }} {{ testService.testField }} {{ featureTestService.constructor.name }}'
})
export class TestStairsComponent extends TestStairsB {
    @InjectFeatureTestService() public featureTestService!: FeatureTestService;
}

@Directive({
    selector: '[super-test-directive]'
})
export abstract class AbstractSuperTestDirective {
    public abstract ngZone: NgZone;

    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;

    protected constructor(public appRef: ApplicationRef) {}
}

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
    selector: 'extending-test-component',
    template: ''
})
export class ExtendingTestComponent extends AbstractSuperTestDirective {
    @InjectNgZone() public ngZone!: NgZone;

    constructor(public appRef: ApplicationRef) {
        super(appRef);
    }
}
