import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilterModule } from '@angular-ru/cdk/directives';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: inputFilter Config', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: ` <input [value]="filterValue" inputFilter /> `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        constructor(public readonly cd: ChangeDetectorRef) {}
    }

    it('should filter input with root config', () => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule.forRoot({ default: /[0-9]+/ })],
            declarations: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));

        expect(component).toBeTruthy();
        setValueAndDispatch('abc123');
        expect(debugElement!.nativeElement.value).toEqual('123');
    });

    it('should filter input with child config', () => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule.forChild({ default: /[0-9]+/ })],
            declarations: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));

        expect(component).toBeTruthy();
        setValueAndDispatch('abc123');
        expect(debugElement!.nativeElement.value).toEqual('123');
    });

    function setValueAndDispatch(value: string) {
        localDetectChanges();
        debugElement = fixture!.debugElement.query(By.css('input'));
        debugElement!.nativeElement.value = value;
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture!.componentInstance.cd.detectChanges();
    }
});
