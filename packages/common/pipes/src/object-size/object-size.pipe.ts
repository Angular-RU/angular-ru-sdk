import { Pipe, PipeTransform } from '@angular/core';
import { PlainObject } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

@Pipe({ name: 'objectSize' })
export class ObjectSizePipe implements PipeTransform {
    public transform(obj?: PlainObject | null): number {
        return isNil(obj) ? 0 : Object.keys(obj).length;
    }
}
