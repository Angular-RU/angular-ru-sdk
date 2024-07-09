import {deepClone, isSimpleObject} from '@angular-ru/cdk/object';
import {PlainObject} from '@angular-ru/cdk/typings';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';
import {NGXS_DATA_EXCEPTIONS} from '@angular-ru/ngxs/tokens';
import {DataStateClass} from '@angular-ru/ngxs/typings';

import {InvalidChildrenException} from '../../exceptions/invalid-children.exception';
import {getStoreOptions} from '../state-context/get-store-options';

export function buildDefaultsGraph(stateClasses: DataStateClass): any {
    const options: any = getStoreOptions(stateClasses);
    const children: DataStateClass[] = options.children ?? [];
    const prepared: any = options.defaults === undefined ? {} : options.defaults;
    const currentDefaults: any = deepClone(prepared);

    if (children.length > 0) {
        if (isSimpleObject(currentDefaults)) {
            return buildChildrenGraph(currentDefaults, children);
        } else {
            throw new InvalidChildrenException(currentDefaults);
        }
    } else {
        return currentDefaults;
    }
}

function buildChildrenGraph(currentDefaults: any, children: DataStateClass[]): any {
    return children.reduce((defaults: PlainObject, item: DataStateClass): PlainObject => {
        const childrenOptions: any = getStoreOptions(item);

        if (checkValueIsEmpty(childrenOptions.name)) {
            throw new Error(NGXS_DATA_EXCEPTIONS.NGXS_DATA_STATE_NAME_NOT_FOUND);
        }

        const name: string = childrenOptions.name.toString();

        defaults[name] = buildDefaultsGraph(item);

        return defaults;
    }, currentDefaults ?? {});
}
