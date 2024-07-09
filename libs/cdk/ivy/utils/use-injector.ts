import {
    INJECTOR,
    Injector,
    ɵNG_COMP_DEF as NG_COMP_DEF,
    ɵNG_DIR_DEF as NG_DIR_REF,
    ɵNG_INJ_DEF as NG_INJ_DEF,
    ɵNG_PIPE_DEF as NG_PIPE_DEF,
    ɵNG_PROV_DEF as NG_PROV_DEF,
    ɵɵdirectiveInject as directiveInject,
} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNil, isNotNil, isTrue} from '@angular-ru/cdk/utils';

// eslint-disable-next-line spellcheck/spell-checker
export const NG_FACTORY_DEF: string = 'ɵfac' as const;
export const PATCHER_KEY: string = 'NG_RU_PATCHER' as const;

type PatchFunction<T> = (injector: Injector, instance: T) => void;

export function useInjector<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void,
): void {
    const deferWrapping: boolean = isNil(getOwnDefinitionOfClass(constructor));

    if (deferWrapping) {
        Promise.resolve()
            .then((): void => wrapFactory(constructor, effectFunction))
            .catch((error: Error): void => console.error(error));
    } else {
        wrapFactory(constructor, effectFunction);
    }
}

function wrapFactory<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void,
): void {
    const definition: Nullable<any> = getOwnDefinitionOfClass(constructor);

    if (isNil(definition)) {
        throw new Error('Class with useInjector in decorator must be Injectable');
    }

    const ngFactoryNotWrapped: Nullable<PatchFunction<unknown>> =
        getPatcherOfClass(constructor);

    if (isNil(ngFactoryNotWrapped)) {
        definition.factory = generateFactoryWrapper(constructor, definition);
        insertFactoryWrapper(constructor, definition.factory);
    }

    insertPatcher(constructor, effectFunction);
}

function generateFactoryWrapper<T>(
    constructor: any,
    definition: any,
): (...args: any[]) => T {
    const ngFactory: (...args: any[]) => T =
        definition.factory ?? getNgFactoryOfClass(constructor);

    return function (...args: any[]): T {
        const instance: any = ngFactory(...args);
        const patch: Nullable<PatchFunction<T>> = getPatcherOfClass(constructor);

        if (isNotNil(patch)) {
            const injector: Injector = directiveInject(INJECTOR);

            patch(injector, instance);
        }

        return instance;
    };
}

function insertFactoryWrapper<T>(constructor: any, factory: (...args: any[]) => T): void {
    Object.defineProperty(constructor, NG_FACTORY_DEF, {
        configurable: true,
        writable: true,
        value: factory,
    });
}

function insertPatcher<T>(
    constructor: any,
    effectFunction: (injector: Injector, instance: T) => void,
): void {
    const previousPatcher: Nullable<PatchFunction<T>> = getPatcherOfClass(constructor);

    /**
     * Note: don't use hasOwnProperty,
     * because we need find reference on PATCHER_KEY in prototypes chain
     */
    const patchSuper: Nullable<PatchFunction<T>> = constructor[PATCHER_KEY];

    Object.defineProperty(constructor, PATCHER_KEY, {
        configurable: true,
        writable: true,
        value(injector: Injector, instance: T): void {
            if (isNotNil(previousPatcher)) {
                previousPatcher(injector, instance);
            } else if (isNotNil(patchSuper)) {
                patchSuper(injector, instance);
            }

            effectFunction(injector, instance);
        },
    });
}

function getOwnDefinitionOfClass(constructor: any): Nullable<any> {
    const definedProperty: Nullable<string> = [
        NG_COMP_DEF, // for component
        NG_DIR_REF, //  for directive
        NG_PIPE_DEF, // for pipe
        NG_PROV_DEF, // for service
        NG_INJ_DEF, //   for module
    ].find((property: string): boolean => constructor.hasOwnProperty(property));

    return isString(definedProperty) ? constructor[definedProperty] : undefined;
}

function getNgFactoryOfClass<T>(constructor: any): Nullable<(...args: any[]) => T> {
    if (isTrue(constructor?.hasOwnProperty(NG_FACTORY_DEF))) {
        return constructor[NG_FACTORY_DEF];
    } else {
        return undefined;
    }
}

function getPatcherOfClass<T>(constructor: any): Nullable<PatchFunction<T>> {
    if (isTrue(constructor?.hasOwnProperty(PATCHER_KEY))) {
        return constructor[PATCHER_KEY];
    } else {
        return undefined;
    }
}
