import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@angular-ru/common/typings';

import { ProduceDisableFn } from '../interfaces/table-builder.external';

@Pipe({ name: 'disableRow' })
export class DisableRowPipe implements PipeTransform {
    public transform<T>(item: Nullable<T>, producer: ProduceDisableFn<T>): boolean {
        return producer ? producer(item) : false;
    }
}
