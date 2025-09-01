/* eslint-disable max-classes-per-file */
import {ApplicationRef, inject, NgZone} from '@angular/core';
import {ChangeDetectionStrategy, Component, Directive, Injectable} from '@angular/core';

import {
    InjectFeatureTestService,
    InjectNgZone,
    InjectTestService,
} from './test-decorators';
import {FeatureTestService, TestService} from './test-default';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Directive({selector: '[test-stairs-a]'})
export class TestStairsADirective {
    @InjectNgZone()
    public ngZone!: NgZone;
}

@Injectable()
export class TestStairsB extends TestStairsADirective {
    @InjectTestService()
    public testService!: TestService;
}

@Component({
    selector: 'test-stairs-c',
    template:
        '{{ ngZone.constructor.name }} {{ testService.testField }} {{ featureTestService.constructor.name }}',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestStairsComponent extends TestStairsB {
    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;
}

@Directive({selector: '[super-test-directive]'})
export abstract class AbstractSuperTestDirective {
    public appRef = inject(ApplicationRef);

    public abstract ngZone: NgZone;

    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;
}

@Component({
    selector: 'extending-test-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendingTestComponent extends AbstractSuperTestDirective {
    @InjectNgZone()
    public ngZone!: NgZone;
}
