import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { InputFilterModule } from '@angular-ru/cdk/directives';
import { REG_EXP_NO_CYRILLIC } from '@angular-ru/cdk/regexp';
import { FilterPredicate } from '@angular-ru/cdk/string';
import { Nullable } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

describe('[TEST]: inputFilter Simple Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <input
                [value]="filterValue"
                [inputFilter]="predicate"
                [filterDisabled]="disableFilter"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        @Input() public disableFilter: boolean = false;
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        public filterValue = 'abcД';
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];

        constructor(public readonly cd: ChangeDetectorRef) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule.forRoot({ default: REG_EXP_NO_CYRILLIC })],
            providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
            declarations: [TestComponent]
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
            target: debugElement?.nativeElement
        });

        localDetectChanges();
    }

    function localDetectChanges() {
        fixture?.componentInstance.cd.detectChanges();
    }

    it('should correct sync modelView with model', async () => {
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        expect(component?.filterValue).toBe('abcД');

        if (isNotNil(debugElement)) {
            // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
            debugElement.nativeElement.value = 'ab c Д';
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement
        });

        await fixture?.whenStable();
        fixture?.detectChanges();

        expect(debugElement?.nativeElement.value).toBe('ab c ');
    });

    it('should filter input with characters', () => {
        component!.predicate = ['a', 'b'];
        setValueAndDispatch('aaabbbccc');
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });

    it('should filter input with RegExp', () => {
        component!.predicate = /[,ab]+/;
        setValueAndDispatch('aaabbbccc');
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });

    it('should filter input with custom function', () => {
        component!.predicate = (item: string): boolean => item === 'a' || item === 'b';
        setValueAndDispatch('aaabbbccc');
        expect(debugElement?.nativeElement.value).toBe('aaabbb');
    });

    it('should filter cyrillic by default', () => {
        // eslint-disable-next-line no-cyrillic-string/no-cyrillic-string
        setValueAndDispatch('aaaДДДccc');
        expect(debugElement?.nativeElement.value).toBe('aaaccc');
    });

    it('should not filter anything', () => {
        component!.disableFilter = true;
        fixture?.detectChanges();
        setValueAndDispatch('aaaZZZZccc');
        expect(debugElement?.nativeElement.value).toBe('aaaZZZZccc');
    });
});
