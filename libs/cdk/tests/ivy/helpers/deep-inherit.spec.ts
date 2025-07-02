import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    Injectable,
    Injector,
    NgModule,
    NgZone,
    Type,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {useInjector} from '@angular-ru/cdk/ivy';

function Injection<T>(classRef: Type<T>): PropertyDecorator {
    return <R extends typeof Object.prototype>(
        prototypeRef: R,
        propertyKey: string | symbol,
    ): void => {
        useInjector(
            prototypeRef.constructor,
            (injector: Injector, instance: any): void => {
                instance[propertyKey] = injector.get(classRef);
            },
        );
    };
}

@Injectable()
class MockService {
    public testField = 'test';
}

@Directive({
    standalone: false,
})
abstract class AbstractDemoChildComponent {
    @Injection(MockService)
    public anotherService1!: MockService;

    @Injection(MockService)
    public anotherService2!: MockService;

    public hello(): string {
        try {
            return this.anotherService2.testField;
        } catch {
            return 'INVALID';
        }
    }
}

@Directive({standalone: false, selector: 'hello-world'})
class HelloWorldComponent extends AbstractDemoChildComponent {
    @Injection(MockService)
    public anotherService3!: MockService;
}

@Directive({standalone: false, selector: 'hello-world'})
class A extends HelloWorldComponent {}

class B extends A {
    public world(): string {
        try {
            return `${this.anotherService3.testField}__hello__`;
        } catch {
            return 'INVALID';
        }
    }
}

class C extends B {}

@Component({
    standalone: false,
    selector: 'test-component',
    template: `
        <p class="service">{{ world() }}</p>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
class MockComponent extends C {
    @Injection(MockService)
    public testService!: MockService;

    @Injection(NgZone)
    public ngZone!: NgZone;
}

@NgModule({
    declarations: [MockComponent],
    providers: [MockService],
})
class TestModule {}

describe('[TEST] Ivy utils - check deep inheritance', () => {
    let componentFixture: ComponentFixture<MockComponent>;

    jest.spyOn(console, 'error').mockImplementation();

    beforeEach((): void => {
        TestBed.configureTestingModule({imports: [TestModule]});
        componentFixture = TestBed.createComponent(MockComponent);
    });

    afterAll((): void => {
        (console.error as any).mockRestore();
    });

    /** @description due to test running Angular in JIT mode,
     * it is necessary to defer the patch until the next cycle by `Promise.then`
     * so Jest requires to mark such test as async */
    it('deep inheritance', async (): Promise<void> => {
        const component: MockComponent = componentFixture.componentInstance;

        expect(component.ngZone.constructor).toBe(NgZone);
        expect(component.anotherService1).toEqual({testField: 'test'});
        expect(component.anotherService2).toEqual({testField: 'test'});
        expect(component.anotherService3).toEqual({testField: 'test'});
        expect(component.hello()).toBe('test');
        expect(component.world()).toBe('test__hello__');

        expect(getHtml(componentFixture)).toBe('<p class="service"></p>');

        componentFixture.detectChanges();

        expect(getHtml(componentFixture)).toBe('<p class="service">test__hello__</p>');
    });

    function getHtml<T>(fixture: ComponentFixture<T>): string {
        return fixture.elementRef.nativeElement.innerHTML;
    }
});
