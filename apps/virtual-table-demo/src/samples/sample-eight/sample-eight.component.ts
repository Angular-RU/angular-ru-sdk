import {CurrencyPipe} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    NgZone,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatToolbar} from '@angular/material/toolbar';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {VirtualTable} from '@angular-ru/cdk/virtual-table';
import {
    randBetweenDate,
    randBoolean,
    randColor,
    randFirstName,
    randFullName,
    randLanguage,
    randLastName,
    randLines,
    randNumber,
} from '@ngneat/falso';

import {hlJsCode} from '../../../../../.global/utils/hljs-code';

function replaceAt(array: any[], index: number, value: any): any[] {
    const returnValue: any[] = array.slice(0);

    returnValue[index] = value;

    return returnValue;
}

@Component({
    selector: 'sample-eight',
    imports: [
        CurrencyPipe,
        FormsModule,
        MatCheckbox,
        MatFormField,
        MatInput,
        MatToolbar,
        VirtualTable,
    ],
    templateUrl: './sample-eight.component.html',
    styles: [
        `
            .cost-disable {
                opacity: 0.5;
                color: red;
                text-decoration: line-through;
            }

            ::ng-deep .checkbox-column .table-grid__cell {
                padding: 5px;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SampleEightComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly ngZone = inject(NgZone);

    private idInterval: Nullable<number> = null;
    private timeout: Nullable<number> = null;
    public data = signal<PlainObject[]>([]);
    public regenerate = false;

    public ngOnInit(): void {
        this.updateTable();
        const DEFAULT_TIMEOUT = 14500;

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.idInterval = window.setInterval((): void => {
                if (this.regenerate) {
                    this.updateTable();
                }
            }, DEFAULT_TIMEOUT);
        });
    }

    public ngOnDestroy(): void {
        window.clearInterval(this.idInterval ?? 0);
    }

    public updateRow<T>(row: PlainObject, key: string, value: T): void {
        const newRow: PlainObject = {...row, [key]: value};

        this.data.set(replaceAt(this.data(), this.data().indexOf(row), newRow));
    }

    public asyncRow<T>(row: PlainObject, key: string, value: T): void {
        const time = 500;

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
        this.data.set(
            Array.from(
                {
                    length: 1e3,
                },
                (_: PlainObject, index: number): any => ({
                    id: index,
                    symbol: randColor(),
                    item: randLines(),
                    cost: randNumber({
                        min: 1,
                        max: 100,
                    }),
                    active: randBoolean(),
                    name: randFullName(),
                    weight: randNumber({
                        min: 50,
                        max: 100,
                    }),
                    firstName: randFirstName(),
                    lastName: randLastName(),
                    dateOfBirth: randBetweenDate({
                        from: new Date(1980, 0, 1),
                        to: new Date(2000, 0, 1),
                    }).toLocaleDateString(),
                    spokenLanguages: {
                        native: `${randLanguage()} (${randNumber({max: 100})})`,
                        fluent: `${randLanguage()} (${randNumber({max: 100})})`,
                        intermediate: `${randLanguage()} (${randNumber({max: 100})})`,
                    },
                }),
            ),
        );
    }
}
