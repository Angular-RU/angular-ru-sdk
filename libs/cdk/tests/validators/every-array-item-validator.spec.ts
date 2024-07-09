import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import {everyArrayItemValidator} from '@angular-ru/cdk/validators';

describe('[TEST]: #everyArrayItemValidator', (): void => {
    let validatorMock: jest.MockedFunction<ValidatorFn>;
    let secondValidatorMock: jest.MockedFunction<ValidatorFn>;
    let expectedControl: AbstractControl;

    beforeEach((): void => {
        validatorMock = jest.fn();
        secondValidatorMock = jest.fn();
        expectedControl = new FormControl([]);
    });

    it('should call validator for every items', (): void => {
        expectedControl.setValidators(everyArrayItemValidator([validatorMock]));

        expectedControl.setValue(['st1', 'st2']);

        expect(validatorMock).toHaveBeenCalledTimes(2);
    });

    it('should call every validator for item', (): void => {
        expectedControl.setValidators(
            everyArrayItemValidator([validatorMock, secondValidatorMock]),
        );

        expectedControl.setValue(['st1']);

        expect(validatorMock).toHaveBeenCalledTimes(1);
        expect(secondValidatorMock).toHaveBeenCalledTimes(1);
    });

    it('should return null if value is not array', (): void => {
        expectedControl.setValidators(everyArrayItemValidator([validatorMock]));

        expectedControl.setValue('st1');

        expect(validatorMock).toHaveBeenCalledTimes(0);
        expect(expectedControl.errors).toBeNull();
    });

    it('should return all errors', (): void => {
        validatorMock.mockImplementation((): ValidationErrors | null => ({
            firstError: 'firstError',
        }));

        secondValidatorMock.mockImplementation((): ValidationErrors | null => ({
            secondError: 'secondError',
        }));

        expectedControl.setValidators(
            everyArrayItemValidator([validatorMock, secondValidatorMock]),
        );

        expectedControl.setValue(['st1']);

        expect(expectedControl.errors).toEqual({
            firstError: 'firstError',
            secondError: 'secondError',
        });
    });
});
