import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {PersonComponent} from './person.component';
import {personResolver} from './person.resolver';
import {PersonState} from './person.state';

const routes: Routes = [
    {
        path: '',
        component: PersonComponent,
        providers: [provideStates([PersonState])],
        resolve: {content: personResolver},
    },
];

export default routes;
