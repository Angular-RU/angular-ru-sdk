import {transformToBoolean} from '@angular-ru/cdk/class-transformer';
import {TransformFnParams} from 'class-transformer';

describe('[TEST] TransformToBoolean', () => {
    it('should return true', () => {
        const data: TransformFnParams[] = [
            {value: true} as TransformFnParams,
            {value: 'true'} as TransformFnParams,
            {value: '12312s'} as TransformFnParams,
            {value: '0'} as TransformFnParams,
            {value: '1'} as TransformFnParams,
            {value: {}} as TransformFnParams,
            {value: []} as TransformFnParams,
            {value: ''} as TransformFnParams,
            {value: '   '} as TransformFnParams,
        ];

        for (const item of data) {
            expect(transformToBoolean(item)).toBe(true);
        }
    });

    it('should return false', () => {
        const data: TransformFnParams[] = [
            {value: ' false '} as TransformFnParams,
            {value: 'false'} as TransformFnParams,
            {value: false} as TransformFnParams,
            {value: 0} as TransformFnParams,
            {value: null} as TransformFnParams,
            {value: undefined} as TransformFnParams,
        ];

        for (const item of data) {
            expect(transformToBoolean(item)).toBe(false);
        }
    });
});
