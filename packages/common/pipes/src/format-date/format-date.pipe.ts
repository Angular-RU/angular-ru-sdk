import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { firstItem } from '@angular-ru/common/array';

import { FormatDatePipeOptions } from './format-date.interfaces';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
    public transform(value?: string | number | Date, options?: FormatDatePipeOptions): string {
        if (typeof value === 'string') {
            value = firstItem(value.split('+')) || '';
        }

        return (
            new DatePipe(options?.locale ?? 'en-US').transform(
                value,
                options?.dateFormat ?? 'dd.MM.yyyy',
                options?.timezone
            ) ?? ''
        );
    }
}
