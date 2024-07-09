import {Pipe, PipeTransform} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({name: 'objectSize'})
export class ObjectSizePipe implements PipeTransform {
    public transform(object?: Nullable<PlainObject>): number {
        return isNil(object) ? 0 : Object.keys(object).length;
    }
}
