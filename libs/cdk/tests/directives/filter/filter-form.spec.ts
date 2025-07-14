import {ChangeDetectionStrategy, Component, DebugElement, inject} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {By} from '@angular/platform-browser';
import {InputFilter} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';

describe('[TEST]: inputFilter Input', function () {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement1: Nullable<DebugElement> = null;
    let debugElement2: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        imports: [FormsModule, InputFilter, MatInput, ReactiveFormsModule],
        template: `
            <div [formGroup]="form">
                <input
                    id="input1"
                    formControlName="value"
                    matInput
                    type="text"
                    [inputFilter]="characters"
                />
            </div>
            <input
                id="input2"
                matInput
                type="text"
                [inputFilter]="characters"
                [(ngModel)]="name"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        private readonly fb = inject(FormBuilder);

        public form = this.fb.group({value: 'aaaKKK'});
        public characters = ['a', 'b', 'c'];
        public name = 'aaaKKK';
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement1 = fixture?.debugElement.query(By.css('#input1'));
        debugElement2 = fixture?.debugElement.query(By.css('#input2'));
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('correct sync modelView with model', async () => {
        expect(component?.form.value).toEqual({value: 'aaaKKK'});

        debugElement1!.nativeElement.value = 'bbbOOO';
        debugElement1?.triggerEventHandler('input', {
            target: debugElement1.nativeElement,
        });

        await fixture?.whenStable();

        fixture?.detectChanges();

        expect(component?.form.pristine).toBe(false);
        expect(component?.form.dirty).toBe(true);

        expect(component?.form.value).toEqual({value: 'bbb'});
        expect(debugElement1?.nativeElement.value).toBe('bbb');
    });

    it('correct sync modelView with ngModel', async () => {
        expect(component?.name).toBe('aaaKKK');
        expect(debugElement2?.nativeElement.value).toBe('aaaKKK');

        debugElement2!.nativeElement.value = 'bbbOOO';
        debugElement2?.triggerEventHandler('input', {
            target: debugElement2.nativeElement,
        });

        await fixture?.whenStable();

        fixture?.detectChanges();

        expect(component?.name).toBe('bbb');
        expect(debugElement2?.nativeElement.value).toBe('bbb');
    });

    it('should trigger "input" event only once', () => {
        let count = 0;

        debugElement2?.nativeElement.addEventListener('input', () => ++count);
        debugElement2!.nativeElement.value = 'bbbOOO';
        debugElement2?.triggerEventHandler('input', {
            target: debugElement2?.nativeElement,
        });

        expect(count).toBe(1);
    });
});
