import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrimInputModule } from '@angular-ru/cdk/directives';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: Trim Input', () => {
    let fixture: Nullable<ComponentFixture<DynamicTestComponent>> = null;
    let component: Nullable<DynamicTestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" trimInput [formControlName]="controlName" mask="0000-0000-0000-0000" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class DynamicTestComponent {
        public form = this.fb.group({ a: 1234000012340000, b: null });
        public controlName: string = 'b';

        constructor(public readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                MatInputModule,
                TrimInputModule,
                NgxMaskModule.forRoot()
            ],
            declarations: [DynamicTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    function setValueAndDispatchBlur(value: string) {
        debugElement = fixture!.debugElement.query(By.css('input'));
        debugElement!.nativeElement.value = value;
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });
        debugElement!.triggerEventHandler('blur', {
            target: debugElement!.nativeElement
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture!.componentInstance.cd.detectChanges();
    }

    it('correct sync modelView with model and dynamic control name', () => {
        expect(component!.controlName).toEqual('b');
        expect(component?.form.value).toEqual({ a: 1234000012340000, b: undefined });
        expect(debugElement!.nativeElement.value).toEqual('');

        component!.controlName = 'a';
        localDetectChanges();
        setValueAndDispatchBlur('\t  2222000022220000   ');
        expect(component!.controlName).toEqual('a');
        expect(component?.form.value).toEqual({ a: '2222000022220000', b: undefined });
        expect(debugElement!.nativeElement.value).toEqual('2222-0000-2222-0000');

        component!.controlName = 'b';
        localDetectChanges();
        setValueAndDispatchBlur('\t  3333000033330000   ');
        expect(component!.controlName).toEqual('b');
        expect(component?.form.value).toEqual({ a: '2222000022220000', b: '3333000033330000' });
        expect(debugElement!.nativeElement.value).toEqual('3333-0000-3333-0000');

        component!.controlName = 'a';
        localDetectChanges();
        setValueAndDispatchBlur('\t  4444000044440000   ');
        expect(component!.controlName).toEqual('a');
        expect(component?.form.value).toEqual({ a: '4444000044440000', b: '3333000033330000' });
        expect(debugElement!.nativeElement.value).toEqual('4444-0000-4444-0000');
    });
});
