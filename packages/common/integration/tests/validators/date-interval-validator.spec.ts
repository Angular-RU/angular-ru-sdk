import { FormControl, FormGroup } from '@angular/forms';
import { toUtc } from '@angular-ru/common/date';
import {
    dateMaxIntervalValidator,
    dateMinIntervalValidator,
    orderedIntervalValidator
} from '@angular-ru/common/validators';

describe('date interval validator', () => {
    it('max interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({ month: new Date().getMonth() - 3 })),
                dateTo: new FormControl(toUtc())
            },
            [dateMaxIntervalValidator(new Date(0).setDate(60), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' })]
        );
        expect(form.errors).toEqual({ maxDateIntervalLimit: true });

        // changing to valid value
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() - 2 }));
        expect(form.valid).toBe(true);
    });

    it('min interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({ month: new Date().getMonth() - 2 })),
                dateTo: new FormControl(toUtc())
            },
            [dateMinIntervalValidator(new Date(0).setDate(70), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' })]
        );
        expect(form.errors).toEqual({ minDateIntervalLimit: true });

        // changing to valid value
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() - 3 }));
        expect(form.valid).toBe(true);
    });

    it('combined min & max interval validator', () => {
        // invalid value
        const form: FormGroup = new FormGroup(
            {
                dateFrom: new FormControl(toUtc({ month: new Date().getMonth() - 1 })),
                dateTo: new FormControl(toUtc())
            },
            [
                dateMinIntervalValidator(new Date(0).setDate(40), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' }),
                dateMaxIntervalValidator(new Date(0).setDate(70), { dateToKey: 'dateTo', dateFromKey: 'dateFrom' })
            ]
        );
        expect(form.errors).toEqual({ minDateIntervalLimit: true });

        // changing to valid value
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() - 2 }));
        expect(form.valid).toBe(true);

        // changing to invalid value again
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() - 3 }));
        expect(form.errors).toEqual({ maxDateIntervalLimit: true });
    });
});

describe('compare "from" and "to"', () => {
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                dateFrom: new FormControl(toUtc()),
                dateTo: new FormControl(toUtc())
            },
            [orderedIntervalValidator({ dateToKey: 'dateTo', dateFromKey: 'dateFrom' })]
        );
    });

    it('should not return error if "from = to"', () => {
        expect(form.valid).toBe(true);
    });

    it('should not return error if "from < to"', () => {
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() - 1 }));
        expect(form.valid).toBe(true);
    });

    it('should not return error if "from = null"', () => {
        form.controls.dateFrom.setValue(null);
        expect(form.valid).toBe(true);
    });

    it('should not return error if "to = null"', () => {
        form.controls.dateFrom.setValue(null);
        expect(form.valid).toBe(true);
    });

    it('should return error if "from > to"', () => {
        form.controls.dateFrom.setValue(toUtc({ month: new Date().getMonth() + 1 }));
        expect(form.errors).toEqual({ orderedInterval: true });
    });
});
