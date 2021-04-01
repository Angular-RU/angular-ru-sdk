/* eslint-disable no-redeclare */
import {
    AbstractType,
    InjectFlags,
    InjectionToken,
    ɵɵdirectiveInject as ivyDirectiveInject,
    ɵɵinject as ivyInject,
    Type
} from '@angular/core';
import { Fn } from '@angular-ru/common/typings';

function wrapperForInject<T>(
    wrap: Fn,
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags?: InjectFlags
): T | null {
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
export function directiveInject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>): T;
export function directiveInject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>, flags: InjectFlags): T | null;
export function directiveInject<T>(
    token: Type<T> | AbstractType<T> | InjectionToken<T>,
    flags?: InjectFlags
): T | null {
    return wrapperForInject(ivyDirectiveInject, token, flags);
}

/**
 * @description `inject`
 */
export function inject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>): T;
export function inject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>, flags: InjectFlags): T | null;
export function inject<T>(token: Type<T> | AbstractType<T> | InjectionToken<T>, flags?: InjectFlags): T | null {
    return wrapperForInject(ivyInject, token, flags);
}
