import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFilterModule } from '@angular-ru/cdk/directives';
import { FilterPredicate } from '@angular-ru/cdk/string';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Nullable } from '@angular-ru/cdk/typings';
import { REG_EXP_NO_CYRILLIC } from '@angular-ru/cdk/regexp';

describe('[TEST]: inputFilter Simple Input', () => {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: ` <input [value]="filterValue" [inputFilter]="predicate" /> `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        public filterValue = 'abcД';
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];

        constructor(public readonly cd: ChangeDetectorRef) {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, InputFilterModule.forRoot({ default: REG_EXP_NO_CYRILLIC })],
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
        expect(component!.filterValue).toEqual('abcД');

        debugElement!.nativeElement.value = 'ab c Д';
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();
            expect(debugElement!.nativeElement.value).toEqual('ab c ');
        });
    });

    it('should filter input with characters', () => {
        component!.predicate = ['a', 'b'];
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with RegExp', () => {
        component!.predicate = /[a,b]+/;
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with custom function', () => {
        component!.predicate = (item: string): boolean => item === 'a' || item === 'b';
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter cyrillic by default', () => {
        setValueAndDispatch('aaaДДДccc');
        expect(debugElement!.nativeElement.value).toEqual('aaaccc');
    });
});
