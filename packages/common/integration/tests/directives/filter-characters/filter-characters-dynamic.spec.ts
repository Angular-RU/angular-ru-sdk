import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCharactersModule } from '@angular-ru/common/directives';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';

describe('[TEST]: FilterCharacters Dynamic', () => {
    let fixture: ComponentFixture<DynamicTestComponent> | null = null;
    let component: DynamicTestComponent | null = null;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input matInput type="text" [formControlName]="controlName" filterCharacters="['a', 'b', 'c', '\\s']" />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class DynamicTestComponent {
        public form = this.fb.group({ a: 'abcД', b: null });
        public controlName: string = 'b';

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
        expect(component!.controlName).toEqual('b');
        expect(component?.form.value).toEqual({ a: 'abcД', b: null });
        expect(debugElement!.nativeElement.value).toEqual('');

        component!.controlName = 'a';
        localDetectChanges();
        setValueAndDispatch('abcД');
        expect(component!.controlName).toEqual('a');
        expect(component?.form.value).toEqual({ a: 'abc', b: null });

        component!.controlName = 'b';
        localDetectChanges();
        setValueAndDispatch('eb c Д');
        expect(component!.controlName).toEqual('b');
        expect(component?.form.value).toEqual({ a: 'abc', b: 'b c ' });
        expect(debugElement!.nativeElement.value).toEqual('b c ');

        component!.controlName = 'a';
        localDetectChanges();
        setValueAndDispatch('ab c Д');
        expect(component!.controlName).toEqual('a');
        expect(component?.form.value).toEqual({ a: 'ab c ', b: 'b c ' });
        expect(debugElement!.nativeElement.value).toEqual('b c ');
    });
});
