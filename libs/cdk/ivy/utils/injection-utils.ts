/* eslint-disable no-redeclare */
import {
    AbstractType,
    InjectFlags,
    InjectionToken,
    ɵɵdirectiveInject as ivyDirectiveInject,
    ɵɵinject as ivyInject,
    Type,
} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';

function wrapperForInject<T>(
    wrap: Fn,
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags?: InjectFlags,
): Nullable<T> {
    if (InjectFlags.Optional) {
        try {
            return wrap(token, flags!);
        } catch {
            return null;
        }
    } else {
        return flags ? wrap(token, flags) : wrap(token);
    }
}

/**
 * @description `directiveInject`
 */
export function directiveInject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
): T;
export function directiveInject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags: InjectFlags,
): Nullable<T>;

export function directiveInject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags?: InjectFlags,
): Nullable<T> {
    return wrapperForInject(ivyDirectiveInject, token, flags);
}

/**
 * @description `inject`
 */
export function inject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>): T;
export function inject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags: InjectFlags,
): Nullable<T>;

export function inject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags?: InjectFlags,
): Nullable<T> {
    return wrapperForInject(ivyInject, token, flags);
}
