import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {requiredSomeValueValidator} from '@angular-ru/cdk/validators';

describe('[TEST]: requiredSomeValueValidator', () => {
    let form: FormGroup;

    beforeEach(() => {
        form = new FormGroup(
            {
                aaa: new FormControl(),
                bbb: new FormControl(),
                ccc: new FormControl(),
            },
            {validators: [requiredSomeValueValidator()]},
        );
    });

    it('should return error if control is not part of FormGroup', () => {
        const control: AbstractControl = new FormControl();
        const validator: ValidatorFn = requiredSomeValueValidator();

        expect(() => validator(control))?.toThrow(
            new Error('requiredSomeValue must be used on form group'),
        );
    });

    // TODO: refactor duplicate tests
    it('should return error if all controls with no values: undefined, null, NaN', () => {
        form.controls?.['aaa']?.setValue(undefined);
        form.controls?.['bbb']?.setValue(null);
        form.controls?.['ccc']?.setValue(NaN);
        expect(form.errors).toEqual({requiredSomeValue: true});
    });

    it('should return error if all controls with no values: "", "null", Infinity', () => {
        form.controls?.['aaa']?.setValue('');
        form.controls?.['bbb']?.setValue(null);
        form.controls?.['ccc']?.setValue(Infinity);
        expect(form.errors).toEqual({requiredSomeValue: true});
    });

    it('should return error if all controls with no values: []', () => {
        form.controls?.['aaa']?.setValue([]);
        expect(form.errors).toEqual({requiredSomeValue: true});
    });

    it('should return error if all controls with no values', () => {
        expect(form.errors).toEqual({requiredSomeValue: true});
    });

    it('should be valid if there is only one value with type number', () => {
        form.controls?.['aaa']?.setValue(13);
        expect(form.valid).toBe(true);
    });

    it('should be valid if there is only one value with type string', () => {
        form.controls?.['bbb']?.setValue('awesome');
        expect(form.valid).toBe(true);
    });

    it('should be valid if there is only one value with type Object', () => {
        form.controls?.['ccc']?.setValue({});
        expect(form.valid).toBe(true);
    });

    it('should be valid if there is more than one value', () => {
        form.controls?.['aaa']?.setValue(13);
        form.controls?.['bbb']?.setValue('awesome');
        form.controls?.['ccc']?.setValue({});
        expect(form.valid).toBe(true);
    });
});
