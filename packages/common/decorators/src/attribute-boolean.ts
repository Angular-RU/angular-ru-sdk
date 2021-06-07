import { coerceBoolean } from '@angular-ru/common/coercion';
import { Any, InputBoolean, PlainObject } from '@angular-ru/common/typings';

export function AttributeBoolean(): PropertyDecorator {
    return function (prototype: PlainObject, key: string | symbol): PropertyDescriptor & ThisType<Any> {
        const { get: getter, set: setter }: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(prototype, key) ?? {};

        const uniqueRefKey: symbol = Symbol(`It's boolean attribute`);
        return {
            set(value: InputBoolean): void {
                this[uniqueRefKey] = coerceBoolean(value);
                setter?.call(this, this[uniqueRefKey]);
            },
            get(): boolean {
                return getter ? getter.call(this) : this[uniqueRefKey] ?? false;
            }
        };
    };
}
