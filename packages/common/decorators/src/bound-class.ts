import { Any, Fn, Nullable } from '@angular-ru/common/typings';

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,max-lines-per-function
function boundMethod(target: Any, key: Any, descriptor: Any) {
    let fn: Fn = descriptor.value;

    if (typeof fn !== 'function') {
        throw new TypeError(`@boundMethod decorator can only be applied to methods not: ${typeof fn}`);
    }

    // In IE11 calling Object.defineProperty has a side-effect of evaluating the
    // getter for the property which is being replaced. This causes infinite
    // recursion and an "Out of stack space" error.
    let definingProperty: boolean = false;

    return {
        configurable: true,
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        get() {
            // eslint-disable-next-line no-prototype-builtins
            if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
                return fn;
            }

            const boundFn: Fn = fn.bind(this);
            definingProperty = true;
            Object.defineProperty(this, key, {
                configurable: true,
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                get() {
                    return boundFn;
                },

                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                set(value: Any) {
                    fn = value;
                    delete this[key];
                }
            });
            definingProperty = false;
            return boundFn;
        },

        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        set(value: Any) {
            fn = value;
        }
    };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type,max-lines-per-function
export function BoundClass(target: Any) {
    // (Using reflect to get all keys including symbols)
    let keys: Any[];
    // Use Reflect if exists
    if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
        keys = Reflect.ownKeys(target.prototype);
    } else {
        keys = Object.getOwnPropertyNames(target.prototype);
        // Use symbols if support is provided
        if (typeof Object.getOwnPropertySymbols === 'function') {
            keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
        }
    }

    keys.forEach((key: Any): void => {
        // Ignore special case target method
        if (key === 'constructor') {
            return;
        }

        const descriptor: Nullable<PropertyDescriptor> = Object.getOwnPropertyDescriptor(target.prototype, key);

        // Only methods need binding
        if (typeof descriptor?.value === 'function') {
            Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
        }
    });

    return target;
}
