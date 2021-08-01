import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Any } from '@angular-ru/common/typings';

declare const hljs: Any;

@Component({
    selector: 'sample-first',
    templateUrl: './sample-first.component.html',
    styleUrls: ['./sample-first.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SampleFirstComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }
}
