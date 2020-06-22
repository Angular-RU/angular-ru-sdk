/* eslint-disable @typescript-eslint/no-magic-numbers */
import { TableRow } from '@angular-ru/ng-table-builder';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';

import { Any } from '../../../../../src/interfaces/table-builder.internal';
import { detectChanges } from '../../../../../src/operators/detect-changes';

declare const hljs: Any;

const NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth'
];

const COLORS: string[] = [
    'maroon',
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'purple',
    'fuchsia',
    'lime',
    'teal',
    'aqua',
    'blue',
    'navy',
    'black',
    'gray'
];

function replaceAt(array: Any[], index: number, value: Any): Any[] {
    const ret: Any[] = array.slice(0);
    ret[index] = value;
    return ret;
}

@Component({
    selector: 'sample-eight',
    templateUrl: './sample-eight.component.html',
    styles: [
        // tslint:disable-next-line:component-max-inline-declarations
        `
            .cost-disable {
                opacity: 0.5;
                color: red;
                text-decoration: line-through;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleEightComponent implements OnInit, AfterViewInit, OnDestroy {
    public data: TableRow[] = [];
    public regenerate: boolean = false;
    private idInterval: number | null = null;
    private timeout: number | null = null;

    constructor(private readonly cd: ChangeDetectorRef, private readonly ngZone: NgZone) {}

    public ngOnInit(): void {
        this.updateTable();
        const DEFAULT_TIMEOUT: number = 14500;

        this.ngZone.runOutsideAngular((): void => {
            this.idInterval = window.setInterval((): void => {
                if (this.regenerate) {
                    this.updateTable();
                    this.cd.detectChanges();
                }
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval!);
    }

    public updateRow(row: TableRow, key: string, value: Any): void {
        const newRow: TableRow = { ...row, [key]: value };
        this.data = replaceAt(this.data, this.data.indexOf(row), newRow);
        detectChanges(this.cd);
    }

    public asyncRow(row: TableRow, key: string, value: Any): void {
        const time: number = 500;
        window.clearTimeout(this.timeout!);
        this.timeout = window.setTimeout((): void => this.updateRow(row, key, value), time);
    }

    public ngAfterViewInit(): void {
        document.querySelectorAll('pre code').forEach((block: Any): void => {
            hljs.highlightBlock(block);
        });
    }

    // eslint-disable-next-line max-lines-per-function
    private updateTable(): void {
        const length: number = 1000;
        this.data = new Array(length).fill(0).map(
            // eslint-disable-next-line max-lines-per-function
            (_: TableRow, index: number): Any => ({
                id: index,
                symbol: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
                item:
                    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of' +
                    ' classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin' +
                    ' professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, ' +
                    'consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical ' +
                    'literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 ' +
                    'of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.' +
                    ' This book is a treatise on the theory of ethics, very popular during the Renaissance. The first' +
                    ' line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
                    '\n' +
                    'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ' +
                    'Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in' +
                    ' their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
                // eslint-disable-next-line no-magic-numbers
                cost: Math.floor(Math.random() * 100) + 1,
                active: true,
                name:
                    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
                    ' ' +
                    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
                    '.',
                // eslint-disable-next-line no-magic-numbers
                weight: Math.round(Math.random() * 100).toString(),
                firstName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
                lastName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
                dateOfBirth: 1985,
                spokenLanguages: {
                    // eslint-disable-next-line no-magic-numbers
                    native: 'English' + Math.round(Math.random() * 100).toString(),
                    // eslint-disable-next-line no-magic-numbers
                    fluent: 'Spanish' + Math.round(Math.random() * 100).toString(),
                    // eslint-disable-next-line no-magic-numbers
                    intermediate: 'Chinese' + Math.round(Math.random() * 100).toString()
                }
            })
        );
    }
}
