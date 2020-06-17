import { Any, Fn, ObjectKeyMap } from '../interfaces/logger.internal';

const { defineProperty, getOwnPropertyDescriptor, getOwnPropertyNames, getOwnPropertySymbols }: ObjectKeyMap = Object;

function bind(fn: Fn, context: Any): Fn {
    return fn.bind(context);
}

function getOwnKeys(descriptors: ObjectKeyMap): string[] {
    return getOwnPropertyNames(descriptors).concat(getOwnPropertySymbols(descriptors));
}

function autoBindClass(target: ObjectKeyMap): Any {
    const descriptors: ObjectKeyMap = getOwnPropertyDescriptors(target.prototype);
    const keys: string[] = getOwnKeys(descriptors);

    for (let i: number = 0, l: number = keys.length; i < l; i++) {
        const key: string = keys[i];
        const descriptor: Any = descriptors[key];

        if (typeof descriptor.value !== 'function' || key === 'constructor') {
            continue;
        }

        defineProperty(target.prototype, key, autoBindMethod(target.prototype, key, descriptor));
    }
}

function getOwnPropertyDescriptors(target: ObjectKeyMap): ObjectKeyMap {
    const descriptors: ObjectKeyMap = {};

    getOwnKeys(target).forEach((key: string): void => {
        descriptors[key] = getOwnPropertyDescriptor(target, key);
    });

    return descriptors;
}

// eslint-disable-next-line max-lines-per-function
function autoBindMethod(
    target: ObjectKeyMap,
    key: string,
    { value: fn, configurable, enumerable }: Any
): PropertyDescriptor {
    return {
        configurable,
        enumerable,

        get(): Fn {
            if (this === target) {
                return fn;
            }

            const boundFn: Fn = bind(fn, this);

            defineProperty(this, key, {
                configurable: true,
                writable: true,

                enumerable: false,
                value: boundFn
            });

            return boundFn;
        },
        set: createDefaultSetter(key)
    };
}

function handle(args: Any[]): Any {
    if (args.length === 1) {
        return autoBindClass(args[0]);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return autoBindMethod(...args);
    }
}

export function autoBind(...args: Any[]): Any {
    if (args.length === 0) {
        return function (...argsClass: Any[]): Fn {
            return handle(argsClass);
        };
    } else {
        return handle(args);
    }
}

function createDefaultSetter(key: Any): Fn {
    return function set(this: Any, newValue: unknown): unknown {
        Object.defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
        });

        return newValue;
    };
}
