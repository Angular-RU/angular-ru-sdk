import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {CountComponent} from './count.component';
import {CountState} from './count.state';
import {CountSubState} from './count-sub.state';

const routes: Routes = [
    {
        path: '',
        component: CountComponent,
        providers: [provideStates([CountState, CountSubState])],
    },
];

export default routes;
