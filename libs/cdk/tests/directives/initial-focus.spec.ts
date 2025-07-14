import {
    ChangeDetectionStrategy,
    Component,
    DebugElement,
    inject,
    Input,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {InitialFocus} from '@angular-ru/cdk/directives';

jest.useFakeTimers();

describe('[TEST]: Initial Focus', function () {
    let fixture!: ComponentFixture<TestComponent>;
    let component!: TestComponent;
    let debugElement!: DebugElement;

    @Component({
        selector: 'test',
        imports: [InitialFocus, ReactiveFormsModule],
        template: `
            <form [formGroup]="form">
                <input
                    #dontWantFocus
                    formControlName="dontWantFocus"
                    type="text"
                />
                <input
                    #wantFocusText
                    formControlName="wantFocusText"
                    initialFocus
                    type="text"
                    [focusDisabled]="disableFocusText"
                />
                <input
                    #wantFocusNumber
                    formControlName="wantFocusNumber"
                    initialFocus
                    type="number"
                    [focusDisabled]="disableFocusNumberDo"
                />
            </form>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        private readonly fb = inject(FormBuilder);

        @Input()
        public disableFocusText = true;

        @Input()
        public disableFocusNumberDo = true;

        public form = this.fb.group({
            dontWantFocus: 'don not want to be focused',
            wantFocusText: 'wanna be focused',
            wantFocusNumber: 7,
        });
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it.skip('focus on text input', async () => {
        component.disableFocusText = false;
        fixture.detectChanges();
        await fixture.whenStable();
        const spiedFunctions = debugElement
            .queryAll(By.css('input'))
            .map((element: DebugElement) => jest.spyOn(element.nativeElement, 'focus'));

        expect(spiedFunctions[0]).not.toHaveBeenCalled();
        expect(spiedFunctions[1]).not.toHaveBeenCalled();
        expect(spiedFunctions[2]).not.toHaveBeenCalled();
        expect(component.form?.value?.wantFocusText).toBe('wanna be focused');

        jest.runOnlyPendingTimers();

        expect(spiedFunctions[0]).not.toHaveBeenCalled();
        expect(spiedFunctions[1]).toHaveBeenCalledTimes(1);
        expect(spiedFunctions[2]).not.toHaveBeenCalled();
    });

    it.skip('focus on number input (selection range bug)', async () => {
        component.disableFocusNumberDo = false;
        fixture.detectChanges();
        await fixture.whenStable();
        const inputElements = debugElement
            .queryAll(By.css('input'))
            .map((element: DebugElement) => element.nativeElement);
        const spiedFunctions = inputElements.map((element: any) =>
            jest.spyOn(element, 'focus'),
        );

        expect(spiedFunctions[0]).not.toHaveBeenCalled();
        expect(spiedFunctions[1]).not.toHaveBeenCalled();
        expect(spiedFunctions[2]).not.toHaveBeenCalled();
        expect((inputElements[2] as HTMLInputElement).className).not.toContain(
            'initial-focus',
        );
        expect(component.form?.value?.wantFocusText).toBe('wanna be focused');

        jest.runOnlyPendingTimers();

        expect(spiedFunctions[0]).not.toHaveBeenCalled();
        expect(spiedFunctions[1]).not.toHaveBeenCalled();
        expect((inputElements[1] as HTMLInputElement).className).not.toContain(
            'initial-focus',
        );
        expect(spiedFunctions[2]).toHaveBeenCalledTimes(1);
        expect((inputElements[2] as HTMLInputElement).className).toContain(
            'initial-focus',
        );
    });
});
