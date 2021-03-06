import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilterModule } from '@angular-ru/common/directives';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Nullable } from '@angular-ru/common/typings';

describe('[TEST]: inputFilter Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement1: Nullable<DebugElement> = null;
    let debugElement2: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" formControlName="value" [inputFilter]="characters" id="input1" />
            </div>
            <input matInput type="text" [(ngModel)]="name" [inputFilter]="characters" id="input2" />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        public form = this.fb.group({ value: 'aaaKKK' });
        public characters = ['a', 'b', 'c'];
        public name: string = 'aaaKKK';

        constructor(private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule, FormsModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement1 = fixture?.debugElement.query(By.css('#input1'));
        debugElement2 = fixture?.debugElement.query(By.css('#input2'));
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('correct sync modelView with model', () => {
        expect(component?.form.value).toEqual({ value: 'aaaKKK' });

        debugElement1!.nativeElement.value = 'bbbOOO';
        debugElement1!.triggerEventHandler('input', {
            target: debugElement1!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();

            expect(component!.form.pristine).toEqual(false);
            expect(component!.form.dirty).toEqual(true);

            expect(component?.form.value).toEqual({ value: 'bbb' });
            expect(debugElement1!.nativeElement.value).toEqual('bbb');
        });
    });

    it('correct sync modelView with ngModel', () => {
        expect(component?.name).toEqual('aaaKKK');
        expect(debugElement2!.nativeElement.value).toEqual('aaaKKK');

        debugElement2!.nativeElement.value = 'bbbOOO';
        debugElement2!.triggerEventHandler('input', {
            target: debugElement2!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();

            expect(component?.name).toEqual('bbb');
            expect(debugElement2!.nativeElement.value).toEqual('bbb');
        });
    });

    it('should trigger "input" event only once', () => {
        let count: number = 0;
        debugElement2!.nativeElement.addEventListener('input', () => ++count);
        debugElement2!.nativeElement.value = 'bbbOOO';
        debugElement2!.triggerEventHandler('input', {
            target: debugElement2!.nativeElement
        });
        expect(count).toEqual(1);
    });
});
