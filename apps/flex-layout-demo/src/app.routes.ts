import type {Routes} from '@angular/router';

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
            },
            {
                path: 'first',
                loadComponent: async () =>
                    import('./samples/sample-first/sample-first.component'),
            },
        ],
    },
];
