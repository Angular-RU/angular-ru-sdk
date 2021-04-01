import { Any, PlainObject } from '@angular-ru/common/typings';

export function AttributeBoolean(): PropertyDecorator {
    return function (prototype: PlainObject, key: string | symbol): PropertyDescriptor & ThisType<Any> {
        const { get: getter, set: setter }: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(prototype, key) ?? {};
        const uniqueRefKey: symbol = Symbol();
        return {
            set(value: string | boolean | null | undefined): void {
                this[uniqueRefKey] = (!!value && value !== 'false') || value === '';
                setter?.call(this, this[uniqueRefKey]);
            },
            get(): boolean | string {
                return getter ? getter.call(this) : this[uniqueRefKey] ?? false;
            }
        };
    };
}
