/* eslint-disable max-classes-per-file */
import {ApplicationRef, forwardRef, inject, NgZone, PipeTransform} from '@angular/core';
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

@Directive({selector: '[test-directive]'})
export class TestDirective {
    public ngZone = inject(NgZone);

    @InjectTestService()
    public testService!: TestService;
}

@Component({
    selector: 'test-component',
    imports: [TestDirective, forwardRef(() => TestPipe)],
    template: `
        <div test-directive></div>
        <p class="service">{{ testService.testField }}</p>
        <p class="pipe">{{ 'testValue' | test }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {
    public ngZone = inject(NgZone);

    @InjectTestService()
    public testService!: TestService;
}

@Pipe({name: 'test'})
export class TestPipe implements PipeTransform {
    public ngZone = inject(NgZone);

    @InjectTestService()
    public testService!: TestService;

    public transform(value: string): string {
        return `${value}: ${this.testService.testField} (besides ${this.ngZone.constructor.name})`;
    }
}

@Injectable()
export class FeatureTestService {
    public ngZone = inject(NgZone);

    @InjectTestService()
    public testService!: TestService;

    public callsCounter = 0;
}

@Component({
    selector: 'feature-test-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTestComponent {
    public appRef = inject(ApplicationRef);

    @InjectFeatureTestService()
    public featureTestService!: FeatureTestService;

    @InjectNgZone()
    public ngZone!: NgZone;
}

export class NonInjectable {
    @InjectNgZone()
    public ngZone!: NgZone;
}
