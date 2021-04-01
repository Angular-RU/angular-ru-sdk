import { PlainObject } from '@angular-ru/common/typings';

export function AttributeBoolean(): PropertyDecorator {
    return function (prototype: PlainObject, key: string | symbol): void {
        const shadow: symbol = Symbol();
        Object.defineProperty(prototype, key, {
            get(): boolean {
                return this[shadow] ?? false;
            },
            set(value: string | boolean | null | undefined): void {
                this[shadow] = !!value || value === '';
            }
        });
    };
}
