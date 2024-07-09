import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import {PlainObject} from '@angular-ru/cdk/typings';
import {TableEvent} from '@angular-ru/cdk/virtual-table';
import {ToastrService} from 'ngx-toastr';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

@Component({
    selector: 'sample-thirteen',
    templateUrl: './sample-thirteen.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ToastrService],
    encapsulation: ViewEncapsulation.None,
})
export class SampleThirteenComponent implements AfterViewInit {
    public data: PlainObject[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3,
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8,
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5,
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199,
        },
    ];

    constructor(private readonly toast: ToastrService) {}

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        hlJsCode();
    }

    public rowOnClick(event: TableEvent<PlainObject, string>): void {
        const space: number = 4;

        this.toast.success(JSON.stringify(event, null, space), 'OnClick', {
            timeOut: 2000,
            onActivateTick: true,
        });
    }

    public rowDblClick(event: TableEvent<PlainObject, string>): void {
        const space: number = 4;

        this.toast.success(JSON.stringify(event, null, space), 'DblClick', {
            timeOut: 2000,
            onActivateTick: true,
        });
    }
}
