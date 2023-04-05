import { Computed, DataAction, Payload } from '@angular-ru/ngxs/decorators';
import { ensureDataStateContext, ensureSnapshot } from '@angular-ru/ngxs/internals';
import { DataRepository, DataStateContext, PatchValue } from '@angular-ru/ngxs/typings';
import { Injectable } from '@angular/core';
import { ActionType, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AbstractRepository } from '../common/abstract-repository';

@Injectable()
export abstract class AbstractNgxsDataRepository<T>
    extends AbstractRepository<T>
    implements DataStateContext<T>, DataRepository<T>
{
    private readonly context!: DataStateContext<T>;

    @Computed()
    public get snapshot(): T {
        return ensureSnapshot(this.getState());
    }

    protected get ctx(): DataStateContext<T> {
        return ensureDataStateContext<T, StateContext<T>>(this.context as StateContext<T>);
    }

    @DataAction()
    public patchState(@Payload('patchValue') value: PatchValue<T>): void {
        this.ctx.patchState(value);
    }

    @DataAction()
    public setState(@Payload('stateValue') stateValue: T): void {
        this.ctx.setState(stateValue);
    }

    @DataAction()
    public reset(): void {
        this.ctx.setState(this.initialState);
        this.markAsDirtyAfterReset();
    }

    public getState(): T {
        return this.ctx.getState();
    }

    public dispatch(actions: ActionType | ActionType[]): Observable<void> {
        return this.ctx.dispatch(actions);
    }
}
