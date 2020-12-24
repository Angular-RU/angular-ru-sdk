import {
    INJECTOR,
    Injector,
    ɵNG_COMP_DEF as NG_COMP_DEF,
    ɵNG_DIR_DEF as NG_DIR_REF,
    ɵNG_MOD_DEF as NG_MOD_DEF,
    ɵNG_PIPE_DEF as NG_PIPE_DEF,
    ɵNG_PROV_DEF as NG_PROV_DEF,
    ɵɵdirectiveInject as directiveInject
} from '@angular/core';
import { Any } from '@angular-ru/common/typings';

export const NG_FACTORY_DEF: string = 'ɵfac' as const;
export const PATCHER_KEY: string = 'NG_RU_PATCHER' as const;

type PatchFunction<T> = (injector: Injector, instance: T) => void;

export function useInjector<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void
): void {
    const deferWrapping: boolean = !getOwnDefinitionOfClass(constructor);
    if (deferWrapping) {
        Promise.resolve()
            .then((): void => wrapFactory(constructor, effectFunction))
            .catch(console.error);
    } else {
        wrapFactory(constructor, effectFunction);
    }
}

function wrapFactory<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void
): void {
    const definition: Any = getOwnDefinitionOfClass(constructor);
    const ngFactory: (...args: Any[]) => T = definition.factory ?? getNgFactoryOfClass(constructor);

    definition.factory = function (...args: Any[]): T {
        const instance: Any = ngFactory(...args);
        const injector: Injector = directiveInject(INJECTOR);
        const patch: PatchFunction<T> | undefined = getPatcherOfClass(constructor);
        if (patch) {
            patch(injector, instance);
        }
        return instance;
    };
    insertFactoryWrapper(constructor, definition.factory);
    insertPatcher(constructor, effectFunction);
}

function insertFactoryWrapper<T>(constructor: Any, factory: (...args: Any[]) => T): void {
    Object.defineProperty(constructor, NG_FACTORY_DEF, {
        configurable: true,
        writable: true,
        value: factory
    });
}

function insertPatcher<T>(constructor: Any, effectFunction: (injector: Injector, instance: T) => void): void {
    const previousPatcher: PatchFunction<T> | undefined = getPatcherOfClass(constructor);
    const patchSuper: PatchFunction<T> | undefined = getPatcherOfClass(Object.getPrototypeOf(constructor));

    Object.defineProperty(constructor, PATCHER_KEY, {
        configurable: true,
        writable: true,
        value(injector: Injector, instance: T): void {
            if (previousPatcher) {
                previousPatcher(injector, instance);
            } else if (patchSuper) {
                patchSuper(injector, instance);
            }
            effectFunction(injector, instance);
        }
    });
}

function getOwnDefinitionOfClass(constructor: Any): Any | undefined {
    const definedProperty: string | undefined = [
        NG_COMP_DEF,
        NG_DIR_REF,
        NG_PIPE_DEF,
        NG_PROV_DEF,
        NG_MOD_DEF
    ].find((property: string): boolean => constructor.hasOwnProperty(property));
    return definedProperty ? constructor[definedProperty] : undefined;
}

function getNgFactoryOfClass<T>(constructor: Any): ((...args: Any[]) => T) | undefined {
    if (constructor.hasOwnProperty(NG_FACTORY_DEF)) {
        return constructor[NG_FACTORY_DEF];
    } else {
        return undefined;
    }
}

function getPatcherOfClass<T>(constructor: Any): PatchFunction<T> | undefined {
    if (constructor.hasOwnProperty(PATCHER_KEY)) {
        return constructor[PATCHER_KEY];
    } else {
        return undefined;
    }
}
