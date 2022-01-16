import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '@angular-ru/cdk/tooltip';

import { GuideComponent } from './guide.component';

@NgModule({
    declarations: [GuideComponent],
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule.forChild([
            {
                path: '',
                component: GuideComponent
            }
        ]),
        ScrollingModule,
        TooltipModule
    ]
})
export class GuideModule {}
