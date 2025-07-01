import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    AbstractControlOptions,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import {emptyValidator} from '@angular-ru/cdk/validators';

describe('empty validator', () => {
    it('without empty validator', () => {
        @Component({
            standalone: false,
            selector: 'app',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class AppComponent {
            public form: FormGroup;

            constructor(private readonly fb: FormBuilder) {
                this.form = this.fb.group({
                    name: '',
                    lastName: '',
                });
            }
        }

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AppComponent],
        });

        const app: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);

        expect(app.componentInstance.form.valid).toBe(true);
    });

    it('with empty validator', () => {
        @Component({
            standalone: false,
            selector: 'app',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
        class AppComponent {
            public form: FormGroup;

            constructor(private readonly fb: FormBuilder) {
                this.form = this.fb.group(
                    {
                        name: this.fb.control(''),
                        lastName: this.fb.control(''),
                    },
                    {validators: [emptyValidator]} as AbstractControlOptions,
                );
            }
        }

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AppComponent],
        });

        const app: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);

        expect(app.componentInstance.form.valid).toBe(false);

        app.componentInstance.form.get('name')?.setValue('maxim');
        app.componentInstance.form.get('lastName')?.setValue('ivanov');

        expect(app.componentInstance.form.valid).toBe(true);
    });
});
