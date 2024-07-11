import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NgxsModule} from '@ngxs/store';

import {AmountComponent} from './amount.component';
import {AmountState} from './amount.state';
import {PriceState} from './price.state';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxsModule.forFeature([AmountState, PriceState]),
        RouterModule.forChild([{path: '', component: AmountComponent}]),
    ],
    declarations: [AmountComponent],
})
export class AmountModule {}
