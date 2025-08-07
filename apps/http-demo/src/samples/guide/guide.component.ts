import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ApiClient} from '../../services/clients/api.client';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuideComponent implements OnInit, OnDestroy {
    private readonly apiClient = inject(ApiClient);

    private readonly destroy$ = new Subject<void>();

    public ngOnInit(): void {
        this.fetchData();
        this.fetchData();
        this.fetchData();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private fetchData(): void {
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.posts().pipe(takeUntil(this.destroy$)).subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.comments().pipe(takeUntil(this.destroy$)).subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.albums().pipe(takeUntil(this.destroy$)).subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.todos().pipe(takeUntil(this.destroy$)).subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.users().pipe(takeUntil(this.destroy$)).subscribe();
    }
}
