import {FormControl} from '@angular/forms';
import {longValidator} from '@angular-ru/cdk/validators';

describe('[TEST]: longValidator', () => {
    const control: FormControl = new FormControl(null, longValidator());

    it('should be created', () => {
        expect(control).toBeTruthy();
    });

    it('should be valid with values range: (-9223372036854775808, 9223372036854775807)', () => {
        control.setValue('13');

        expect(control.errors).toBeNull();

        control.setValue('-9223372036854775808');

        expect(control.errors).toBeNull();

        control.setValue('9223372036854775807');

        expect(control.errors).toBeNull();

        control.setValue('-1');

        expect(control.errors).toBeNull();

        control.setValue('0');

        expect(control.errors).toBeNull();

        control.setValue('1');

        expect(control.errors).toBeNull();
    });

    it('should switch validation correctly', () => {
        control.setValue('13');

        expect(control.errors).toBeNull();

        control.setValue('99999999999999999999999999999');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('13');

        expect(control.errors).toBeNull();
    });

    it('should return error if value is out of range: (-9223372036854775808, 9223372036854775807)', () => {
        control.setValue('-9223372036854775809');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('9223372036854775808');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('-99999999999999999999999999999');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('99999999999999999999999999999');

        expect(control.errors?.['long']).toBe(true);
    });

    it('should not return error for empty values', () => {
        control.setValue('');

        expect(control.errors).toBeNull();

        control.setValue(' ');

        expect(control.errors).toBeNull();

        control.setValue(undefined);

        expect(control.errors).toBeNull();

        control.setValue(null);

        expect(control.errors).toBeNull();
    });

    it('should correctly validate numbers', () => {
        control.setValue(13);

        expect(control.errors).toBeNull();

        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        control.setValue(99999999999999999999999999999);

        expect(control.errors?.['long']).toBe(true);
    });

    it('should return errors for incorrect numbers', () => {
        control.setValue('a');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('abc');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('1a');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('a1');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('abc13abc');

        expect(control.errors?.['long']).toBe(true);

        control.setValue('abc 13 abc');

        expect(control.errors?.['long']).toBe(true);
    });
});
