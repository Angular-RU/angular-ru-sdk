/* eslint-disable no-magic-numbers,@typescript-eslint/no-magic-numbers */
import { TableRow } from '../../../../src/interfaces/table-builder.external';
import { Any } from '../../../../src/interfaces/table-builder.internal';
import { WebWorkerThreadService } from '../../../../src/worker/worker-thread.service';

export class MocksGenerator {
    // eslint-disable-next-line max-lines-per-function
    public static generator(rowsNumber: number, colsNumber: number, startIndex: number = 0): Promise<TableRow[]> {
        return new WebWorkerThreadService().run<TableRow[], Any>(
            // eslint-disable-next-line max-lines-per-function
            (data: Any): TableRow[] => {
                class FakeGenerator {
                    // eslint-disable-next-line max-lines-per-function
                    public static generateTable(rows: number, cols: number, start: number): TableRow[] {
                        // eslint-disable-next-line max-lines-per-function
                        return new Array(rows).fill(0).map(
                            // eslint-disable-next-line max-lines-per-function
                            (_: unknown, index: number): TableRow => {
                                const idx: number = start + index + 1;

                                const baseRow: TableRow = {
                                    id: idx,
                                    reverseId: Math.round(Math.random() + rows * 512 + cols + start * 10) * 1024,
                                    name: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                    description: 'Random - ' + ((Math.random() + 1) * 100).toFixed(0) + '__' + idx,
                                    guid: '5cdae5b2ba0a57f709b72142' + '__' + idx
                                };

                                // eslint-disable-next-line @typescript-eslint/tslint/config,@typescript-eslint/explicit-function-return-type
                                const random = (min: number, max: number) => min + Math.random() * (max - min);

                                if (cols > 6) {
                                    baseRow['About Big Text And More Powerful Label Fugiat Tempor Sunt Nostrud'] = [
                                        ...Array(Math.ceil(random(0, 1000)))
                                    ]
                                        .map((): string => (~~(Math.random() * 36)).toString(36))
                                        .join('');

                                    for (let i: number = 6; i <= cols - 1; i++) {
                                        baseRow['column-' + i] = `$row-${idx} $col-${i}`;
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
