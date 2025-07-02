import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    standalone: false,
    selector: 'app-root',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsAppMockComponent implements OnInit, AfterViewInit {
    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    public ngOnInit(): void {
        // noop
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    public ngAfterViewInit(): void {
        // noop
    }
}
