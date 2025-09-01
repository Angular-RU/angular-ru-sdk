import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {UserComponent} from './user.component';
import {UserState} from './user.state';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        providers: [provideStates([UserState])],
    },
];

export default routes;
