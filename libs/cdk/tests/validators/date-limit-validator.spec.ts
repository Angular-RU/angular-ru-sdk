import {FormControl} from '@angular/forms';
import {toUtc} from '@angular-ru/cdk/date';
import {maxDateValidator, minDateValidator} from '@angular-ru/cdk/validators';

describe('date limit validator', () => {
    it('max date validator', () => {
        // invalid value
        const control: FormControl = new FormControl(
            toUtc({month: new Date().getMonth() - 1}),
            [maxDateValidator(toUtc({month: new Date().getMonth() - 2}))],
        );

        expect(control.errors).toEqual({maxDateLimitExceeded: true});

        // changing to extreme valid value
        control.setValue(toUtc({month: new Date().getMonth() - 2}));
        expect(control.valid).toBe(true);

        // changing to valid value
        control.setValue(toUtc({month: new Date().getMonth() - 3}));
        expect(control.valid).toBe(true);
    });

    it('min interval validator', () => {
        // invalid value
        const control: FormControl = new FormControl(
            toUtc({month: new Date().getMonth() - 3}),
            [minDateValidator(toUtc({month: new Date().getMonth() - 2}))],
        );

        expect(control.errors).toEqual({minDateLimitExceeded: true});

        // changing to extreme valid value
        control.setValue(toUtc({month: new Date().getMonth() - 2}));
        expect(control.valid).toBe(true);

        // changing to valid value
        control.setValue(toUtc({month: new Date().getMonth() - 1}));
        expect(control.valid).toBe(true);
    });

    it('combined min & max interval validator', () => {
        // invalid value
        const control: FormControl = new FormControl(
            toUtc({month: new Date().getMonth() - 4}),
            [
                minDateValidator(toUtc({month: new Date().getMonth() - 3})),
                maxDateValidator(toUtc({month: new Date().getMonth() - 1})),
            ],
        );

        expect(control.errors).toEqual({minDateLimitExceeded: true});

        // changing to extreme valid value
        control.setValue(toUtc({month: new Date().getMonth() - 3}));
        expect(control.valid).toBe(true);

        control.setValue(toUtc({month: new Date().getMonth() - 1}));
        expect(control.valid).toBe(true);

        // changing to valid value
        control.setValue(toUtc({month: new Date().getMonth() - 2}));
        expect(control.valid).toBe(true);

        // changing to invalid value again
        control.setValue(toUtc({month: new Date().getMonth()}));
        expect(control.errors).toEqual({maxDateLimitExceeded: true});
    });
});
