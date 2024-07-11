import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DebugElement,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {InputFilterModule} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

describe('[TEST]: inputFilter Config', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <input
                inputFilter
                [value]="filterValue"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        public filterValue = '';
        constructor(public readonly cd: ChangeDetectorRef) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, InputFilterModule.forRoot({default: /\d+/})],
            declarations: [TestComponent],
        }).compileComponents();
    });

    it('should filter input with root config', () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));

        expect(component).toBeTruthy();
        setValueAndDispatch('abc123');
        expect(debugElement.nativeElement.value).toBe('123');
    });

    it('should filter input with child config', () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));

        expect(component).toBeTruthy();
        setValueAndDispatch('abc123');
        expect(debugElement.nativeElement.value).toBe('123');
    });

    function setValueAndDispatch(value: string) {
        localDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = value;
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement?.nativeElement,
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture?.componentInstance.cd.detectChanges();
    }
});
