import {PlainObject} from '@angular-ru/cdk/typings';

export class MocksGenerator {
    public static async generator(
        rowsNumber: number,
        colsNumber: number,
        startIndex = 0,
    ): Promise<PlainObject[]> {
        const worker = new Worker(new URL('./mocks-generator.worker', import.meta.url));

        return new Promise<PlainObject[]>(
            (resolve: (value: PlainObject[]) => void): void => {
                worker.onmessage = ({data}: {data: PlainObject[]}) => {
                    resolve(data);
                };

                worker.postMessage({
                    rows: rowsNumber,
                    cols: colsNumber,
                    start: startIndex,
                });
            },
        );
    }
}
