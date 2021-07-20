import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AmountFormatModule, InputFilterModule } from '@angular-ru/common/directives';

import { GuideComponent } from './guide.component';

@NgModule({
    declarations: [GuideComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: GuideComponent
            }
        ]),
        MatIconModule,
        ScrollingModule,
        MatInputModule,
        AmountFormatModule,
        ReactiveFormsModule,
        InputFilterModule
    ]
})
export class GuideModule {}
