import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

declare const hljs: Any;

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleFirstComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }
}
