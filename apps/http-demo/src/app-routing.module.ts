/* eslint-disable */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
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
                            loadChildren: () =>
                                import('./samples/guide/guide.module').then(
                                    (m) => m.GuideModule,
                                ),
                        },
                    ],
                },
            ],
            {useHash: true, scrollPositionRestoration: 'enabled'},
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
