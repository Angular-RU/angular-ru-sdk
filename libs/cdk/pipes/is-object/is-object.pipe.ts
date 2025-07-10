import {Pipe, PipeTransform} from '@angular/core';
import {isSimpleObject} from '@angular-ru/cdk/object';

@Pipe({name: 'isObject'})
export class IsObjectPipe implements PipeTransform {
    public transform<T>(value: T): boolean {
        return isSimpleObject(value);
    }
}
