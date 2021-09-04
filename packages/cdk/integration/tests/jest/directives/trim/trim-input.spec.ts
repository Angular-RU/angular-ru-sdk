import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrimInputModule } from '@angular-ru/cdk/directives';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: Trim Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" formControlName="value" trimInput mask="0000-0000-0000-0000" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        public form = this.fb.group({ value: 1234000012340000 });

        constructor(private readonly fb: FormBuilder) {}
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
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with model', () => {
        expect(component?.form.value).toEqual({ value: '1234000012340000' });
        expect(debugElement!.nativeElement.value).toEqual('1234-0000-1234-0000');

        debugElement!.nativeElement.value = '\t  1234000012340000   ';
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });
        debugElement!.triggerEventHandler('blur', {
            target: debugElement!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();

            expect(component!.form.pristine).toEqual(false);
            expect(component!.form.dirty).toEqual(true);

            expect(component?.form.value).toEqual({ value: '1234000012340000' });
            expect(debugElement!.nativeElement.value).toEqual('1234-0000-1234-0000');
        });
    });
});
