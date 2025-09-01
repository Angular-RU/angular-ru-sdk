import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {AmountComponent} from './amount.component';
import {AmountState} from './amount.state';
import {PriceState} from './price.state';

const routes: Routes = [
    {
        path: '',
        component: AmountComponent,
        providers: [provideStates([AmountState, PriceState])],
    },
];

export default routes;
