import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { TrimInputModule } from '@angular-ru/cdk/directives';
import { Nullable } from '@angular-ru/cdk/typings';
import { NgxMaskModule } from 'ngx-mask';

describe('[TEST]: Trim Input', function () {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input
                    matInput
                    type="text"
                    formControlName="value"
                    trimInput
                    mask="0000-0000-0000-0000"
                />
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
            imports: [BrowserModule, ReactiveFormsModule, FormsModule, TrimInputModule, NgxMaskModule.forRoot()],
            declarations: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with model', async () => {
        expect(component?.form.value).toEqual({ value: '1234000012340000' });
        expect(debugElement?.nativeElement.value).toBe('1234-0000-1234-0000');

        debugElement!.nativeElement.value = '\t  1234000012340000   ';
        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement
        });
        debugElement?.triggerEventHandler('blur', {
            target: debugElement.nativeElement
        });

        await fixture?.whenStable();

        fixture?.detectChanges();

        expect(component?.form.pristine).toBe(false);
        expect(component?.form.dirty).toBe(true);

        expect(component?.form.value).toEqual({ value: '1234000012340000' });
        expect(debugElement?.nativeElement.value).toBe('1234-0000-1234-0000');
    });
});
