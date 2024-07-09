/* eslint-disable spellcheck/spell-checker */
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {detectChanges} from '@angular-ru/cdk/utils';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

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
    'Elizabeth',
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
    'gray',
];

function replaceAt(array: any[], index: number, value: any): any[] {
    const returnValue: any[] = array.slice(0);

    returnValue[index] = value;

    return returnValue;
}

@Component({
    selector: 'sample-eight',
    templateUrl: './sample-eight.component.html',
    // eslint-disable-next-line @angular-eslint/component-max-inline-declarations
    styles: [
        `
            .cost-disable {
                opacity: 0.5;
                color: red;
                text-decoration: line-through;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleEightComponent implements OnInit, AfterViewInit, OnDestroy {
    private idInterval: Nullable<number> = null;
    private timeout: Nullable<number> = null;
    public data: PlainObject[] = [];
    public regenerate: boolean = false;

    constructor(
        private readonly cd: ChangeDetectorRef,
        private readonly ngZone: NgZone,
    ) {}

    public ngOnInit(): void {
        this.updateTable();
        const DEFAULT_TIMEOUT: number = 14500;

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.idInterval = window.setInterval((): void => {
                if (this.regenerate) {
                    this.updateTable();
                    this.cd.detectChanges();
                }
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval ?? 0);
    }

    public updateRow<T>(row: PlainObject, key: string, value: T): void {
        const newRow: PlainObject = {...row, [key]: value};

        this.data = replaceAt(this.data, this.data.indexOf(row), newRow);
        detectChanges(this.cd);
    }

    public asyncRow<T>(row: PlainObject, key: string, value: T): void {
        const time: number = 500;

        window.clearTimeout(this.timeout ?? 0);
        // eslint-disable-next-line no-restricted-properties
        this.timeout = window.setTimeout(
            (): void => this.updateRow(row, key, value),
            time,
        );
    }

    public ngAfterViewInit(): void {
        hlJsCode();
    }

    // eslint-disable-next-line max-lines-per-function
    private updateTable(): void {
        const length: number = 1000;

        this.data = new Array(length).fill(0).map(
            // eslint-disable-next-line max-lines-per-function
            (_: PlainObject, index: number): any => ({
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
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                cost: Math.floor(Math.random() * 100) + 1,
                active: true,
                name: `${NAMES[Math.round(Math.random() * (NAMES.length - 1))]} ${NAMES[
                    Math.round(Math.random() * (NAMES.length - 1))
                ]?.charAt(0)}.`,
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                weight: Math.round(Math.random() * 100).toString(),
                firstName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
                lastName: NAMES[Math.round(Math.random() * (NAMES.length - 1))],
                dateOfBirth: 1985,
                spokenLanguages: {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    native: `English${Math.round(Math.random() * 100).toString()}`,
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    fluent: `Spanish${Math.round(Math.random() * 100).toString()}`,
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    intermediate: `Chinese${Math.round(Math.random() * 100).toString()}`,
                },
            }),
        );
    }
}
