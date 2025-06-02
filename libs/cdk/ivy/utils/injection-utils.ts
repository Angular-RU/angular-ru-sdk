/* eslint-disable no-redeclare */
import {AbstractType, InjectionToken, InjectOptions, Type} from '@angular/core';
import {
    ɵɵdirectiveInject as ivyDirectiveInject,
    ɵɵinject as ivyInject,
} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';

function wrapperForInject<T>(
    wrap: Fn,
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    options?: InjectOptions,
): Nullable<T> {
    if (options?.optional) {
        try {
            return wrap(token, options);
        } catch {
            return null;
        }
    } else {
        return options ? wrap(token, options) : wrap(token);
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
    options: InjectOptions,
): Nullable<T>;

export function directiveInject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    options?: InjectOptions,
): Nullable<T> {
    return wrapperForInject(ivyDirectiveInject, token, options);
}

/**
 * @description `inject`
 */
export function inject<T>(token: AbstractType<T> | InjectionToken<T> | Type<T>): T;
export function inject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    options: InjectOptions,
): Nullable<T>;

export function inject<T>(
    token: AbstractType<T> | InjectionToken<T> | Type<T>,
    options?: InjectOptions,
): Nullable<T> {
    return wrapperForInject(ivyInject, token, options);
}
