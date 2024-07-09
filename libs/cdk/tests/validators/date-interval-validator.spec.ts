import {FormControl, FormGroup} from '@angular/forms';
import {toUtc} from '@angular-ru/cdk/date';
import {
    dateMaxIntervalValidator,
    dateMinIntervalValidator,
} from '@angular-ru/cdk/validators';

describe('date interval validator', () => {
    it('max interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({month: new Date().getMonth() - 3})),
                dateTo: new FormControl(toUtc()),
            },
            [
                dateMaxIntervalValidator(new Date(0).setDate(60), {
                    dateToKey: 'dateTo',
                    dateFromKey: 'dateFrom',
                }),
            ],
        );

        expect(form.errors).toEqual({maxDateIntervalLimit: true});

        // changing to valid value
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() - 1}));
        expect(form.valid).toBe(true);
    });

    it('min interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({month: new Date().getMonth() - 2})),
                dateTo: new FormControl(toUtc()),
            },
            [
                dateMinIntervalValidator(new Date(0).setDate(70), {
                    dateToKey: 'dateTo',
                    dateFromKey: 'dateFrom',
                }),
            ],
        );

        expect(form.errors).toEqual({minDateIntervalLimit: true});

        // changing to valid value
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() - 3}));
        expect(form.valid).toBe(true);
    });

    it('combined min & max interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({month: new Date().getMonth() - 1})),
                dateTo: new FormControl(toUtc()),
            },
            [
                dateMinIntervalValidator(new Date(0).setDate(40), {
                    dateToKey: 'dateTo',
                    dateFromKey: 'dateFrom',
                }),
                dateMaxIntervalValidator(new Date(0).setDate(70), {
                    dateToKey: 'dateTo',
                    dateFromKey: 'dateFrom',
                }),
            ],
        );

        expect(form.errors).toEqual({minDateIntervalLimit: true});

        // changing to valid value
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() - 2}));
        expect(form.valid).toBe(true);

        // changing to invalid value again
        form.controls?.['dateFrom']?.setValue(toUtc({month: new Date().getMonth() - 3}));
        expect(form.errors).toEqual({maxDateIntervalLimit: true});
    });
});
