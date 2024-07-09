import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';

import {UserState} from './user.state';
import {UserModel} from './user-model';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
    @Select(UserState.getEntity)
    public user$!: Observable<UserModel>;

    @Select(UserState.isLoading)
    public isLoading$!: Observable<boolean>;

    constructor(public userState: UserState) {
        // eslint-disable-next-line rxjs/no-ignored-observable
        this.userState.loadUser();
    }
}
