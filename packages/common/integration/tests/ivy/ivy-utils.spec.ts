import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './helpers/test.component';
import { TestModule } from './helpers/test.module';

describe('[TEST]: Ivy utils', (): void => {
    it('should work useInjector with fields', async function (): Promise<void> {
        TestBed.configureTestingModule({ imports: [TestModule] });
        const componentFixture: ComponentFixture<TestComponent> = TestBed.createComponent(TestComponent);
        const component: TestComponent = componentFixture.componentInstance;
        expect(component.testService.testField).toBe('test');
    });
});
