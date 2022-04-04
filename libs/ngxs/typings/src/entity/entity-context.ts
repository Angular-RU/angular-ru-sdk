import { EntityCollections, EntityPatchValue, EntityStateValue } from '@angular-ru/cdk/entity';
import { ActionType } from '@ngxs/store';
import { Observable } from 'rxjs';

export interface EntityContext<V, K extends string | number, C = Record<string, any>> {
    getState(): EntityCollections<V, K, C>;

    setState(value: EntityStateValue<EntityCollections<V, K, C>>): void;

    patchState(value: EntityPatchValue<EntityCollections<V, K, C>>): void;

    dispatch(actions: ActionType | ActionType[]): Observable<void>;
}
