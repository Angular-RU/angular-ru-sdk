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
            {
                path: 'first-second',
                loadComponent: async () =>
                    import('./samples/sample-first-second/sample-first-second.component'),
            },
            {
                path: 'second',
                loadComponent: async () =>
                    import('./samples/sample-second/sample-second.component'),
            },
            {
                path: 'third',
                loadComponent: async () =>
                    import('./samples/sample-third/sample-third.component'),
            },
            {
                path: 'fourth',
                loadComponent: async () =>
                    import('./samples/sample-fourth/sample-fourth.component'),
            },
            {
                path: 'five',
                loadComponent: async () =>
                    import('./samples/sample-five/sample-five.component'),
            },
            {
                path: 'six',
                loadComponent: async () =>
                    import('./samples/sample-six/sample-six.component'),
            },
            {
                path: 'seven',
                loadComponent: async () =>
                    import('./samples/sample-seven/sample-seven.component'),
            },
            {
                path: 'eight',
                loadComponent: async () =>
                    import('./samples/sample-eight/sample-eight.component'),
            },
            {
                path: 'night',
                loadComponent: async () =>
                    import('./samples/sample-night/sample-night.component'),
            },
            {
                path: 'eleven',
                loadComponent: async () =>
                    import('./samples/sample-eleven/sample-eleven.component'),
            },
            {
                path: 'twelve',
                loadComponent: async () =>
                    import('./samples/sample-twelve/sample-twelve.component'),
            },
            {
                path: 'thirteen',
                loadComponent: async () =>
                    import('./samples/sample-thirteen/sample-thirteen.component'),
            },
            {
                path: 'fourteen',
                loadComponent: async () =>
                    import('./samples/sample-fourteen/sample-fourteen.component'),
            },
            {
                path: 'fifteen',
                loadComponent: async () =>
                    import('./samples/sample-fifteen/sample-fifteen.component'),
            },
            {
                path: 'sixteen',
                loadComponent: async () =>
                    import('./samples/sample-sixteen/sample-sixteen.component'),
            },
            {
                path: 'seventeen',
                loadComponent: async () =>
                    import('./samples/sample-seventeen/sample-seventeen.component'),
            },
            {
                path: 'eighteen',
                loadComponent: async () =>
                    import('./samples/sample-eighteen/sample-eighteen.component'),
            },
        ],
    },
];
