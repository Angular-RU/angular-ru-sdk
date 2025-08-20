import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DebugElement,
    inject,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {BrowserModule, By} from '@angular/platform-browser';
import {TrimInput} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';
import {NgxMaskDirective, provideEnvironmentNgxMask} from 'ngx-mask';

describe('[TEST]: Trim Input', function () {
    let fixture: Nullable<ComponentFixture<DynamicTestComponent>> = null;
    let component: Nullable<DynamicTestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        imports: [MatInput, NgxMaskDirective, ReactiveFormsModule, TrimInput],
        template: `
            <div [formGroup]="form">
                <input
                    mask="0000-0000-0000-0000"
                    matInput
                    trimInput
                    type="text"
                    [formControlName]="controlName"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class DynamicTestComponent {
        public readonly cd = inject(ChangeDetectorRef);
        private readonly fb = inject(FormBuilder);

        public form = this.fb.group({a: 1234000012340000, b: null});
        public controlName = 'b';
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                DynamicTestComponent,
            ],
            providers: [provideEnvironmentNgxMask()],
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    function setValueAndDispatchBlur(value: string) {
        debugElement = fixture?.debugElement.query(By.css('input'));

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = value;
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement,
        });
        debugElement?.triggerEventHandler('blur', {
            target: debugElement?.nativeElement,
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture?.componentInstance.cd.detectChanges();
    }

    it('correct sync modelView with model and dynamic control name', () => {
        expect(component?.controlName).toBe('b');
        expect(component?.form.value).toEqual({a: 1234000012340000, b: null});
        expect(debugElement?.nativeElement.value).toBe('');

        if (isNotNil(component)) {
            component.controlName = 'a';
        }

        localDetectChanges();
        setValueAndDispatchBlur('\t  2222000022220000   ');

        expect(component?.controlName).toBe('a');
        expect(component?.form.value).toEqual({a: '2222000022220000', b: null});
        expect(debugElement?.nativeElement.value).toBe('2222-0000-2222-0000');

        if (isNotNil(component)) {
            component.controlName = 'b';
        }

        localDetectChanges();
        setValueAndDispatchBlur('\t  3333000033330000   ');

        expect(component?.controlName).toBe('b');
        expect(component?.form.value).toEqual({
            a: '2222000022220000',
            b: '3333000033330000',
        });
        expect(debugElement?.nativeElement.value).toBe('3333-0000-3333-0000');

        if (isNotNil(component)) {
            component.controlName = 'a';
        }

        localDetectChanges();
        setValueAndDispatchBlur('\t  4444000044440000   ');

        expect(component?.controlName).toBe('a');
        expect(component?.form.value).toEqual({
            a: '4444000044440000',
            b: '3333000033330000',
        });
        expect(debugElement?.nativeElement.value).toBe('4444-0000-4444-0000');
    });
});
