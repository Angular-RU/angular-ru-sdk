import { Pipe, PipeTransform } from '@angular/core';
import { coerceBoolean } from '@angular-ru/common/coercion';

@Pipe({ name: 'coerceBoolean' })
export class CoerceBooleanPipe implements PipeTransform {
    public transform: typeof coerceBoolean = coerceBoolean;
}
