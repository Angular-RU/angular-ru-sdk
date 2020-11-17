import { Pipe, PipeTransform } from '@angular/core';
import { isSimpleObject } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';

@Pipe({ name: 'isObject' })
export class IsObjectPipe implements PipeTransform {
    public transform(value: Any): boolean {
        return isSimpleObject(value);
    }
}
