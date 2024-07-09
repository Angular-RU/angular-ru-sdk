import {Pipe, PipeTransform} from '@angular/core';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

@Pipe({name: 'isFilled'})
export class IsFilledPipe implements PipeTransform {
    public transform: typeof checkValueIsFilled = checkValueIsFilled;
}
