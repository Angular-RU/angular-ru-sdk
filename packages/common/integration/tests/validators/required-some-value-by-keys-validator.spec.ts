import { requiredSomeValueByKeysValidator } from '@angular-ru/common/validators';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

describe('[TEST]: requiredSomeValueByKeysValidator', () => {
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                aaa: new FormControl(),
                bbb: new FormControl(),
                ccc: new FormControl()
            },
            { validators: [requiredSomeValueByKeysValidator(['aaa', 'bbb', 'ccc'])] }
        );
    });

    it('should return error if control is not part of FormGroup', () => {
        const control: AbstractControl = new FormControl();
        const validator: ValidatorFn = requiredSomeValueByKeysValidator(['aaa', 'bbb', 'ccc']);
        expect(() =>
            validator(control)?.toThrow(new Error('requiredSomeValueByKeysValidator must be used on form group'))
        );
    });

    it('should return error if all controls with no values: undefined, null, NaN', () => {
        form.controls['aaa']?.setValue(undefined);
        form.controls['bbb']?.setValue(null);
        form.controls['ccc']?.setValue(NaN);
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should return error if all controls with no values: "", "null", Infinity', () => {
        form.controls['aaa']?.setValue('');
        form.controls['bbb']?.setValue(null);
        form.controls['ccc']?.setValue(Infinity);
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should return error if all controls with no values: []', () => {
        form.controls['aaa']?.setValue([]);
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should return error if all controls with no values', () => {
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should be valid if there is only one value with type number', () => {
        form.controls['aaa']?.setValue(13);
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is only one value with type string', () => {
        form.controls['bbb']?.setValue('awesome');
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is only one value with type Object', () => {
        form.controls['ccc']?.setValue({});
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is more than one value', () => {
        form.controls['aaa']?.setValue(13);
        form.controls['bbb']?.setValue('awesome');
        form.controls['ccc']?.setValue({});
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is null as a parameter', () => {
        form = new FormGroup({}, { validators: [requiredSomeValueByKeysValidator()] });
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is empty list as a parameter', () => {
        form = new FormGroup({}, { validators: [requiredSomeValueByKeysValidator([])] });
        expect(form.valid).toEqual(true);
    });
});

describe('[TEST]: requiredSomeValueByKeysValidator, nesting: 2', () => {
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                ddd: new FormGroup({
                    eee: new FormControl()
                })
            },
            { validators: [requiredSomeValueByKeysValidator(['ddd.eee'])] }
        );
    });

    it('should return error if nested control has no value', () => {
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should be valid if nested control has a value', () => {
        const control: AbstractControl = form.get('ddd.eee') ?? new FormControl();
        control.setValue(1);
        expect(form.valid).toEqual(true);
    });
});

describe('[TEST]: requiredSomeValueByKeysValidator, nesting: 3', () => {
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                aaa: new FormGroup({
                    bbb: new FormGroup({
                        ccc: new FormControl()
                    })
                })
            },
            { validators: [requiredSomeValueByKeysValidator(['aaa.bbb.ccc'])] }
        );
    });

    it('should return error if nested control has no value', () => {
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should be valid if nested control has a value', () => {
        const control: AbstractControl = form.get('aaa.bbb.ccc') ?? new FormControl();
        control.setValue(1);
        expect(form.valid).toEqual(true);
    });
});

describe('[TEST]: requiredSomeValueByKeysValidator, single and nesting', () => {
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                aaa: new FormGroup({
                    bbb: new FormGroup({
                        ccc: new FormControl()
                    })
                }),
                ddd: new FormControl()
            },
            { validators: [requiredSomeValueByKeysValidator(['aaa.bbb.ccc', 'ddd'])] }
        );
    });

    it('should return error if nested control has no value', () => {
        expect(form.errors).toEqual({ requiredSomeValueByKeys: true });
    });

    it('should be valid if nested control has a value', () => {
        const control: AbstractControl = form.get('aaa.bbb.ccc') ?? new FormControl();
        control.setValue(1);
        expect(form.valid).toEqual(true);
    });

    it('should be valid if not nested control has no value', () => {
        const control: AbstractControl = form.get('ddd') ?? new FormControl();
        control.setValue(1);
        expect(form.valid).toEqual(true);
    });

    it('should be valid if both nested and not nested control has value', () => {
        const nested: AbstractControl = form.get('aaa.bbb.ccc') ?? new FormControl();
        const control: AbstractControl = form.get('ddd') ?? new FormControl();
        nested.setValue(2);
        control.setValue(1);
        expect(form.valid).toEqual(true);
    });

    it('should be always valid for parent control', () => {
        form.setValidators(requiredSomeValueByKeysValidator(['aaa']));
        form.updateValueAndValidity();
        expect(form.valid).toEqual(true);
    });
});
