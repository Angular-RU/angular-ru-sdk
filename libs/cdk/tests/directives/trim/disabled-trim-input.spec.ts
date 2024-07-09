import {ChangeDetectionStrategy, Component, DebugElement, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {TrimInputModule} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';
import {NgxMaskModule} from 'ngx-mask';

describe('[TEST]: Disabling trim Input', function () {
    let fixture: Nullable<ComponentFixture<TestComponent>> = null;
    let component: Nullable<TestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input
                    formControlName="value"
                    matInput
                    trimInput
                    type="text"
                    [trimDisabled]="disable"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        @Input() public disable = true;
        public form = this.fb.group({value: 'nothing special'});

        constructor(private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                TrimInputModule,
                NgxMaskModule.forRoot(),
            ],
            declarations: [TestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('do not trim when disabled', async () => {
        expect(component?.form.value).toEqual({value: 'nothing special'});
        expect(debugElement?.nativeElement.value).toBe('nothing special');

        const notFormatted = '\t  something special    ';

        debugElement!.nativeElement.value = notFormatted;
        debugElement?.triggerEventHandler('input', {
            target: debugElement.nativeElement,
        });
        debugElement?.triggerEventHandler('blur', {
            target: debugElement?.nativeElement,
        });
        await fixture?.whenStable();

        expect(component?.form.pristine).toBe(false);
        expect(component?.form.dirty).toBe(true);

        expect(debugElement?.nativeElement.value).toBe(notFormatted);
        expect(component?.form.value).toEqual({value: notFormatted});
    });
});
