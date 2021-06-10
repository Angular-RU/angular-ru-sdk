import { Pipe, PipeTransform } from '@angular/core';
import { isIterable } from '@angular-ru/common/object';
import { isString } from '@angular-ru/common/string';
import { ClassDescriptor, PlainObject, PlainObjectOf } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

@Pipe({ name: 'mergeCssClasses' })
export class MergeCssClassesPipe implements PipeTransform {
    public transform(...descriptors: ClassDescriptor[]): PlainObject {
        return Object.assign({}, ...descriptors.map(this.convertToPlainObject.bind(this)));
    }

    private convertToPlainObject(descriptor: ClassDescriptor): PlainObject {
        if (isNil(descriptor)) {
            return {};
        } else if (isString(descriptor)) {
            return this.makePlainObjectOfTrues(descriptor.split(/\s+/));
        } else if (isIterable(descriptor)) {
            return this.makePlainObjectOfTrues(Array.from(descriptor));
        }

        return descriptor;
    }

    private makePlainObjectOfTrues(array: string[]): PlainObjectOf<true> {
        return array.reduce(
            (object: PlainObjectOf<true>, item: string): PlainObjectOf<true> => Object.assign(object, { [item]: true }),
            {}
        );
    }
}
