import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgxsModule} from '@ngxs/store';

import {PersonComponent} from './person.component';
import {PersonResolver} from './person.resolver';
import {PersonService} from './person.service';
import {PersonState} from './person.state';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NgxsModule.forFeature([PersonState]),
        RouterModule.forChild([
            {
                path: '',
                component: PersonComponent,
                resolve: {
                    content: PersonResolver,
                },
            },
        ]),
    ],
    declarations: [PersonComponent],
    providers: [PersonResolver, PersonService],
})
export class PersonModule {}
