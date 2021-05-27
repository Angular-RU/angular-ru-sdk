import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCharactersModule } from '@angular-ru/common/directives';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';

describe('[TEST]: FilterCharacters Dynamic', () => {
    let fixture: ComponentFixture<DynamicTestComponent> | null = null;
    let component: DynamicTestComponent = null!;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" [formControl]="control" filterCharacters="['a', 'b', 'c']" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class DynamicTestComponent {
        public form = this.fb.group({ a: 'kkk', b: null });
        public control: AbstractControl | null = this.form.get('b');

        constructor(public readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserModule, ReactiveFormsModule, FormsModule, MatInputModule, FilterCharactersModule],
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

    it('correct sync modelView with model and dynamic control name', () => {
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
});
