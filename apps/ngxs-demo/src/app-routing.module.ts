/* eslint-disable @typescript-eslint/typedef,@typescript-eslint/explicit-function-return-type */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'count',
                    pathMatch: 'full',
                },
                {
                    path: 'count',
                    loadChildren: async () =>
                        import('./count/count.module').then((m) => m.CountModule),
                },
                {
                    path: 'todo',
                    loadChildren: async () =>
                        import('./todo/todo.module').then((m) => m.TodoModule),
                },
                {
                    path: 'person',
                    loadChildren: async () =>
                        import('./person/person.module').then((m) => m.PersonModule),
                },
                {
                    path: 'user',
                    loadChildren: async () =>
                        import('./user/user.module').then((m) => m.UserModule),
                },
                {
                    path: 'amount',
                    loadChildren: async () =>
                        import('./amount/amount.module').then((m) => m.AmountModule),
                },
                {
                    path: 'article',
                    loadChildren: async () =>
                        import('./article/article.module').then((m) => m.ArticleModule),
                },
            ],
            {useHash: true},
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
