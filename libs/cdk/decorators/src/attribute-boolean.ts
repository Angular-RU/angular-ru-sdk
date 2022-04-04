import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { InputBoolean, Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

export function AttributeBoolean(): PropertyDecorator {
    return function (prototype: PlainObject, key: string | symbol): PropertyDescriptor & ThisType<any> {
        const descriptor: Nullable<PropertyDescriptor> = Object.getOwnPropertyDescriptor(prototype, key);

        const uniqueRefKey: symbol = Symbol(`It's boolean attribute`);

        return {
            set(value: InputBoolean): void {
                this[uniqueRefKey] = coerceBoolean(value);
                descriptor?.set?.call(this, this[uniqueRefKey]);
            },
            get(): boolean {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                return isNotNil(descriptor?.get) ? descriptor?.get.call(this) : this[uniqueRefKey] ?? false;
            }
        };
    };
}
