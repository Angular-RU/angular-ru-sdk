import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterModule } from '@angular-ru/common/directives';
import { FilterPredicate } from '@angular-ru/common/string';
import { MatInputModule } from '@angular/material/input';

describe('[TEST]: Filter Dynamic', () => {
    let fixture: ComponentFixture<DynamicTestComponent> | null = null;
    let component: DynamicTestComponent = null!;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" [formControl]="control" [filter]="predicate" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class DynamicTestComponent {
        public form = this.fb.group({ a: 'kkk', b: null });
        public control: AbstractControl | null = this.form.get('b');
        public predicate: FilterPredicate = ['a', 'b', 'c'];

        constructor(public readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatInputModule, FilterModule],
            declarations: [DynamicTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
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
        debugElement!.nativeElement.value = value;
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });
        localDetectChanges();
    }

    function localDetectChanges() {
        fixture!.componentInstance.cd.detectChanges();
    }

    it('should correct sync modelView with model and dynamic control name', () => {
        expect(component.form.value).toEqual({ a: 'kkk', b: null });
        expect(component.control).toEqual(component.form.get('b'));
        expect(debugElement!.nativeElement.value).toEqual('');

        component.control = component.form.get('a');
        localDetectChanges();
        setValueAndDispatch('aaaqqq');
        expect(component.form.value).toEqual({ a: 'aaa', b: null });
        expect(debugElement!.nativeElement.value).toEqual('aaa');

        component.control = component.form.get('b');
        localDetectChanges();
        setValueAndDispatch('bbbddd');
        expect(component.form.value).toEqual({ a: 'aaa', b: 'bbb' });
        expect(debugElement!.nativeElement.value).toEqual('bbb');

        component.control = component.form.get('a');
        localDetectChanges();
        setValueAndDispatch('eeeccc');
        expect(component.form.value).toEqual({ a: 'ccc', b: 'bbb' });
        expect(debugElement!.nativeElement.value).toEqual('ccc');
    });

    it('should correct sync modelView with filter characters', () => {
        expect(component.form.value).toEqual({ a: 'kkk', b: null });
        expect(component.control).toEqual(component.form.get('b'));
        expect(debugElement!.nativeElement.value).toEqual('');

        component.predicate = ['d', 'e', 'f', ' '];
        localDetectChanges();
        setValueAndDispatch('d e f abc');
        expect(component.form.value).toEqual({ a: 'kkk', b: 'd e f ' });
        expect(debugElement!.nativeElement.value).toEqual('d e f ');
    });
});
