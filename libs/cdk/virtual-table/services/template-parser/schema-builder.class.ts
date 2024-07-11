import {DeepPartial} from '@angular-ru/cdk/typings';

import {ColumnsSchema} from '../../interfaces/table-builder.external';

export class SchemaBuilder {
    constructor(public columns: ColumnsSchema[] = []) {}

    public exportColumns(): Array<DeepPartial<ColumnsSchema>> {
        return this.columns.map(
            (column: ColumnsSchema): DeepPartial<ColumnsSchema> => ({
                key: column.key,
                width: column.width,
                isVisible: column.isVisible,
                isModel: column.isModel,
            }),
        );
    }
}
