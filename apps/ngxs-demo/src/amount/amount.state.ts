import {inject, Injectable} from '@angular/core';
import {Computed, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {State} from '@ngxs/store';

import {PriceState} from './price.state';

@StateRepository()
@State({
    name: 'amount',
    defaults: 20,
})
@Injectable()
export class AmountState extends NgxsDataRepository<number> {
    private readonly price = inject(PriceState);

    @Computed()
    public get sum(): number {
        return this.snapshot + this.price.snapshot;
    }

    public setAmount(value: string): void {
        this.setState(parseFloat(value) || 0);
    }
}
