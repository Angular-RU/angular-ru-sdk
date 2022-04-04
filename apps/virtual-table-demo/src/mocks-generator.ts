/* eslint-disable no-magic-numbers,@typescript-eslint/no-magic-numbers,max-classes-per-file */
import { Any, PlainObject } from '@angular-ru/cdk/typings';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

export class MocksGenerator {
    // eslint-disable-next-line max-lines-per-function
    public static generator(rowsNumber: number, colsNumber: number, startIndex: number = 0): Promise<PlainObject[]> {
        return new WebWorkerThreadService().run<PlainObject[], Any>(
            // eslint-disable-next-line max-lines-per-function
            (data: Any): PlainObject[] => {
                class FakeGenerator {
                    // eslint-disable-next-line max-lines-per-function
                    public static generateTable(rows: number, cols: number, start: number): PlainObject[] {
                        // eslint-disable-next-line max-lines-per-function
                        return new Array(rows).fill(0).map(
                            // eslint-disable-next-line max-lines-per-function
                            (_: unknown, index: number): PlainObject => {
                                const idx: number = start + index + 1;

                                const baseRow: PlainObject = {
                                    id: idx,
                                    reverseId: Math.round(Math.random() + rows * 512 + cols + start * 10) * 1024,
                                    name: `Random - ${((Math.random() + 1) * 100).toFixed(0)}__${idx}`,
                                    description: `Random - ${((Math.random() + 1) * 100).toFixed(0)}__${idx}`,
                                    guid: `${'5cdae5b2ba0a57f709b72142' + '__'}${idx}`,
                                    someBoolean: Math.random() > 0.5,
                                    someNull: Math.random() > 0.5 ? null : 'not null'
                                };

                                // eslint-disable-next-line @typescript-eslint/typedef,@typescript-eslint/explicit-function-return-type
                                const random = (min: number, max: number) => min + Math.random() * (max - min);

                                if (cols > 6) {
                                    // eslint-disable-next-line spellcheck/spell-checker
                                    baseRow['About Big Text And More Powerful Label Fugiat Tempor Sunt Nostrud'] =
                                        Array.from({ length: Math.ceil(random(0, 1000)) })
                                            .fill(null)
                                            .map((): string => (~~(Math.random() * 36)).toString(36))
                                            .join('');

                                    for (let i: number = 6; i <= cols - 1; i++) {
                                        baseRow[`column-${i}`] = `$row-${idx} $col-${i}`;
                                    }
                                }

                                return baseRow;
                            }
                        );
                    }
                }

                return FakeGenerator.generateTable(data.rows, data.cols, data.start);
            },
            { rows: rowsNumber, cols: colsNumber, start: startIndex }
        );
    }
}
