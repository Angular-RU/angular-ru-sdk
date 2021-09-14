import { isString } from '@angular-ru/cdk/string';
import { checkValueIsEmpty } from '@angular-ru/cdk/utils';
import { TransformFnParams } from 'class-transformer/types/interfaces';

export function transformToNumber({ value }: TransformFnParams): number {
    if (isString(value) as boolean) {
        const strValue: string = value.trim().replace(/\s/g, '');

        return strValue ? Number(strValue) : null!;
    }

    return checkValueIsEmpty(value) ? null! : Number(value);
}
