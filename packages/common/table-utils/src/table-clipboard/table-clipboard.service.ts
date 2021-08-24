// eslint-disable-next-line max-classes-per-file
import { Injectable, Optional } from '@angular/core';
import { Any, EmptyValue, Nullable, PlainObject } from '@angular-ru/common/typings';
import { isNotNil } from '@angular-ru/common/utils';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { RulesDescriptor } from '../plain-table-composer/interfaces/rules-descriptor';
import { PlainTableComposerService } from '../plain-table-composer/plain-table-composer.service';

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

declare class ClipboardItem {
    constructor(types: Record<string, Blob>);
}

@Injectable()
export class TableClipboardService {
    constructor(
        private readonly plainTableComposer: PlainTableComposerService,
        private readonly webWorker: WebWorkerThreadService,
        @Optional() private readonly translate: TranslateService
    ) {}

    // eslint-disable-next-line max-lines-per-function
    public async convertToTableAndCopy<EntryType extends PlainObject>(request: Request<EntryType>): Promise<void> {
        const preparedRequest: PreparedRequest = {
            ...request,
            entries: await this.plainTableComposer.compose(request.entries, request.rules),
            translationMap: request.translationMap ?? (await this.getTranslationMap())
        };

        return (
            this.webWorker
                // eslint-disable-next-line max-lines-per-function
                .run((input: PreparedRequest): Blob => {
                    function isEmptyValue(value: Any): value is EmptyValue {
                        const val: Any = typeof value === 'string' ? value.trim() : value;
                        return [undefined, null, NaN, '', Infinity].includes(val);
                    }

                    function isFilledString(value: Nullable<string>): value is string {
                        return typeof value === 'string' && value.length > 0;
                    }

                    class PlainTableBuilder {
                        constructor(
                            private readonly translationMap?: PlainObject,
                            private readonly translationPrefix?: string,
                            private readonly stub: string = '-'
                        ) {}

                        public generateTable(entities: PlainObject[]): string {
                            const firstEntry: Nullable<PlainObject> = entities[0];
                            if (firstEntry) {
                                const keys: string[] = Object.keys(firstEntry);
                                const htmlHeader: string = this.generateHeaderRow(keys);
                                const htmlBody: string = entities
                                    .map((asd: PlainObject): string => this.generateBodyRow(asd, keys))
                                    .join('');
                                return `<table><tbody>${htmlHeader} ${htmlBody}</tbody></table>`;
                            } else {
                                return '';
                            }
                        }

                        private generateHeaderRow(keys: string[]): string {
                            const htmlCells: string[] = keys.map((key: string): string => this.generateHeaderCell(key));
                            return `<tr>${htmlCells.join('')}</tr>`;
                        }

                        private generateBodyRow(entity: PlainObject, keys: string[]): string {
                            const htmlCells: string[] = keys.map((key: string): string =>
                                this.generateBodyCell(entity[key])
                            );
                            return `<tr>${htmlCells.join('')}</tr>`;
                        }

                        private generateHeaderCell(key: string): string {
                            const cellValue: string = this.getTranslatedTitle(key);
                            return `<th>${cellValue}</th>`;
                        }

                        private generateBodyCell(value: Any): string {
                            const cellValue: Any = isEmptyValue(value) ? this.stub : value;
                            return `<td>${cellValue}</td>`;
                        }

                        private getTranslatedTitle(key: string): string {
                            const translatePath: string = isFilledString(this.translationPrefix)
                                ? `${this.translationPrefix}.${key}`
                                : key;
                            return this.translationMap?.[translatePath] ?? key;
                        }
                    }

                    const { translationMap, translationPrefix, entries }: PreparedRequest = input;
                    const plainHtml: string = new PlainTableBuilder(translationMap, translationPrefix).generateTable(
                        entries
                    );
                    return new Blob([plainHtml], { type: 'text/html' });
                }, preparedRequest)
                .then(
                    (blob: Blob): Promise<void> =>
                        (window.navigator.clipboard as Any).write([new ClipboardItem({ 'text/html': blob })])
                )
        );
    }

    private async getTranslationMap(): Promise<PlainObject> {
        const lang: Nullable<string> = this.translate.currentLang ?? this.translate.defaultLang;
        const translationMap$: Observable<PlainObject> = isNotNil(lang) ? this.translate.getTranslation(lang) : of({});
        return translationMap$
            .toPromise()
            .then((map: PlainObject): PlainObject => this.plainTableComposer.composeSingle(map));
    }
}
