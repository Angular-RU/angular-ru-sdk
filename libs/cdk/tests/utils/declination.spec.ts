import {DeclinationDictionary} from '@angular-ru/cdk/utils';
import {declinationOfNumber} from '@angular-ru/cdk/utils';

describe('[TEST]: declinationOfNumber', () => {
    it('seconds', () => {
        const dictionary: DeclinationDictionary = ['секунда', 'секунды', 'секунд'];

        expect(declinationOfNumber(0, dictionary)).toBe('секунд');
        expect(declinationOfNumber(1, dictionary)).toBe('секунда');
        expect(declinationOfNumber(2, dictionary)).toBe('секунды');
        expect(declinationOfNumber(3, dictionary)).toBe('секунды');
        expect(declinationOfNumber(4, dictionary)).toBe('секунды');
        expect(declinationOfNumber(5, dictionary)).toBe('секунд');
        expect(declinationOfNumber(12, dictionary)).toBe('секунд');
        expect(declinationOfNumber(24, dictionary)).toBe('секунды');
        expect(declinationOfNumber(27, dictionary)).toBe('секунд');
    });

    it('watermelon', () => {
        const dictionary: DeclinationDictionary = ['арбуз', 'арбуза', 'арбузов'];

        expect(declinationOfNumber(0, dictionary)).toBe('арбузов');
        expect(declinationOfNumber(1, dictionary)).toBe('арбуз');
        expect(declinationOfNumber(3, dictionary)).toBe('арбуза');
        expect(declinationOfNumber(2, dictionary)).toBe('арбуза');
        expect(declinationOfNumber(3, dictionary)).toBe('арбуза');
        expect(declinationOfNumber(4, dictionary)).toBe('арбуза');
        expect(declinationOfNumber(5, dictionary)).toBe('арбузов');
        expect(declinationOfNumber(12, dictionary)).toBe('арбузов');
        expect(declinationOfNumber(24, dictionary)).toBe('арбуза');
        expect(declinationOfNumber(27, dictionary)).toBe('арбузов');
    });
});
