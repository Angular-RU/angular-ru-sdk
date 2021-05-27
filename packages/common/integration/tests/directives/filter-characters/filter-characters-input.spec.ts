import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCharactersModule } from '@angular-ru/common/directives';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';

describe('[TEST]: FilterCharacters Input', () => {
    let fixture: ComponentFixture<TestComponent> | null = null;
    let component: TestComponent | null = null;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: `
            <div [formGroup]="form">
                <input
                    matInput
                    type="text"
                    [formControl]="form.get('value')"
                    filterCharacters="['a', 'b', 'c', '\\s']"
                />
            </div>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class TestComponent {
        public form = this.fb.group({ value: 'abcД' });

        constructor(private readonly fb: FormBuilder) {}
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                ReactiveFormsModule,
                FormsModule,
                MatInputModule,
                FilterCharactersModule,
                NgxMaskModule.forRoot()
            ],
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

    it('correct sync modelView with model', () => {
        expect(component?.form.value).toEqual({ value: 'abc' });

        debugElement!.nativeElement.value = 'ab c Д';
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });

        fixture?.whenStable().then(() => {
            fixture?.detectChanges();

            expect(component!.form.pristine).toEqual(false);
            expect(component!.form.dirty).toEqual(true);

            expect(component?.form.value).toEqual({ value: 'ab c ' });
            expect(debugElement!.nativeElement.value).toEqual('ab c ');
        });
    });
});
