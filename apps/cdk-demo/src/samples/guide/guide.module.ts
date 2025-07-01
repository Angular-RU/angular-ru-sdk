import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RouterModule} from '@angular/router';
import {AmountFormatModule, InputFilterModule} from '@angular-ru/cdk/directives';

import {GuideComponent} from './guide.component';
import {REG_EXP_ONLY_NUMBERS} from './properties/constants';

@NgModule({
    imports: [
        AmountFormatModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        ScrollingModule,
        InputFilterModule.forChild({
            default: REG_EXP_ONLY_NUMBERS,
        }),
        RouterModule.forChild([
            {
                path: '',
                component: GuideComponent,
            },
        ]),
    ],
    declarations: [GuideComponent],
})
export class GuideModule {}
