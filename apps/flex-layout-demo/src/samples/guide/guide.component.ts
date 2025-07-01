import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';

declare const hljs: any;

@Component({
    standalone: false,
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        const list: Element[] = Array.from(document.querySelectorAll('pre code') ?? []);

        for (const block of list) {
            hljs.highlightBlock(block);
        }
    }
}
