import { DeclinationDictionary, declinationOfNumber } from '@angular-ru/common/utils';

describe('[TEST]: declinationOfNumber', () => {
    it('seconds', () => {
        const dictionary: DeclinationDictionary = ['секунда', 'секунды', 'секунд'];

        expect(declinationOfNumber(0, dictionary)).toEqual('секунд');
        expect(declinationOfNumber(1, dictionary)).toEqual('секунда');
        expect(declinationOfNumber(2, dictionary)).toEqual('секунды');
        expect(declinationOfNumber(3, dictionary)).toEqual('секунды');
        expect(declinationOfNumber(4, dictionary)).toEqual('секунды');
        expect(declinationOfNumber(5, dictionary)).toEqual('секунд');
        expect(declinationOfNumber(12, dictionary)).toEqual('секунд');
        expect(declinationOfNumber(24, dictionary)).toEqual('секунды');
        expect(declinationOfNumber(27, dictionary)).toEqual('секунд');
    });

    it('watermelon', () => {
        const dictionary: DeclinationDictionary = ['арбуз', 'арбуза', 'арбузов'];

        expect(declinationOfNumber(0, dictionary)).toEqual('арбузов');
        expect(declinationOfNumber(1, dictionary)).toEqual('арбуз');
        expect(declinationOfNumber(3, dictionary)).toEqual('арбуза');
        expect(declinationOfNumber(2, dictionary)).toEqual('арбуза');
        expect(declinationOfNumber(3, dictionary)).toEqual('арбуза');
        expect(declinationOfNumber(4, dictionary)).toEqual('арбуза');
        expect(declinationOfNumber(5, dictionary)).toEqual('арбузов');
        expect(declinationOfNumber(12, dictionary)).toEqual('арбузов');
        expect(declinationOfNumber(24, dictionary)).toEqual('арбуза');
        expect(declinationOfNumber(27, dictionary)).toEqual('арбузов');
    });
});
