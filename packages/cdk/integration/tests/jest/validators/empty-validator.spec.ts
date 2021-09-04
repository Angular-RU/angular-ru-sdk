import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { emptyValidator } from '@angular-ru/cdk/validators';

describe('empty validator', () => {
    it('without empty validator', () => {
        @Component({
            selector: 'app',
            template: ``
        })
        class AppComponent {
            public form: FormGroup;

            constructor(private readonly fb: FormBuilder) {
                this.form = this.fb.group({
                    name: '',
                    lastName: ''
                });
            }
        }

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AppComponent]
        });

        const app: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        expect(app.componentInstance.form.valid).toEqual(true);
    });

    it('with empty validator', () => {
        @Component({
            selector: 'app',
            template: ``
        })
        class AppComponent {
            public form: FormGroup;

            constructor(private readonly fb: FormBuilder) {
                this.form = this.fb.group(
                    {
                        name: '',
                        lastName: ''
                    },
                    { validators: emptyValidator }
                );
            }
        }

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [AppComponent]
        });

        const app: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
        expect(app.componentInstance.form.valid).toEqual(false);

        app.componentInstance.form.get('name')?.setValue('maxim');
        app.componentInstance.form.get('lastName')?.setValue('ivanov');

        expect(app.componentInstance.form.valid).toEqual(true);
    });
});
