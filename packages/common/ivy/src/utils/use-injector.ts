import {
    INJECTOR,
    Injector,
    ɵNG_COMP_DEF as NG_COMP_DEF,
    ɵNG_DIR_DEF as NG_DIR_REF,
    ɵNG_PIPE_DEF as NG_PIPE_DEF,
    ɵNG_PROV_DEF as NG_PROV_DEF,
    ɵɵdirectiveInject as directiveInject
} from '@angular/core';
import { Any } from '@angular-ru/common/typings';

export const NG_FACTORY_DEF: string = 'ɵfac' as const;

export function useInjector<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void
): void {
    const deferWrapping: boolean = !getDefinitionOfClass(constructor);
    if (deferWrapping) {
        Promise.resolve().then((): void => wrapFactory(constructor, effectFunction));
    } else {
        wrapFactory(constructor, effectFunction);
    }
}

function wrapFactory<T>(
    constructor: typeof Object.constructor,
    effectFunction: (injector: Injector, instance: T) => void
): void {
    const definition: Any = getDefinitionOfClass(constructor);
    const factory: (...args: Any[]) => T = definition.factory || getFactoryOfClass(constructor);
    definition.factory = function (...args: Any[]): T {
        const instance: Any = factory(...args);
        const injector: Injector = directiveInject(INJECTOR);
        effectFunction(injector, instance);
        return instance;
    };
}

function getDefinitionOfClass(constructor: Any): Any | undefined {
    return constructor[NG_COMP_DEF] ?? constructor[NG_DIR_REF] ?? constructor[NG_PIPE_DEF] ?? constructor[NG_PROV_DEF];
}

function getFactoryOfClass<T>(constructor: Any): (...args: Any[]) => T | undefined {
    return constructor[NG_FACTORY_DEF];
}
