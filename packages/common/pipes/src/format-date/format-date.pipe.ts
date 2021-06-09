import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { firstItem } from '@angular-ru/common/array';
import { isString } from '@angular-ru/common/string';

import { FormatDatePipeOptions } from './format-date';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
    public transform(value?: string | number | Date, options?: FormatDatePipeOptions): string {
        let result: string | number | Date | undefined = value;

        if (isString(result) as boolean) {
            result = firstItem((result as string).split('+')) ?? '';
        }

        return (
            new DatePipe(options?.locale ?? 'en-US').transform(
                result,
                options?.dateFormat ?? 'dd.MM.yyyy',
                options?.timezone
            ) ?? ''
        );
    }
}
