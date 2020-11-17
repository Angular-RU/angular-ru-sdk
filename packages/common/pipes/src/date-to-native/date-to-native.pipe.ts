import { Pipe, PipeTransform } from '@angular/core';
import { dateStringToDate } from '@angular-ru/common/date';

@Pipe({ name: 'dateNative' })
export class DateToNativePipe implements PipeTransform {
    public transform(value: string): Date {
        return dateStringToDate(value);
    }
}
