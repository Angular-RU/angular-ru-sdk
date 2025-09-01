import type {Routes} from '@angular/router';
import {provideInputFilter} from '@angular-ru/cdk/directives';

import {REG_EXP_ONLY_NUMBERS} from './samples/guide/properties/constants';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'samples',
    },
    {
        path: 'samples',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'guide',
            },
            {
                path: 'guide',
                loadComponent: async () => import('./samples/guide/guide.component'),
                providers: [
                    provideInputFilter({
                        default: REG_EXP_ONLY_NUMBERS,
                    }),
                ],
            },
        ],
    },
];
