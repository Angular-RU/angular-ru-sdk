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
        this.apiClient.posts().subscribe();
        this.apiClient.comments().subscribe();
        this.apiClient.albums().subscribe();
        this.apiClient.todos().subscribe();
        this.apiClient.users().subscribe();
    }
}
