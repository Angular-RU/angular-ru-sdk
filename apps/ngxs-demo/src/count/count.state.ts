import {Injectable} from '@angular/core';
import {Immutable} from '@angular-ru/cdk/typings';
import {
    Computed,
    DataAction,
    Debounce,
    Payload,
    StateRepository,
} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {State, StateToken} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CountModel} from './count-model';
import {CountSubState} from './count-sub.state';
import {ParentCountModel} from './parent-count-model';

const COUNT_TOKEN: StateToken<ParentCountModel> = new StateToken<ParentCountModel>(
    'count',
);

@StateRepository()
@State<ParentCountModel>({
    name: COUNT_TOKEN,
    defaults: {val: 0},
    children: [CountSubState],
})
@Injectable()
export class CountState extends NgxsImmutableDataRepository<ParentCountModel> {
    @Computed()
    public get values$(): Observable<ParentCountModel | undefined> {
        return this.state$.pipe(
            map(
                (state: Immutable<ParentCountModel>): CountModel | undefined =>
                    state.countSub,
            ),
        );
    }

    @DataAction()
    public increment(): void {
        this.ctx.setState(
            (state: Immutable<ParentCountModel>): Immutable<ParentCountModel> => ({
                ...state,
                val: state.val + 1,
            }),
        );
    }

    @DataAction()
    public countSubIncrement(): void {
        this.ctx.setState(
            (state: Immutable<ParentCountModel>): Immutable<ParentCountModel> => ({
                ...state,
                countSub: {val: state.countSub!.val + 1},
            }),
        );
    }

    @DataAction()
    public decrement(): void {
        this.setState(
            (state: Immutable<ParentCountModel>): Immutable<ParentCountModel> => ({
                ...state,
                val: state.val - 1,
            }),
        );
    }

    @Debounce()
    @DataAction()
    public setDebounceValue(@Payload('val') value: string | number): void {
        this.ctx.setState(
            (state: Immutable<ParentCountModel>): Immutable<ParentCountModel> => ({
                ...state,
                val: parseFloat(value as string) || 0,
            }),
        );
    }
}
