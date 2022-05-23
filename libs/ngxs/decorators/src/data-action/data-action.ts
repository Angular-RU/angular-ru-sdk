import { InjectFlags } from '@angular/core';
import { $args } from '@angular-ru/cdk/function';
import { Descriptor, PlainObjectOf } from '@angular-ru/cdk/typings';
import { isNil, isNotNil, isTrue } from '@angular-ru/cdk/utils';
import { NGXS_DATA_CONFIG, NgxsDataConfig } from '@angular-ru/ngxs';
import {
    actionNameCreator,
    combineStream,
    getMethodArgsRegistry,
    MethodArgsRegistry,
    NgxsDataFactory,
    NgxsDataInjector,
    validateAction
} from '@angular-ru/ngxs/internals';
import { NgxsDataStoragePlugin } from '@angular-ru/ngxs/storage';
import {
    ActionEvent,
    DataStateClass,
    DispatchedResult,
    ImmutableDataRepository,
    NgxsDataOperation,
    NgxsRepositoryMeta,
    RepositoryActionOptions
} from '@angular-ru/ngxs/typings';
import { MappedStore, MetaDataModel } from '@ngxs/store/src/internal/internals';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { REPOSITORY_ACTION_OPTIONS } from './data-action.config';

// eslint-disable-next-line max-lines-per-function,sonarjs/cognitive-complexity
export function DataAction(options: RepositoryActionOptions = {}): MethodDecorator {
    const config: RepositoryActionOptions = mergeConfig(options);

    // eslint-disable-next-line max-lines-per-function,sonarjs/cognitive-complexity
    return (target: any, name: string | symbol, descriptor: Descriptor): Descriptor => {
        validateAction(target, descriptor);

        const originalMethod: any = descriptor.value;
        const key: string = name.toString();

        // eslint-disable-next-line max-lines-per-function
        descriptor.value = function (...args: any[]): DispatchedResult {
            const instance: ImmutableDataRepository<any> = this as any as ImmutableDataRepository<any>;

            let result: DispatchedResult = null;
            const repository: NgxsRepositoryMeta = NgxsDataFactory.getRepositoryByInstance(instance);
            const operations: PlainObjectOf<NgxsDataOperation> = repository.operations!;
            let operation: NgxsDataOperation | undefined = operations[key];
            const stateMeta: MetaDataModel = repository.stateMeta!;
            const registry: MethodArgsRegistry | undefined = getMethodArgsRegistry(originalMethod);

            if (isNil(operation)) {
                // Note: late init operation when first invoke action method
                const argumentsNames: string[] = $args(originalMethod);
                const type: string = actionNameCreator({
                    statePath: stateMeta.path!,
                    methodName: key,
                    argumentsNames,
                    argumentRegistry: registry
                });

                operation = operations[key] = {
                    type,
                    options: { cancelUncompleted: config.cancelUncompleted ?? false }
                };

                if (isNotNil(operation)) {
                    stateMeta.actions[operation.type] = [
                        { type: operation.type, options: operation.options, fn: operation.type }
                    ];
                }
            }

            const mapped: MappedStore = NgxsDataFactory.ensureMappedState(stateMeta)!;
            const stateInstance: DataStateClass = mapped.instance;

            // Note: invoke only after store.dispatch(...)
            (stateInstance as any)[operation.type] = (): any => {
                if (isTrue(config.insideZone)) {
                    NgxsDataInjector.ngZone?.run((): void => {
                        result = originalMethod.apply(instance, args);
                    });
                } else {
                    result = originalMethod.apply(instance, args);
                }

                // Note: store.dispatch automatically subscribes, but we don't need it
                // We want to subscribe ourselves manually, but this behavior can be changed by config
                return isObservable(result) && isTrue(config.subscribeRequired)
                    ? of(null).pipe(map((): any => result))
                    : result;
            };

            const event: ActionEvent = NgxsDataFactory.createAction(operation, args, registry);
            const dispatcher$: Observable<any> = NgxsDataInjector.store!.dispatch(event);

            if (isObservable(result)) {
                return combineStream(dispatcher$, result);
            } else {
                return result;
            }
        };

        return descriptor;
    };
}

function mergeConfig(options: RepositoryActionOptions): RepositoryActionOptions {
    const globalConfig: NgxsDataConfig | undefined = NgxsDataStoragePlugin?.injector?.get(
        NGXS_DATA_CONFIG,
        undefined,
        InjectFlags.Optional
    );
    const mergedOptions: RepositoryActionOptions = { ...REPOSITORY_ACTION_OPTIONS };

    if (isNotNil(globalConfig) && globalConfig.dataActionSubscribeRequired !== undefined) {
        mergedOptions.subscribeRequired = globalConfig.dataActionSubscribeRequired;
    }

    return { ...mergedOptions, ...options };
}
