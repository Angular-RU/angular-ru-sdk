import {Injectable} from '@angular/core';
import {StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataRepository} from '@angular-ru/ngxs/repositories';
import {State} from '@ngxs/store';

@StateRepository()
@State({
    name: 'price',
    defaults: 10,
})
@Injectable()
export class PriceState extends NgxsDataRepository<number> {
    public setPrice(value: string): void {
        this.setState(parseFloat(value) || 0);
    }
}
