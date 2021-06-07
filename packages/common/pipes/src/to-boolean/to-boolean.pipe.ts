import { Pipe, PipeTransform } from '@angular/core';
import { coerceBoolean } from '@angular-ru/common/coercion';

@Pipe({ name: 'toBoolean' })
export class ToBooleanPipe implements PipeTransform {
    public transform: typeof coerceBoolean = coerceBoolean;
}
