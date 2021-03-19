import { PlainObjectOf, SortOrderType } from '@angular-ru/common/typings';

export interface SortableMessage<T> {
    definition: PlainObjectOf<SortOrderType>;
    source: T[];
}
