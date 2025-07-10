import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatToolbar} from '@angular/material/toolbar';
import {FlexLayout} from '@angular-ru/cdk/flex-layout';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'sample-first',
    imports: [FlexLayout, MatFormField, MatInput, MatLabel, MatToolbar],
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleFirstComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
