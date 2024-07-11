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
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleFirstComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        hlJsCode();
    }
}
