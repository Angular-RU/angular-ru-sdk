import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgxsModule} from '@ngxs/store';

import {UserComponent} from './user.component';
import {UserService} from './user.service';
import {UserState} from './user.state';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgxsModule.forFeature([UserState]),
        RouterModule.forChild([
            {
                path: '',
                component: UserComponent,
            },
        ]),
    ],
    declarations: [UserComponent],
    providers: [UserService],
})
export class UserModule {}
