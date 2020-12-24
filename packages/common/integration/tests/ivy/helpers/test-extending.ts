import { ApplicationRef, Component, Directive, Injectable, NgZone } from '@angular/core';

import { InjectFeatureTestService, InjectNgZone, InjectTestService } from './test-decorators';
import { FeatureTestService, TestService } from './test-default';

@Directive({
    selector: '[test-stairs-a]'
})
export class TestStairsA {
    @InjectNgZone()
    public ngZone!: NgZone;
}

@Injectable()
export class TestStairsB extends TestStairsA {
    @InjectTestService()
    public testService!: TestService;
}

@Component({
    selector: 'test-stairs-c',
    template: '{{ ngZone.constructor.name }} {{ testService.testField }} {{ featureTestService.constructor.name }}'
})
export class TestStairsC extends TestStairsB {
    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;
}

@Directive({
    selector: '[super-test-directive]'
})
export abstract class AbstractSuperTestDirective {
    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;

    public abstract ngZone: NgZone;

    protected constructor(public appRef: ApplicationRef) {}
}

@Component({
    selector: 'extending-test-component',
    template: ''
})
export class ExtendingTestComponent extends AbstractSuperTestDirective {
    @InjectNgZone()
    public ngZone!: NgZone;

    constructor(public appRef: ApplicationRef) {
        super(appRef);
    }
}
