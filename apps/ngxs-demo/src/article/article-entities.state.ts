import {Injectable} from '@angular/core';
import {createEntityCollections} from '@angular-ru/cdk/entity';
import {Persistence, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsDataEntityCollectionsRepository} from '@angular-ru/ngxs/repositories';
import {State} from '@ngxs/store';

import {Article} from './article';

@Persistence({
    existingEngine: localStorage,
})
@StateRepository()
@State({
    name: 'articles',
    defaults: createEntityCollections(),
})
@Injectable()
export class ArticleEntitiesState extends NgxsDataEntityCollectionsRepository<
    Article,
    string
> {
    public override primaryKey: string = 'uid';
}
