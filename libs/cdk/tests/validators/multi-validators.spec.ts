import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {toUtc} from '@angular-ru/cdk/date';
import {
    orderedIntervalValidator,
    requiredSomeValueByKeysValidator,
} from '@angular-ru/cdk/validators';

describe('[TEST]: requiredSomeValueByKeysValidator vs orderedIntervalValidator', () => {
    let form: FormGroup;

    beforeEach(() => {
        form = new FormGroup(
            {
                dateFrom: new FormControl(),
                dateTo: new FormControl(),
                aaa: new FormControl(),
                bbb: new FormControl(),
            },
            {
                validators: [
                    requiredSomeValueByKeysValidator(['aaa', 'bbb']),
                    orderedIntervalValidator({
                        dateToKey: 'dateTo',
                        dateFromKey: 'dateFrom',
                    }),
                ],
            },
        );
    });

    it('should be valid if both valid', () => {
        const controlFrom: AbstractControl = form.get('dateFrom') ?? new FormControl();
        const controlTo: AbstractControl = form.get('dateTo') ?? new FormControl();
        const controlA: AbstractControl = form.get('aaa') ?? new FormControl();

        controlFrom.setValue(toUtc());
        controlTo.setValue(toUtc({month: new Date().getMonth() + 1}));
        controlA.setValue(1);

        expect(form.valid).toBe(true);
    });

    it('should return error if both invalid', () => {
        const controlFrom: AbstractControl = form.get('dateFrom') ?? new FormControl();
        const controlTo: AbstractControl = form.get('dateTo') ?? new FormControl();

        controlFrom.setValue(toUtc());
        controlTo.setValue(toUtc({month: new Date().getMonth() - 1}));
        form.updateValueAndValidity();
        const error: string = JSON.stringify(form.errors);
        const expectError: string = JSON.stringify({
            requiredSomeValueByKeys: true,
            orderedInterval: true,
        });

        expect(error).toEqual(expectError);
    });

    it('should return error if only requiredSomeValueByKeysValidator is invalid', () => {
        const controlFrom: AbstractControl = form.get('dateFrom') ?? new FormControl();
        const controlTo: AbstractControl = form.get('dateTo') ?? new FormControl();

        controlFrom.setValue(toUtc());
        controlTo.setValue(toUtc());

        expect(form.errors).toEqual({requiredSomeValueByKeys: true});
    });

    it('should return error if only orderedIntervalValidator is invalid', () => {
        const controlFrom: AbstractControl = form.get('dateFrom') ?? new FormControl();
        const controlTo: AbstractControl = form.get('dateTo') ?? new FormControl();
        const controlA: AbstractControl = form.get('aaa') ?? new FormControl();

        controlFrom.setValue(toUtc());
        controlTo.setValue(toUtc({month: new Date().getMonth() - 1}));
        controlA.setValue(1);

        expect(form.errors).toEqual({orderedInterval: true});
    });
});
