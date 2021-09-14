import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { Any, InputBoolean, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

export function AttributeBoolean(): PropertyDecorator {
    return function (prototype: PlainObject, key: string | symbol): PropertyDescriptor & ThisType<Any> {
        const descriptor: Nullable<PropertyDescriptor> = Object.getOwnPropertyDescriptor(prototype, key);

        const uniqueRefKey: symbol = Symbol(`It's boolean attribute`);

        return {
            set(value: InputBoolean): void {
                this[uniqueRefKey] = coerceBoolean(value);
                descriptor?.set?.call(this, this[uniqueRefKey]);
            },
            get(): boolean {
                return isNotNil(descriptor?.get) ? descriptor?.get.call(this) : this[uniqueRefKey] ?? false;
            }
        };
    };
}
