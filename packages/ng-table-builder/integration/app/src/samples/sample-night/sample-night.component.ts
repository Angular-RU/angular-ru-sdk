import { TableRow } from '@angular-ru/ng-table-builder';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    NgZone,
    OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';
import { CodeDialogComponent } from '../../shared/dialog/code-dialog.component';

declare const hljs: Any;

@Component({
    selector: 'sample-night',
    templateUrl: './sample-night.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleNightComponent implements OnInit, AfterViewInit {
    public dataFirst: TableRow[] = [];
    public dataSecond: TableRow[] = [];
    public nativeScrollbar: boolean = false;
    public readonly dialog: MatDialog;
    private readonly ngZone: NgZone;

    constructor(private readonly cd: ChangeDetectorRef, injector: Injector) {
        this.dialog = injector.get<MatDialog>(MatDialog);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

    public ngOnInit(): void {
        const rows1: number = 11;
        const cols1: number = 30;

        const rows2: number = 10000;
        const cols2: number = 30;

        Promise.all([MocksGenerator.generator(rows1, cols1), MocksGenerator.generator(rows2, cols2)]).then(
            ([first, second]: [TableRow[], TableRow[]]): void => {
                this.dataFirst = first;
                this.dataSecond = second;
                this.cd.detectChanges();
            }
        );
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public update(): void {
        this.ngZone.runOutsideAngular((): void => {
            setTimeout((): void => {
                this.cd.detectChanges();
            });
        });
    }

    // eslint-disable-next-line max-lines-per-function
    public showSample(): void {
        this.dialog.open(CodeDialogComponent, {
            data: {
                title: 'Custom layout',
                description: 'Automatic height calculation',
                code: `
<style>
    #main-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100% - 100px);
    }

    #widget1,
    #widget2 {
        flex: 1;
        flex-shrink: 0;
        overflow: auto;
        margin: 5px;
    }
</style>

<div id="main-column">
    <div id="widget1">
        <ngx-table-builder [source]="data"></ngx-table-builder>
    </div>
    <div id="widget2">
        <ngx-table-builder [source]="data"></ngx-table-builder>
    </div>
</div>

                    `
            },
            height: '750px',
            width: '700px'
        });
    }
}
