import {transformToBoolean} from '@angular-ru/cdk/class-transformer';
import {TransformFnParams} from 'class-transformer';

describe('[TEST] TransformToBoolean', () => {
    it.each<TransformFnParams>([
        {value: true} as TransformFnParams,
        {value: 'true'} as TransformFnParams,
        {value: '12312s'} as TransformFnParams,
        {value: '0'} as TransformFnParams,
        {value: '1'} as TransformFnParams,
        {value: {}} as TransformFnParams,
        {value: []} as TransformFnParams,
        {value: ''} as TransformFnParams,
        {value: '   '} as TransformFnParams,
    ])('should return true', (item: TransformFnParams) => {
        expect(transformToBoolean(item)).toBe(true);
    });

    it.each<TransformFnParams>([
        {value: ' false '} as TransformFnParams,
        {value: 'false'} as TransformFnParams,
        {value: false} as TransformFnParams,
        {value: 0} as TransformFnParams,
        {value: null} as TransformFnParams,
        {value: undefined} as TransformFnParams,
    ])('should return false', (item: TransformFnParams) => {
        expect(transformToBoolean(item)).toBe(false);
    });
});
