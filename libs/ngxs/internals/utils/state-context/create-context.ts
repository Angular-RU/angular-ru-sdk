import {DataStateClass, MappedStore, NgxsRepositoryMeta} from '@angular-ru/ngxs/typings';
import {StateContext} from '@ngxs/store';

import {NgxsDataFactory} from '../../services/ngxs-data-factory.service';
import {getRepository} from '../repository/get-repository';

export function createContext(stateClass: DataStateClass): PropertyDescriptor {
    return {
        enumerable: true,
        configurable: true,
        get(): StateContext<any> {
            const meta: NgxsRepositoryMeta = getRepository(stateClass);
            const mappedMeta: MappedStore = NgxsDataFactory.ensureMappedState(
                meta.stateMeta,
            )!;

            return NgxsDataFactory.createStateContext(mappedMeta.path);
        },
    };
}
