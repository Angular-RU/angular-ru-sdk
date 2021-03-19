import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { TableUpdateSchema } from '@angular-ru/ng-table-builder';

import { MocksGenerator } from '../../../../tests/helpers/utils/mocks-generator';

declare const hljs: Any;

@Component({
    selector: 'sample-eleven',
    templateUrl: './sample-eleven.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    styles: [
        `
            .night {
                position: relative;
                margin: auto;
            }

            /*noinspection CssUnusedSymbol*/
            .night .mat-tab-body-content {
                padding: 5px 0;
                height: calc(100% - 10px);
                overflow: hidden;
            }

            /*noinspection ALL*/
            .night .mat-tab-body-wrapper .mat-tab-body.mat-tab-body-active {
                overflow: visible;
                max-width: 100%;
            }
        `
    ]
})
export class SampleElevenComponent implements OnInit, AfterViewInit {
    public data: PlainObject[] = [];

    public licences: PlainObject[] = [
        {
            id: 1,
            name: 'single',
            price: 29.3
        },
        {
            id: 2,
            name: 'developer',
            price: 49.8
        },
        {
            id: 3,
            name: 'premium',
            price: 99.5
        },
        {
            id: 4,
            name: 'enterprise',
            price: 199
        }
    ];

    constructor(private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        const rows: number = 50;
        const cols: number = 15;
        MocksGenerator.generator(rows, cols).then((data: PlainObject[]): void => {
            this.data = data;
            this.cd.detectChanges();
        });
    }

    public ngAfterViewInit(): void {
        this.update();
    }

    public update(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    public exportExcel(data: PlainObject[]): void {
        window.alert('export excel - ' + JSON.stringify(data));
    }

    public showLine(key: string | null, item: PlainObject | null): void {
        window.alert('key - ' + key + ' item - ' + JSON.stringify(item));
    }

    public copyId(id: string): void {
        window.alert('Copy on buffer - ' + id);
    }

    public updatedSchema(event: TableUpdateSchema): void {
        // eslint-disable-next-line no-console
        console.log('Update schema', event); // NOSONAR
    }
}
