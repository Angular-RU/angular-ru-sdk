import { checkValueIsEmpty, checkValueIsFilled } from '@angular-ru/common/utils';
import { PlainObject } from '@angular-ru/common/typings';
import { UtilsService } from '../../../src/services/utils/utils.service';

describe('UtilsService', () => {
    let utils: UtilsService;
    beforeEach(() => (utils = new UtilsService()));

    it('should be created', () => {
        expect(utils).toBeTruthy();
    });

    it('should be correct flatten keys', () => {
        const row: PlainObject = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                },
                g: [1, 2, 3]
            }
        };

        expect(utils.flattenKeysByRow(row)).toEqual(['a', 'b.c', 'b.d.e', 'b.g']);
    });

    it('should be correct check invalid value', () => {
        expect(checkValueIsEmpty(null)).toEqual(true);
        expect(checkValueIsEmpty(NaN)).toEqual(true);
        expect(checkValueIsEmpty(Infinity)).toEqual(true);
        expect(checkValueIsEmpty(undefined)).toEqual(true);
        expect(checkValueIsEmpty('    ')).toEqual(true);
        expect(checkValueIsEmpty(false)).toEqual(false);
        expect(checkValueIsEmpty(true)).toEqual(false);
        expect(checkValueIsEmpty(0)).toEqual(false);
        expect(checkValueIsEmpty('x')).toEqual(false);
    });

    it('should be correct check filled value', () => {
        expect(checkValueIsFilled(null)).toEqual(false);
        expect(checkValueIsFilled(NaN)).toEqual(false);
        expect(checkValueIsFilled(Infinity)).toEqual(false);
        expect(checkValueIsFilled(undefined)).toEqual(false);
        expect(checkValueIsFilled('    ')).toEqual(false);
        expect(checkValueIsFilled(false)).toEqual(true);
        expect(checkValueIsFilled(true)).toEqual(true);
        expect(checkValueIsFilled(0)).toEqual(true);
        expect(checkValueIsFilled('x')).toEqual(true);
    });

    it('should be correct deep object', () => {
        class Person {
            constructor(public name: string, public city: string) {}
        }

        // @ts-ignore
        Person.prototype['age'] = 25;
        const willem: Person = new Person('Willem', 'Groningen');

        expect(utils.flattenKeysByRow(willem)).toEqual(['name', 'city']);
    });
});
