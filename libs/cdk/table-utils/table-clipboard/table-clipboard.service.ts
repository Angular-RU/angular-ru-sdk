/* eslint-disable unicorn/consistent-function-scoping */
// eslint-disable-next-line max-classes-per-file
import {Injectable, Optional} from '@angular/core';
import {EmptyValue, Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {copyHtml, isNotNil} from '@angular-ru/cdk/utils';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import {RulesDescriptor} from '../plain-table-composer/interfaces/rules-descriptor';
import {PlainTableComposerService} from '../plain-table-composer/plain-table-composer.service';

interface Request<EntryType extends PlainObject> {
    entries: EntryType[];
    translationPrefix?: string;
    translationMap?: PlainObject;
    rules?: RulesDescriptor;
}

interface PreparedRequest {
    entries: PlainObject[];
    translationPrefix?: string;
    translationMap?: PlainObject;
}

@Injectable()
export class TableClipboardService {
    constructor(
        private readonly plainTableComposer: PlainTableComposerService,
        private readonly webWorker: WebWorkerThreadService,
        @Optional() private readonly translate: TranslateService,
    ) {}

    // eslint-disable-next-line max-lines-per-function
    public async generateTableAndCopy<EntryType extends PlainObject>(
        request: Request<EntryType>,
    ): Promise<void> {
        const preparedRequest: PreparedRequest = {
            ...request,
            entries: await this.plainTableComposer.compose(
                request.entries,
                request.rules,
            ),
            translationMap: request.translationMap ?? (await this.getTranslationMap()),
        };

        return (
            this.webWorker
                // eslint-disable-next-line max-lines-per-function
                .run((input: PreparedRequest): string => {
                    function isEmptyValue(value: any): value is EmptyValue {
                        const nextValue: any =
                            typeof value === 'string' ? value.trim() : value;

                        return [undefined, null, NaN, '', Infinity].includes(nextValue);
                    }

                    function isFilledString(value: Nullable<string>): value is string {
                        return typeof value === 'string' && value.length > 0;
                    }

                    class PlainTableBuilder {
                        constructor(
                            private readonly translationMap?: PlainObject,
                            private readonly translationPrefix?: string,
                            private readonly stub: string = '-',
                        ) {}

                        public generateTable(entities: PlainObject[]): string {
                            const firstEntry: Nullable<PlainObject> = entities[0];

                            if (firstEntry) {
                                const keys: string[] = Object.keys(firstEntry);
                                const htmlHeader: string = this.generateHeaderRow(keys);
                                const htmlBody: string = entities
                                    .map((object: PlainObject): string =>
                                        this.generateBodyRow(object, keys),
                                    )
                                    .join('');

                                return `<html><body><table border="1" cellspacing="0"><tbody>${htmlHeader}${htmlBody}</tbody></table></body></html>`;
                            } else {
                                return '';
                            }
                        }

                        private generateHeaderRow(keys: string[]): string {
                            const htmlCells: string[] = keys.map((key: string): string =>
                                this.generateHeaderCell(key),
                            );

                            return `<tr>${htmlCells.join('')}</tr>`;
                        }

                        private generateBodyRow(
                            entity: PlainObject,
                            keys: string[],
                        ): string {
                            const htmlCells: string[] = keys.map((key: string): string =>
                                this.generateBodyCell(entity[key]),
                            );

                            return `<tr>${htmlCells.join('')}</tr>`;
                        }

                        private generateHeaderCell(key: string): string {
                            const cellValue: string = this.getTranslatedTitle(key);

                            return `<th>${cellValue}</th>`;
                        }

                        private generateBodyCell(value: any): string {
                            const cellValue: any = isEmptyValue(value)
                                ? this.stub
                                : value;

                            return `<td>${cellValue}</td>`;
                        }

                        private getTranslatedTitle(key: string): string {
                            const translatePath: string = isFilledString(
                                this.translationPrefix,
                            )
                                ? `${this.translationPrefix}.${key}`
                                : key;

                            return this.translationMap?.[translatePath] ?? key;
                        }
                    }

                    const {translationMap, translationPrefix, entries}: PreparedRequest =
                        input;

                    return new PlainTableBuilder(
                        translationMap,
                        translationPrefix,
                    ).generateTable(entries);
                }, preparedRequest)
                .then(copyHtml)
        );
    }

    private async getTranslationMap(): Promise<PlainObject> {
        const lang: Nullable<string> =
            this.translate.currentLang ?? this.translate.defaultLang;
        const translationMap$: Observable<PlainObject> = isNotNil(lang)
            ? this.translate.getTranslation(lang)
            : of({});

        return (
            translationMap$
                // eslint-disable-next-line rxjs/no-topromise, deprecation/deprecation
                .toPromise()
                .then(
                    (map: PlainObject | null | undefined): PlainObject =>
                        this.plainTableComposer.composeSingle(map!),
                )
        );
    }
}
