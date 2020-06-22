/* tslint:disable:no-unused-css */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { Any } from '../../../../../src/interfaces/table-builder.internal';

interface LicenseSample {
    id: number;
    name: string;
    price: number;
}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

declare const hljs: Any;

@Component({
    selector: 'sample-second',
    templateUrl: './sample-second.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            /*noinspection CssUnusedSymbol*/
            .status-column .table-grid__cell {
                padding: 0;
                color: green;
            }

            /*noinspection CssUnusedSymbol*/
            .button__done[mat-button] {
                padding: 0;
                min-width: 100%;
            }
        `
    ],
    // Use to disable CSS Encapsulation for this component
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSecondComponent implements AfterViewInit {
    public licenses: LicenseSample[] = [];

    public columns: string[] = ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'status'];
    // noinspection DuplicatedCode
    public elements: PeriodicElement[] = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
        { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
    ];

    constructor(public readonly cd: ChangeDetectorRef) {}

    // eslint-disable-next-line max-lines-per-function
    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });

        setTimeout(
            // eslint-disable-next-line max-lines-per-function
            (): void => {
                this.licenses = [
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

                this.cd.detectChanges();
            }
        );
    }
}
