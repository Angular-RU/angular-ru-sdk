import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterModule } from '@angular-ru/common/directives';
import { FilterPredicate } from '@angular-ru/common/string';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

describe('[TEST]: Filter Simple Input', () => {
    let fixture: ComponentFixture<TestComponent> | null = null;
    let component: TestComponent = null!;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: ` <input [value]="filterValue" [filter]="predicate" /> `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        public filterValue = 'abcД';
        public predicate: FilterPredicate = ['a', 'b', 'c', ' '];

        constructor(public readonly cd: ChangeDetectorRef) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, FilterModule],
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
        expect(component.filterValue).toEqual('abcД');

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
        component.predicate = ['a', 'b'];
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with RegExp', () => {
        component.predicate = /[a,b]+/;
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });

    it('should filter input with custom function', () => {
        component.predicate = (item: string): boolean => item === 'a' || item === 'b';
        setValueAndDispatch('aaabbbccc');
        expect(debugElement!.nativeElement.value).toEqual('aaabbb');
    });
});
