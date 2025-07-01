import {Pipe, PipeTransform} from '@angular/core';
import {isFunctionLike} from '@angular-ru/cdk/function';
import {EmptyValue} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

import {JoinPipeOptions} from './join-pipe-options';

@Pipe({standalone: false, name: 'join'})
export class JoinPipe implements PipeTransform {
    private readonly defaultSeparator: string = ',';

    public transform<T>(
        input: EmptyValue | T[],
        {separator, mapTransformer}: JoinPipeOptions<T> = {},
    ): string {
        let result = '';

        if (checkValueIsEmpty(input)) {
            return result;
        }

        const currentSeparator: string = separator ?? this.defaultSeparator;

        if (isFunctionLike(mapTransformer)) {
            result = input.reduce(
                (prev: string, next: T, index: number, arr: T[]): string => {
                    const transformed: string = mapTransformer(next, index, arr);
                    const separatorOrEmpty: string =
                        arr.length - 1 === index ? '' : currentSeparator;

                    return prev
                        ? `${prev}${transformed}${separatorOrEmpty}`
                        : `${transformed}${separatorOrEmpty}`;
                },
                '',
            );
        } else {
            result = input.join(currentSeparator);
        }

        return result;
    }
}
