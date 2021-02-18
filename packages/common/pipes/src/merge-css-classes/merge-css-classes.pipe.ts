import { Pipe, PipeTransform } from '@angular/core';
import { isIterable } from '@angular-ru/common/object';
import { PlainObject, PlainObjectOf } from '@angular-ru/common/typings';
import { isNil } from '@angular-ru/common/utils';

type ClassDescriptor = string | string[] | Set<string> | PlainObject | undefined | null;

@Pipe({
    name: 'mergeCssClasses'
})
export class MergeCssClassesPipe implements PipeTransform {
    public transform(...descriptors: ClassDescriptor[]): PlainObject {
        return Object.assign({}, ...descriptors.map(this.convertToPlainObject.bind(this)));
    }

    private convertToPlainObject(descriptor: ClassDescriptor): PlainObject {
        if (isNil(descriptor)) {
            return {};
        }
        if (typeof descriptor === 'string') {
            return this.makePlainObjectOfTrues(descriptor.split(/\s+/));
        }
        if (isIterable(descriptor)) {
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
