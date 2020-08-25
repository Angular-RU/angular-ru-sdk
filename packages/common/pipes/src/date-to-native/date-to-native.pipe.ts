import { dateStringToDate } from '@angular-ru/common/date';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateNative' })
export class DateToNativePipe implements PipeTransform {
    public transform(value: string): Date {
        return dateStringToDate(value);
    }
}
