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
                        {
                            path: 'first',
                            loadChildren: () =>
                                import('./samples/sample-first/sample-first.module').then(
                                    (m) => m.SampleFirstModule,
                                ),
                        },
                        {
                            path: 'first-second',
                            loadChildren: () =>
                                import(
                                    './samples/sample-first-second/sample-first-second.module'
                                ).then((m) => m.SampleFirstSecondModule),
                        },
                        {
                            path: 'second',
                            loadChildren: () =>
                                import(
                                    './samples/sample-second/sample-second.module'
                                ).then((m) => m.SampleSecondModule),
                        },
                        {
                            path: 'third',
                            loadChildren: () =>
                                import('./samples/sample-third/sample-third.module').then(
                                    (m) => m.SampleThirdModule,
                                ),
                        },
                        {
                            path: 'fourth',
                            loadChildren: () =>
                                import(
                                    './samples/sample-fourth/sample-fourth.module'
                                ).then((m) => m.SampleFourthModule),
                        },
                        {
                            path: 'five',
                            loadChildren: () =>
                                import('./samples/sample-five/sample-five.module').then(
                                    (m) => m.SampleFiveModule,
                                ),
                        },
                        {
                            path: 'six',
                            loadChildren: () =>
                                import('./samples/sample-six/sample-six.module').then(
                                    (m) => m.SampleSixModule,
                                ),
                        },
                        {
                            path: 'seven',
                            loadChildren: () =>
                                import('./samples/sample-seven/sample-seven.module').then(
                                    (m) => m.SampleSevenModule,
                                ),
                        },
                        {
                            path: 'eight',
                            loadChildren: () =>
                                import('./samples/sample-eight/sample-eight.module').then(
                                    (m) => m.SampleEightModule,
                                ),
                        },
                        {
                            path: 'night',
                            loadChildren: () =>
                                import('./samples/sample-night/sample-night.module').then(
                                    (m) => m.SampleNightModule,
                                ),
                        },
                        {
                            path: 'eleven',
                            loadChildren: () =>
                                import(
                                    './samples/sample-eleven/sample-eleven.module'
                                ).then((m) => m.SampleElevenModule),
                        },
                        {
                            path: 'twelve',
                            loadChildren: () =>
                                import(
                                    './samples/sample-twelve/sample-twelve.module'
                                ).then((m) => m.SampleTwelveModule),
                        },
                        {
                            path: 'thirteen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-thirteen/sample-thirteen.module'
                                ).then((m) => m.SampleThirteenModule),
                        },
                        {
                            path: 'fourteen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-fourteen/sample-fourteen.module'
                                ).then((m) => m.SampleFourteenModule),
                        },
                        {
                            path: 'fifteen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-fifteen/sample-fifteen.module'
                                ).then((m) => m.SampleFifteenModule),
                        },
                        {
                            path: 'sixteen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-sixteen/sample-sixteen.module'
                                ).then((m) => m.SampleSixteenModule),
                        },
                        {
                            path: 'seventeen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-seventeen/sample-seventeen.module'
                                ).then((m) => m.SampleSeventeenModule),
                        },
                        {
                            path: 'eighteen',
                            loadChildren: () =>
                                import(
                                    './samples/sample-eighteen/sample-eighteen.module'
                                ).then((m) => m.SampleEighteenModule),
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
