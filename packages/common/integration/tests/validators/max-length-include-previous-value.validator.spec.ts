import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { maxLengthIncludePreviousValueValidator } from '@angular-ru/common/validators';

describe('max length include previous value validator', () => {
    const previousValue: string = 'eMEAF';
    const validString: string = 'GXNHboHv09';
    const invalidString: string = 'fL5tDwl6gD6Rwf9Im4iow';

    const COMMENTS_MAX_LENGTH = 20;

    const control: FormControl = new FormControl();

    const validator: ValidatorFn = maxLengthIncludePreviousValueValidator(COMMENTS_MAX_LENGTH, previousValue);

    it('should throw error when applied on FormGroup', () => {
        const formGroup: FormGroup = new FormGroup({});
        expect(() => validator(formGroup)).toThrow(
            new Error('maxLengthIncludePreviousValueValidator must be set on FormControl')
        );
    });

    it('should return null for null control value', () => {
        control.setValue(null);
        expect(validator(control)).toBeNull();
    });

    it('should return null for undefined control value', () => {
        control.setValue(undefined);
        expect(validator(control)).toBeNull();
    });

    it('should return null for empty string control value', () => {
        control.setValue('');
        expect(validator(control)).toBeNull();
    });

    it('should return null for valid prev and control values length', () => {
        control.setValue(validString);
        expect(validator(control)).toBeNull();
    });

    it('should return error object for invalid prev and control values length', () => {
        control.setValue(invalidString);
        expect(validator(control)).toBeDefined();
    });

    it('should return correct error object for invalid previous and control values length', () => {
        const error: ValidationErrors = {
            maxlength: {
                actualLength: `${previousValue} ${invalidString}`.length,
                requiredLength: COMMENTS_MAX_LENGTH
            }
        };
        control.setValue(invalidString);
        expect(validator(control)).toMatchObject<ValidationErrors>(error);
    });
});
