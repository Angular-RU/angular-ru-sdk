import {Injectable} from '@angular/core';
import {
    DataAction,
    Debounce,
    Named,
    Payload,
    Persistence,
    StateRepository,
} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {State} from '@ngxs/store';

import {CountModel} from './count-model';

@Persistence({
    path: 'count.countSub.val',
    existingEngine: sessionStorage,
})
@StateRepository()
@State<CountModel>({
    name: 'countSub',
    defaults: {val: 100},
})
@Injectable()
export class CountSubState extends NgxsImmutableDataRepository<CountModel> {
    @Debounce()
    @DataAction()
    public setDebounceSubValue(
        @Payload('value') @Named('val') value: number | string,
    ): void {
        this.ctx.setState({val: parseFloat(value as string) || 0});
    }
}
