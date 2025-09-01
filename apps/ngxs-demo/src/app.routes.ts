import type {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'count',
        pathMatch: 'full',
    },
    {
        path: 'count',
        loadChildren: async () => import('./count/count.routes'),
    },
    {
        path: 'todo',
        loadChildren: async () => import('./todo/todo.routes'),
    },
    {
        path: 'person',
        loadChildren: async () => import('./person/person.routes'),
    },
    {
        path: 'user',
        loadChildren: async () => import('./user/user.routes'),
    },
    {
        path: 'amount',
        loadChildren: async () => import('./amount/amount.routes'),
    },
    {
        path: 'article',
        loadChildren: async () => import('./article/article.routes'),
    },
];
