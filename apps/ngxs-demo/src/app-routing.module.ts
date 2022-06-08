/* eslint-disable @typescript-eslint/typedef,@typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'count',
                    pathMatch: 'full'
                },
                {
                    path: 'count',
                    loadChildren: () => import('./count/count.module').then((m) => m.CountModule)
                },
                {
                    path: 'todo',
                    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule)
                },
                {
                    path: 'person',
                    loadChildren: () => import('./person/person.module').then((m) => m.PersonModule)
                },
                {
                    path: 'user',
                    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
                },
                {
                    path: 'amount',
                    loadChildren: () => import('./amount/amount.module').then((m) => m.AmountModule)
                },
                {
                    path: 'article',
                    loadChildren: () => import('./article/article.module').then((m) => m.ArticleModule)
                }
            ],
            { useHash: true, relativeLinkResolution: 'legacy' }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
