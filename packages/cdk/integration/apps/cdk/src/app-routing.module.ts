/* eslint-disable */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'samples'
                },

                {
                    path: 'samples',
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            redirectTo: 'amount-format'
                        },
                        {
                            path: 'amount-format',
                            loadChildren: () =>
                                import('./samples/amount-format/amount-format-page.module').then(
                                    (m) => m.AmountFormatPageModule
                                )
                        },
                        {
                            path: 'input-filter',
                            loadChildren: () =>
                                import('./samples/input-filter/input-filter-page.module').then(
                                    (m) => m.InputFilterPageModule
                                )
                        },
                        {
                            path: 'worker',
                            loadChildren: () => import('./samples/worker/worker.module').then((m) => m.WorkerModule)
                        }
                    ]
                }
            ],
            { useHash: true, scrollPositionRestoration: 'enabled' }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
