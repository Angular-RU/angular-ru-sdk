import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Sort} from '@angular/material/sort';
import {generateUid, isNil, isNotNil} from '@angular-ru/cdk/utils';
import {Observable, of, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {Article} from './article';
import {ArticleEntitiesState} from './article-entities.state';
import {ArticleDialogComponent} from './dialog/article-dialog.component';

@Component({
    selector: 'article',
    templateUrl: './article.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    constructor(
        public dialog: MatDialog,
        public articleEntities: ArticleEntitiesState,
    ) {}

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public createArticle(): void {
        this.ensureDialog({uid: generateUid(), title: '', category: ''})
            .pipe(
                filter((article: Article | null): article is Article => Boolean(article)),
                takeUntil(this.destroy$),
            )
            .subscribe((article: Article): void => this.articleEntities.addOne(article));
    }

    public editById(id: string): void {
        this.ensureDialog(this.articleEntities.selectOne(id))
            .pipe(
                filter((article: Article | null): article is Article => Boolean(article)),
                takeUntil(this.destroy$),
            )
            .subscribe((article: Article): void =>
                this.articleEntities.updateOne({id, changes: article}),
            );
    }

    public deleteById(id: string): void {
        this.articleEntities.removeOne(id);
    }

    public sortData(event: Sort): void {
        this.articleEntities.sort({
            sortBy: event.active as keyof Article,
            sortByOrder: event.direction,
        });
    }

    private ensureDialog(entity?: Article | null): Observable<Article | null> {
        if (isNil(entity)) {
            return of(null);
        }

        return this.dialog
            .open<ArticleDialogComponent, Article>(ArticleDialogComponent, {
                width: '300px',
                disableClose: true,
                data: entity,
            })
            .afterClosed()
            .pipe(filter((article?: Article): article is Article => isNotNil(article)));
    }
}
