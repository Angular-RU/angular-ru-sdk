import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {TodoComponent} from './todo.component';
import {TodoState} from './todo.state';

const routes: Routes = [
    {
        path: '',
        component: TodoComponent,
        providers: [provideStates([TodoState])],
    },
];

export default routes;
