/* eslint-disable no-redeclare */
import {AbstractType, InjectionToken, Type} from '@angular/core';
import {
    InjectFlags,
    ɵɵdirectiveInject as ivyDirectiveInject,
    ɵɵinject as ivyInject,
} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';

function wrapperForInject<T>(
    wrap: Fn,
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
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
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
): T;
export function directiveInject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    flags: InjectFlags,
): Nullable<T>;

export function directiveInject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    flags?: InjectFlags,
): Nullable<T> {
    return wrapperForInject(ivyDirectiveInject, token, flags);
}

/**
 * @description `inject`
 */
export function inject<T>(token: AbstractType<T> | InjectionToken<T> | Type<T>): T;
export function inject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    flags: InjectFlags,
): Nullable<T>;

export function inject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    flags?: InjectFlags,
): Nullable<T> {
    return wrapperForInject(ivyInject, token, flags);
}
