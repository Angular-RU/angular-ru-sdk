import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Any } from '@angular-ru/cdk/typings';

declare const hljs: Any;

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        const list: Element[] = Array.from(document.querySelectorAll('pre code') ?? []);

        for (const block of list) {
            hljs.highlightBlock(block);
        }
    }
}
