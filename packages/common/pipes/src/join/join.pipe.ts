import { Pipe, PipeTransform } from '@angular/core';
import { isFunctionLike } from '@angular-ru/common/function';

import { JoinPipeOptions } from './join-pipe.interface';

@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
    private readonly defaultSeparator: string = ',';

    public transform<T>(input: T[], { separator, mapTransformer }: JoinPipeOptions<T> = {}): string {
        const currentSeparator: string = separator ?? this.defaultSeparator;

        if (isFunctionLike(mapTransformer)) {
            // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
            return input.reduce((prev: string, next: T, index: number, arr: T[]): string => {
                const transformed: string = mapTransformer(next, index, arr);
                const separatorOrEmpty: string = arr.length - 1 === index ? '' : currentSeparator;
                return prev ? `${prev}${transformed}${separatorOrEmpty}` : `${transformed}${separatorOrEmpty}`;
            }, '');
        } else {
            return input.join(currentSeparator);
        }
    }
}
