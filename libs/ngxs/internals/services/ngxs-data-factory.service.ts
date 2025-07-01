import {Injectable, Type} from '@angular/core';
import {PlainObjectOf} from '@angular-ru/cdk/typings';
import {isNil, isNotNil} from '@angular-ru/cdk/utils';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {
    ActionEvent,
    DataStateClass,
    MappedState,
    MappedStore,
    NgxsRepositoryMeta,
} from '@angular-ru/ngxs/typings';
import {StateContext} from '@ngxs/store';

import {dynamicActionByType} from '../utils/action/dynamic-action';
import {MethodArgsRegistry} from '../utils/method-args-registry/method-args-registry';
import {getRepository} from '../utils/repository/get-repository';
import {NgxsDataInjector} from './ngxs-data-injector.service';

@Injectable()
export class NgxsDataFactory {
    private static readonly statesCachedMeta = new Map<string, MappedStore>();

    constructor() {
        NgxsDataFactory.statesCachedMeta.clear();
    }

    public static createStateContext<T>(path: string): StateContext<T> {
        return NgxsDataInjector.context.createStateContext(path);
    }

    public static ensureMappedState(stateMeta: any | undefined): MappedState | never {
        if (isNil(NgxsDataInjector.factory) || isNil(stateMeta)) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_MODULE_EXCEPTION);
        }

        const cachedMeta: MappedStore | null =
            (isNotNil(stateMeta.name)
                ? NgxsDataFactory.statesCachedMeta.get(stateMeta.name)
                : null) || null;

        if (!cachedMeta) {
            return NgxsDataFactory.ensureMeta(stateMeta);
        }

        return cachedMeta;
    }

    public static getRepositoryByInstance(
        target: DataStateClass | any,
    ): NgxsRepositoryMeta | never {
        const stateClass: DataStateClass =
            NgxsDataFactory.getStateClassByInstance(target);
        const repository: NgxsRepositoryMeta | null = getRepository(stateClass) ?? null;

        if (isNil(repository)) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_DECORATOR);
        }

        return repository;
    }

    public static getStateClassByInstance(target: DataStateClass | any): DataStateClass {
        return target?.constructor;
    }

    public static clearMetaByInstance(target: DataStateClass | any): void {
        const repository: NgxsRepositoryMeta =
            NgxsDataFactory.getRepositoryByInstance(target);

        repository.stateMeta!.actions = {};
        repository.operations = {};
    }

    public static createPayload(
        args: any[],
        registry?: MethodArgsRegistry,
    ): PlainObjectOf<any> | null {
        const payload: PlainObjectOf<any> = {};
        const arrayArgs: any[] = Array.from(args);

        for (const [index, arrayArg] of arrayArgs.entries()) {
            const payloadName: string | null | undefined =
                registry?.getPayloadTypeByIndex(index);

            if (isNotNil(payloadName)) {
                payload[payloadName] = arrayArg;
            }
        }

        return Object.keys(payload).length > 0 ? payload : null;
    }

    public static createAction(
        type: string,
        args: any[],
        registry?: MethodArgsRegistry,
    ): ActionEvent {
        const payload: PlainObjectOf<any> | null = NgxsDataFactory.createPayload(
            args,
            registry,
        );
        const dynamicActionByTypeFactory: Type<any> = dynamicActionByType(type);

        return new dynamicActionByTypeFactory(payload);
    }

    private static ensureMeta(stateMeta: any): MappedStore | null | undefined {
        const meta: MappedState = isNotNil(stateMeta.name)
            ? NgxsDataInjector.factory!._states?.find(
                  (state: MappedStore): boolean => state.name === stateMeta.name,
              )
            : null;

        if (isNotNil(meta) && isNotNil(stateMeta.name)) {
            NgxsDataFactory.statesCachedMeta.set(stateMeta.name, meta);
        }

        return meta;
    }
}
