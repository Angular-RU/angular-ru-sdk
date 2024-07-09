import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SampleFirstComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
