import {inject, Injectable} from '@angular/core';
import {DataAction, StateRepository} from '@angular-ru/ngxs/decorators';
import {NgxsImmutableDataRepository} from '@angular-ru/ngxs/repositories';
import {Selector, State} from '@ngxs/store';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

import {UserService} from './user.service';
import {UserModel} from './user-model';

interface UserStateModel {
    entity: UserModel;
    loading: boolean;
}

@StateRepository()
@State<UserStateModel>({
    name: 'user',
    defaults: {
        entity: {
            name: null!,
            email: null!,
        },
        loading: false,
    },
})
@Injectable()
export class UserState extends NgxsImmutableDataRepository<UserStateModel> {
    private readonly userService = inject(UserService);

    @Selector()
    public static getEntity(state: UserStateModel): UserModel {
        return state.entity;
    }

    @Selector()
    public static isLoading(state: UserStateModel): boolean {
        return state.loading;
    }

    // Note: Also can be configured globally using provideNgxsDataPlugin({subscribeRequired: false})
    @DataAction({subscribeRequired: false})
    public loadUser(): Observable<UserModel> {
        this.ctx.patchState({loading: true});

        return this.userService.loadUser().pipe(
            finalize((): void => this.patchState({loading: false})),
            tap((entity: UserModel): void => this.patchState({entity})),
        );
    }
}
