import {Fn} from '@angular-ru/cdk/typings';

export function validateMethod(
    target: Fn,
    descriptor: TypedPropertyDescriptor<any>,
): void {
    const isStaticMethod: boolean = target.hasOwnProperty('prototype');

    if (isStaticMethod) {
        throw new Error(`Cannot support static methods with current decorator`);
    }

    if (descriptor === undefined) {
        throw new Error(`Current decorator can only decorate a method implementation`);
    }
}
