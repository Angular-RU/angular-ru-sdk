import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { InputFilterModule } from '@angular-ru/cdk/directives';
import { FilterPredicate } from '@angular-ru/cdk/string';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: inputFilter Dynamic', function () {
    let fixture: Nullable<ComponentFixture<DynamicTestComponent>> = null;
    let component: Nullable<DynamicTestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input
                    matInput
                    type="text"
                    [formControl]="$any(control)"
                    [inputFilter]="predicate"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class DynamicTestComponent {
        public form = this.fb.group({ a: 'kkk', b: null });
        public control: Nullable<AbstractControl> = this.form.get('b');
        public predicate: FilterPredicate = ['a', 'b', 'c'];

        constructor(public readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule],
            providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
            declarations: [DynamicTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(DynamicTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    function setValueAndDispatch(value: string) {
        debugElement = fixture!.debugElement.query(By.css('input'));
        debugElement.nativeElement.value = value;
        debugElement.triggerEventHandler('input', {
            target: debugElement.nativeElement
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture?.componentInstance.cd.detectChanges();
    }

    it('should correct sync modelView with model and dynamic control name', () => {
        expect(component?.form.value).toEqual({ a: 'kkk', b: null });
        expect(component?.control).toEqual(component?.form.get('b'));
        expect(debugElement?.nativeElement.value).toBe('');

        component!.control = component!.form.get('a');
        localDetectChanges();
        setValueAndDispatch('aaaqqq');
        expect(component?.form.value).toEqual({ a: 'aaa', b: null });
        expect(debugElement?.nativeElement.value).toBe('aaa');

        component!.control = component?.form.get('b');
        localDetectChanges();
        setValueAndDispatch('bbbddd');
        expect(component?.form.value).toEqual({ a: 'aaa', b: 'bbb' });
        expect(debugElement?.nativeElement.value).toBe('bbb');

        component!.control = component?.form.get('a');
        localDetectChanges();
        setValueAndDispatch('eeeccc');
        expect(component?.form.value).toEqual({ a: 'ccc', b: 'bbb' });
        expect(debugElement?.nativeElement.value).toBe('ccc');
    });

    it('should correct sync modelView with inputFilter characters', () => {
        expect(component!.form.value).toEqual({ a: 'kkk', b: null });
        expect(component?.control).toEqual(component?.form.get('b'));
        expect(debugElement?.nativeElement.value).toBe('');

        component!.predicate = ['d', 'e', 'f', ' '];
        localDetectChanges();
        setValueAndDispatch('d e f abc');
        expect(component?.form.value).toEqual({ a: 'kkk', b: 'd e f ' });
        expect(debugElement?.nativeElement.value).toBe('d e f ');
    });
});
