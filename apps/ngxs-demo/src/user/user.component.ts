import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngxs/store';

import {UserState} from './user.state';

@Component({
    selector: 'user',
    imports: [AsyncPipe],
    templateUrl: './user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    private readonly store = inject(Store);

    protected user$ = this.store.select(UserState.getEntity);
    protected isLoading$ = this.store.select(UserState.isLoading);

    constructor(public userState: UserState) {
        // eslint-disable-next-line rxjs/no-ignored-observable
        this.userState.loadUser();
    }
}
