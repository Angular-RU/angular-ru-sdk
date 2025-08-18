import {KeyValuePipe} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatToolbar} from '@angular/material/toolbar';
import {PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';
import {MocksGenerator} from '../../mocks-generator';
import {CodeDialogComponent} from '../../shared/dialog/code-dialog.component';

@Component({
    selector: 'sample-night',
    imports: [
        FormsModule,
        KeyValuePipe,
        MatButton,
        MatCheckbox,
        MatFormField,
        MatIcon,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        MatSuffix,
        MatToolbar,
        VirtualTable,
    ],
    templateUrl: './sample-night.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleNightComponent implements OnInit, AfterViewInit {
    public dataFirst = signal<PlainObject[]>([]);
    public dataSecond = signal<PlainObject[]>([]);
    public nativeScrollbar = signal(false);
    public readonly dialog = inject(MatDialog);

    public ngOnInit(): void {
        const rows1 = 11;
        const cols1 = 30;

        const rows2 = 10000;
        const cols2 = 30;

        Promise.all([
            MocksGenerator.generator(rows1, cols1),
            MocksGenerator.generator(rows2, cols2),
        ]).then(([first, second]: [PlainObject[], PlainObject[]]): void => {
            this.dataFirst.set(first);
            this.dataSecond.set(second);
        });
    }

    public ngAfterViewInit(): void {
        hlJsCode();
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
        <ngx-table-builder [source]="data()"></ngx-table-builder>
    </div>
    <div id="widget2">
        <ngx-table-builder [source]="data()"></ngx-table-builder>
    </div>
</div>

                    `,
            },
        });
    }
}
