import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {toUtc} from '@angular-ru/cdk/date';
import {orderedIntervalValidator} from '@angular-ru/cdk/validators';

describe('ordered interval validator', () => {
    let form: FormGroup;

    beforeEach(() => {
        form = new FormGroup(
            {
                dateFrom: new FormControl(toUtc()),
                dateTo: new FormControl(toUtc()),
            },
            [orderedIntervalValidator({dateToKey: 'dateTo', dateFromKey: 'dateFrom'})],
        );
    });

    it('should be valid if "from = to"', () => {
        expect(form.valid).toBe(true);
    });

    it('should be valid if "from < to"', () => {
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() - 1}));
        expect(form.valid).toBe(true);
    });

    it('should be valid if "from = null"', () => {
        form.controls?.['dateFrom']?.setValue(null);
        expect(form.valid).toBe(true);
    });

    it('should be valid if "to = null"', () => {
        form.controls?.['dateTo']?.setValue(null);
        expect(form.valid).toBe(true);
    });

    it('should be valid if "from = null" and "to = null"', () => {
        form.controls?.['dateFrom']?.setValue(null);
        form.controls?.['dateTo']?.setValue(null);
        expect(form.valid).toBe(true);
    });

    it('should return error if "from > to"', () => {
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() + 1}));
        expect(form.errors).toEqual({orderedInterval: true});
    });

    it('should return error if control is not part of FormGroup', () => {
        const control: AbstractControl = new FormControl();
        const validator: ValidatorFn = orderedIntervalValidator({
            dateToKey: 'dateTo',
            dateFromKey: 'dateFrom',
        });

        expect(() => validator(control)).toThrow(
            new Error('DateIntervalValidator must be used on form group'),
        );
    });
});
