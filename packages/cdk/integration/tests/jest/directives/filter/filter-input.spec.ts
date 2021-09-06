import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { InputFilterModule } from '@angular-ru/cdk/directives';
import { FilterPredicate } from '@angular-ru/cdk/string';
import { Nullable } from '@angular-ru/cdk/typings';

describe('[TEST]: inputFilter Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" formControlName="value" [inputFilter]="predicate" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        public form = this.fb.group({ value: 'abcД' });
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];

        constructor(public readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
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

    it('should correct sync modelView with model', () => {
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        expect(component?.form.value).toEqual({ value: 'abcД' });

        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        debugElement!.nativeElement.value = 'ab c Д';
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();

            expect(component!.form.pristine).toEqual(false);
            expect(component!.form.dirty).toEqual(true);

            expect(component?.form.value).toEqual({ value: 'ab c ' });
            expect(debugElement!.nativeElement.value).toEqual('ab c ');
        });
    });

    it('should filter input with characters', () => {
        component!.predicate = ['a', 'b'];
        setValueAndDispatch('aaabbbccc');
        expect(component!.form.value).toEqual({ value: 'aaabbb' });
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with RegExp', () => {
        component!.predicate = /[a,b]+/;
        setValueAndDispatch('aaabbbccc');
        expect(component!.form.value).toEqual({ value: 'aaabbb' });
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with custom function', () => {
        component!.predicate = (item: string): boolean => item === 'a' || item === 'b';
        setValueAndDispatch('aaabbbccc');
        expect(component!.form.value).toEqual({ value: 'aaabbb' });
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });
});
