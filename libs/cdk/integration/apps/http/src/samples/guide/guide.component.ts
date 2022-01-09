import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ApiClient } from '../../services/clients/api.client';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent implements OnInit {
    constructor(private readonly apiClient: ApiClient) {}

    public ngOnInit(): void {
        this.fetchData();
        this.fetchData();
        this.fetchData();
    }

    private fetchData(): void {
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.posts().subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.comments().subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.albums().subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.todos().subscribe();
        // eslint-disable-next-line rxjs/no-ignored-subscribe
        this.apiClient.users().subscribe();
    }
}
