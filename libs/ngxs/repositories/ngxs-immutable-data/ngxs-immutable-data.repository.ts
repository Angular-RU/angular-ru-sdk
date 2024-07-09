import {Injectable} from '@angular/core';
import {Immutable} from '@angular-ru/cdk/typings';
import {Computed, DataAction, Payload} from '@angular-ru/ngxs/decorators';
import {ensureDataStateContext, ensureSnapshot} from '@angular-ru/ngxs/internals';
import {
    ImmutableDataRepository,
    ImmutablePatchValue,
    ImmutableStateContext,
    ImmutableStateValue,
} from '@angular-ru/ngxs/typings';
import {ActionType} from '@ngxs/store';
import {Observable} from 'rxjs';

import {AbstractRepository} from '../common/abstract-repository';

@Injectable()
export abstract class AbstractNgxsImmutableDataRepository<T>
    extends AbstractRepository<Immutable<T>>
    implements ImmutableStateContext<T>, ImmutableDataRepository<T>
{
    private readonly context!: ImmutableStateContext<T>;

    @Computed()
    public get snapshot(): Immutable<T> {
        return ensureSnapshot(this.getState());
    }

    protected get ctx(): ImmutableStateContext<T> {
        return ensureDataStateContext<T, any>(this.context);
    }

    @DataAction()
    public patchState(@Payload('patchValue') value: ImmutablePatchValue<T>): void {
        this.ctx.patchState(value);
    }

    @DataAction()
    public setState(@Payload('stateValue') stateValue: ImmutableStateValue<T>): void {
        this.ctx.setState(stateValue);
    }

    @DataAction()
    public reset(): void {
        this.ctx.setState(this.initialState);
        this.markAsDirtyAfterReset();
    }

    public getState(): Immutable<T> {
        return this.ctx.getState();
    }

    public dispatch(actions: ActionType | ActionType[]): Observable<void> {
        return this.ctx.dispatch(actions);
    }
}
