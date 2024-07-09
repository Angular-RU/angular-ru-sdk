import {PlainObjectOf, SortOrderType} from '@angular-ru/cdk/typings';

export interface SortableMessage<T> {
    definition: PlainObjectOf<SortOrderType>;
    source: T[];
}
