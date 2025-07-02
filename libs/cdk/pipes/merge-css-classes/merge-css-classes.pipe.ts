import {Pipe, PipeTransform} from '@angular/core';
import {isIterable} from '@angular-ru/cdk/object';
import {isString} from '@angular-ru/cdk/string';
import {ClassDescriptor, PlainObject, PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNil} from '@angular-ru/cdk/utils';

@Pipe({standalone: false, name: 'mergeCssClasses'})
export class MergeCssClassesPipe implements PipeTransform {
    public transform(...descriptors: ClassDescriptor[]): PlainObject {
        return Object.assign(
            {},
            ...descriptors.map(this.convertToPlainObject.bind(this)),
        );
    }

    private convertToPlainObject(descriptor: ClassDescriptor): PlainObject {
        if (isNil(descriptor)) {
            return {};
        }

        if (isString(descriptor)) {
            return this.makePlainObjectOfTrues(descriptor.split(/\s+/));
        }

        if (isIterable(descriptor)) {
            return this.makePlainObjectOfTrues(Array.from(descriptor) as any[]);
        }

        return descriptor;
    }

    private makePlainObjectOfTrues(array: string[]): PlainObjectOf<true> {
        return array.reduce(
            (object: PlainObjectOf<true>, item: string): PlainObjectOf<true> =>
                Object.assign(object, {[item]: true}),
            {},
        );
    }
}
