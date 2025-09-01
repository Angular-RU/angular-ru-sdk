import {PlainObject} from '@angular-ru/cdk/typings';
import {
    randAwsRequestId,
    randBetweenDate,
    randBoolean,
    randCatchPhrase,
    randNumber,
    randProductDescription,
    randProductName,
    randUuid,
} from '@ngneat/falso';

interface DataType {
    rows: number;
    cols: number;
    start: number;
}

addEventListener('message', ({data}: {data: DataType}) => {
    const {rows, cols, start} = data;
    const startDate: Date = new Date();
    const endDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    const generatedData = Array.from(
        {
            length: rows,
        },
        (_: unknown, index: number): PlainObject => {
            const idx: number = start + index + 1;
            const reverseIdMin = (rows * 512 + cols + start * 10) * 1024;
            const reverseIdMax = reverseIdMin + 1024;

            const baseRow: PlainObject = {
                id: idx,
                reverseId: randNumber({
                    min: reverseIdMin,
                    max: reverseIdMax,
                }),
                someDate: randBetweenDate({
                    from: startDate,
                    to: endDate,
                }).toLocaleDateString(),
                name: randProductName({
                    maxCharCount: 20,
                }),
                description: randProductDescription(),
                uuid: randUuid(),
                someBoolean: randBoolean(),
                someNull: randBoolean() ? null : 'not null',
            };

            if (cols > 7) {
                baseRow[randCatchPhrase()] = randAwsRequestId({
                    maxCharCount: 1e3,
                });

                for (let i = 7; i <= cols - 1; i++) {
                    baseRow[`column-${i}`] = `$row-${idx} $col-${i}`;
                }
            }

            return baseRow;
        },
    );

    postMessage(generatedData);
});
