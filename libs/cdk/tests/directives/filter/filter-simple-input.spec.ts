import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DebugElement,
    inject,
    Input,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {InputFilter, provideInputFilter} from '@angular-ru/cdk/directives';
import {REG_EXP_NO_CYRILLIC} from '@angular-ru/cdk/regexp';
import {FilterPredicate} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

describe('[TEST]: inputFilter Simple Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        imports: [InputFilter],
        template: `
            <input
                [filterDisabled]="disableFilter"
                [inputFilter]="predicate"
                [value]="filterValue"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        public readonly cd = inject(ChangeDetectorRef);

        @Input()
        public disableFilter = false;

        public filterValue = 'abcД';
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideInputFilter({default: REG_EXP_NO_CYRILLIC})],
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
        expect(component?.filterValue).toBe('abcД');

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = 'ab c Д';
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement,
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
