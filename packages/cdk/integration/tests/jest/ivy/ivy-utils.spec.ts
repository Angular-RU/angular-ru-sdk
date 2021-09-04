import { ApplicationRef, DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Any } from '@angular-ru/cdk/typings';

import { TestModule } from './helpers/test.module';
import {
    FeatureTestComponent,
    FeatureTestService,
    NonInjectable,
    TestComponent,
    TestDirective,
    TestService
} from './helpers/test-default';
import { ExtendingTestComponent, TestStairsComponent } from './helpers/test-extending';
import { TestTokenComponent, TestTokenService } from './helpers/test-token';

describe('[TEST]: Ivy utils', (): void => {
    let componentFixture: ComponentFixture<TestComponent>;
    console.error = jest.fn();

    beforeEach(function (): void {
        TestBed.configureTestingModule({ imports: [TestModule] });
        componentFixture = TestBed.createComponent(TestComponent);
    });

    afterAll(function (): void {
        (console.error as Any).mockRestore();
    });

    /** @description due to test running Angular in JIT mode,
     * it is necessary to defer the patch until the next cycle by `Promise.then`
     * so Jest requires to mark such test as async */
    it(`should work useInjector with component's fields`, async function (): Promise<void> {
        const component: TestComponent = componentFixture.componentInstance;

        expect(component.ngZone.constructor).toBe(NgZone);
        expect(component.testService.constructor).toBe(TestService);
        expect(component.testService.testField).toBe('test');
    });

    it(`should work useInjector with directive's fields`, async function (): Promise<void> {
        const directiveElement: DebugElement = componentFixture.debugElement.query(By.directive(TestDirective));
        const directive: TestDirective = directiveElement.injector.get(TestDirective);

        expect(directive.ngZone.constructor).toBe(NgZone);
        expect(directive.testService.constructor).toBe(TestService);
        expect(directive.testService.testField).toBe('test');
    });

    it(`should work useInjector with pipe's fields`, async function (): Promise<void> {
        const testService: TestService = TestBed.inject(TestService);
        componentFixture.detectChanges();
        const paragraphContent: string = componentFixture.debugElement.nativeElement.querySelector('p.pipe').innerHTML;

        expect(paragraphContent).toBe(`testValue: ${testService.testField} (besides ${NgZone.name})`);
    });

    it(`should work useInjector with service's fields`, async function (): Promise<void> {
        const service: FeatureTestService = TestBed.inject(FeatureTestService);

        expect(service.ngZone.constructor).toBe(NgZone);
        expect(service.testService.constructor).toBe(TestService);
        expect(service.testService.testField).toBe('test');
    });

    it('should work useInjector with nested and multiple usages', async function (): Promise<void> {
        const featureTestComponentFixture: ComponentFixture<FeatureTestComponent> =
            TestBed.createComponent(FeatureTestComponent);
        const component: FeatureTestComponent = featureTestComponentFixture.componentInstance;

        expect(component.ngZone.constructor).toBe(NgZone);
        expect(component.appRef.constructor).toBe(ApplicationRef);
        expect(component.featureTestService.constructor).toBe(FeatureTestService);
        expect(component.featureTestService.testService.constructor).toBe(TestService);
        expect(component.featureTestService.testService.testField).toBe('test');
        expect(component.featureTestService.callsCounter).toBe(1);
    });

    it('should work useInjector with component extending directive', async function (): Promise<void> {
        const extendingTestComponentFixture: ComponentFixture<ExtendingTestComponent> =
            TestBed.createComponent(ExtendingTestComponent);
        const component: ExtendingTestComponent = extendingTestComponentFixture.componentInstance;

        expect(component.appRef.constructor).toBe(ApplicationRef);
        expect(component.ngZone.constructor).toBe(NgZone);
        expect(component.featureTestService.constructor).toBe(FeatureTestService);
        expect(component.featureTestService.testService.constructor).toBe(TestService);
        expect(component.featureTestService.testService.testField).toBe('test');
    });

    it('should work useInjector with component 3-level extending chain', async function (): Promise<void> {
        const testStairsComponentFixture: ComponentFixture<TestStairsComponent> =
            TestBed.createComponent(TestStairsComponent);
        const component: TestStairsComponent = testStairsComponentFixture.componentInstance;

        expect(component.featureTestService.constructor).toBe(FeatureTestService);
        expect(component.featureTestService.testService.testField).toBe('test');
        expect(component.testService.constructor).toBe(TestService);
        expect(component.testService.testField).toBe('test');
        expect(component.ngZone.constructor).toBe(NgZone);

        testStairsComponentFixture.detectChanges();
        const content: string = testStairsComponentFixture.debugElement.nativeElement.innerHTML;
        expect(content).toBe(`${NgZone.name} test ${FeatureTestService.name}`);
    });

    it('should work with injection tokens', async function (): Promise<void> {
        const testTokenComponentFixture: ComponentFixture<TestTokenComponent> =
            TestBed.createComponent(TestTokenComponent);
        const component: TestTokenComponent = testTokenComponentFixture.componentInstance;
        expect(component.appRef.constructor).toBe(ApplicationRef);
        expect(component.componentToken).toBe('COMPONENT_TOKEN');
        expect(component.moduleToken).toBe('MODULE_TOKEN');
        expect(component.serviceToken).toBe('SERVICE_TOKEN');

        const testService: TestTokenService = component.testTokenService;
        expect(testService.ngZone.constructor).toBe(NgZone);
        expect(testService.componentToken).toBe('COMPONENT_TOKEN');
        expect(testService.moduleToken).toBe('MODULE_TOKEN');
        expect(testService.serviceToken).toBe('SERVICE_TOKEN');
    });

    it('should not work with non-injectable classes', async function (): Promise<void> {
        const nonInjectable: NonInjectable = new NonInjectable();
        expect(nonInjectable.ngZone).not.toBeDefined();
        expect(console.error).toHaveBeenCalledWith(new Error('Class with useInjector in decorator must be Injectable'));
    });
});
