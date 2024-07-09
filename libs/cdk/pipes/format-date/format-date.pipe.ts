import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import {takeFirstItem} from '@angular-ru/cdk/array';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';

import {FormatDatePipeOptions} from './format-date';

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
    public transform(
        value?: Nullable<string | number | Date>,
        options?: FormatDatePipeOptions,
    ): string {
        let result: Nullable<string | number | Date> = value;

        if (isString(result)) {
            result = takeFirstItem(result.split('+')) ?? '';
        }

        return (
            new DatePipe(options?.locale ?? 'en-US').transform(
                result,
                options?.dateFormat ?? 'dd.MM.yyyy',
                options?.timezone,
            ) ?? ''
        );
    }
}
