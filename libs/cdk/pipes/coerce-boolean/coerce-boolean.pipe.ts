import {Pipe, PipeTransform} from '@angular/core';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {InputBoolean} from '@angular-ru/cdk/typings';

@Pipe({name: 'coerceBoolean'})
export class CoerceBooleanPipe implements PipeTransform {
    public transform(value: InputBoolean): boolean {
        return coerceBoolean(value);
    }
}
