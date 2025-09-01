import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DebugElement,
    inject,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {By} from '@angular/platform-browser';
import {InputFilter} from '@angular-ru/cdk/directives';
import {FilterPredicate} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

describe('[TEST]: inputFilter Input', function () {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        imports: [InputFilter, MatInput, ReactiveFormsModule],
        template: `
            <div [formGroup]="form">
                <input
                    formControlName="value"
                    matInput
                    type="text"
                    [inputFilter]="predicate"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        public readonly cd = inject(ChangeDetectorRef);
        private readonly fb = inject(FormBuilder);

        public form = this.fb.group({value: 'abcД'});
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
        }).compileComponents();

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
        debugElement = fixture?.debugElement.query(By.css('input'));

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = value;
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement?.nativeElement,
        });

        localDetectChanges();
    }

    function localDetectChanges() {
        fixture?.componentInstance.cd.detectChanges();
    }

    it('should correct sync modelView with model', async () => {
        expect(component?.form.value).toEqual({value: 'abcД'});

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = 'ab c Д';
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement,
        });

        fixture?.whenStable();
        fixture?.detectChanges();

        expect(component?.form.pristine).toBe(false);
        expect(component?.form.dirty).toBe(true);

        expect(component?.form.value).toEqual({value: 'ab c '});
        expect(debugElement?.nativeElement.value).toBe('ab c ');
    });

    it('should filter input with characters', () => {
        component!.predicate = ['a', 'b'];
        setValueAndDispatch('aaabbbccc');

        expect(component?.form.value).toEqual({value: 'aaabbb'});
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });

    it('should filter input with RegExp', () => {
        component!.predicate = /[,ab]+/;
        setValueAndDispatch('aaabbbccc');

        expect(component?.form.value).toEqual({value: 'aaabbb'});
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });

    it('should filter input with custom function', () => {
        component!.predicate = (item: string): boolean => item === 'a' || item === 'b';
        setValueAndDispatch('aaabbbccc');

        expect(component?.form.value).toEqual({value: 'aaabbb'});
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });
});
