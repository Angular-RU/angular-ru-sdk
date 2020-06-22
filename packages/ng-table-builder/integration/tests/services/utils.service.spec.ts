/* eslint-disable */
import { KeyMap } from '../../../src/interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../../../src/operators/check-value-is-empty';
import { UtilsService } from '../../../src/services/utils/utils.service';

describe('UtilsService', () => {
    let utils: UtilsService;
    beforeEach(() => (utils = new UtilsService()));

    it('should be created', () => {
        expect(utils).toBeTruthy();
    });

    it('should be correct flatten keys', () => {
        const row: KeyMap = {
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
