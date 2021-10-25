import { shallowFlat } from '@angular-ru/cdk/array';
import { Any } from '@angular-ru/cdk/typings';

describe('[TEST]: shallowFlat', () => {
    it('should flat array (2th depth)', () => {
        const expectedArr: string[][] = [['st1', 'st2'], ['st3'], ['st4']];
        const result: string[] = ['st1', 'st2', 'st3', 'st4'];

        expect(shallowFlat(expectedArr)).toEqual(result);
    });

    it('should flat array (3th depth)', () => {
        const expectedArr: Any[] = [
            ['st1', 'st2'],
            [['st3', 'st4'], 'st5']
        ];
        const result: Any[] = ['st1', 'st2', ['st3', 'st4'], 'st5'];

        expect(shallowFlat(expectedArr)).toEqual(result);
    });
});
