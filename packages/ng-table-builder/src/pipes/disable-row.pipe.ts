import { Pipe, PipeTransform } from '@angular/core';

import { ProduceDisableFn, TableRow } from '../interfaces/table-builder.external';

@Pipe({ name: 'disableRow', pure: true })
export class DisableRowPipe implements PipeTransform {
    public transform(item: TableRow, producer: ProduceDisableFn): boolean {
        return producer ? producer(item) : false;
    }
}
