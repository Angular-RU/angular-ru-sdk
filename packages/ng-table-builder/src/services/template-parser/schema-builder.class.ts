import { ColumnsSchema } from '../../interfaces/table-builder.external';
import { DeepPartial } from '../../interfaces/table-builder.internal';

export class SchemaBuilder {
    constructor(public columns: ColumnsSchema[] = []) {}

    public exportColumns(): DeepPartial<ColumnsSchema>[] {
        return this.columns.map(
            (column: ColumnsSchema): DeepPartial<ColumnsSchema> => ({
                key: column.key,
                width: column.width,
                isVisible: column.isVisible,
                isModel: column.isModel
            })
        );
    }
}
