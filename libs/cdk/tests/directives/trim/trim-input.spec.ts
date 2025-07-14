import {ChangeDetectionStrategy, Component, DebugElement, inject} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {BrowserModule, By} from '@angular/platform-browser';
import {TrimInput} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';
import {NgxMaskDirective, provideEnvironmentNgxMask} from 'ngx-mask';

describe('[TEST]: Trim Input', function () {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        imports: [MatInput, NgxMaskDirective, ReactiveFormsModule, TrimInput],
        template: `
            <div [formGroup]="form">
                <input
                    formControlName="value"
                    mask="0000-0000-0000-0000"
                    matInput
                    trimInput
                    type="text"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        private readonly fb = inject(FormBuilder);

        public form = this.fb.group({value: 1234000012340000});
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserModule, ReactiveFormsModule, FormsModule, TestComponent],
            providers: [provideEnvironmentNgxMask()],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with model', async () => {
        expect(component?.form.value).toEqual({value: 1234000012340000});
        expect(debugElement?.nativeElement.value).toBe('1234-0000-1234-0000');

        debugElement!.nativeElement.value = '\t  1234000012340000   ';
        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement,
        });
        debugElement?.triggerEventHandler('blur', {
            target: debugElement.nativeElement,
        });

        await fixture?.whenStable();

        fixture?.detectChanges();

        expect(component?.form.pristine).toBe(false);
        expect(component?.form.dirty).toBe(true);

        expect(component?.form.value).toEqual({value: 1234000012340000});
        expect(debugElement?.nativeElement.value).toBe('1234-0000-1234-0000');
    });
});
