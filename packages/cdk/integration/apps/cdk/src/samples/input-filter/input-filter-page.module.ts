import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { InputFilterModule } from '@angular-ru/cdk/directives';

import { InputFilterComponent } from './input-filter.component';
import { REG_EXP_ONLY_NUMBERS } from './properties/constants';

@NgModule({
    declarations: [InputFilterComponent],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: InputFilterComponent
            }
        ]),
        CommonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        ScrollingModule,
        InputFilterModule.forChild({
            default: REG_EXP_ONLY_NUMBERS
        })
    ]
})
export class InputFilterPageModule {}
