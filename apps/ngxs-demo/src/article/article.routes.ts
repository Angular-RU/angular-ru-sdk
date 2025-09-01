import type {Routes} from '@angular/router';
import {provideStates} from '@ngxs/store';

import {ArticleComponent} from './article.component';
import {ArticleEntitiesState} from './article-entities.state';

const routes: Routes = [
    {
        path: '',
        component: ArticleComponent,
        providers: [provideStates([ArticleEntitiesState])],
    },
];

export default routes;
