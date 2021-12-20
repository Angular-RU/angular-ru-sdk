import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AmountFormatModule } from '@angular-ru/cdk/directives';

import { AmountFormatComponent } from './amount-format.component';

@NgModule({
    declarations: [AmountFormatComponent],
    imports: [
        AmountFormatModule,
        RouterModule.forChild([
            {
                path: '',
                component: AmountFormatComponent
            }
        ]),
        CommonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        ScrollingModule
    ]
})
export class AmountFormatPageModule {}
