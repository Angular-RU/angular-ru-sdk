import {AsyncPipe, JsonPipe} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    isDevMode,
    OnInit,
} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [AsyncPipe, JsonPipe, RouterLink, RouterOutlet],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    private readonly store = inject(Store);

    public snapshot$: Observable<unknown> = this.store.select(
        (state: unknown): unknown => state,
    );

    public ngOnInit(): void {
        // eslint-disable-next-line no-console
        console.log('[isDevMode]', isDevMode());
    }
}
