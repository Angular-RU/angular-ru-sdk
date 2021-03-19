import { Pipe, PipeTransform } from '@angular/core';

import { ProduceDisableFn } from '../interfaces/table-builder.external';

@Pipe({ name: 'disableRow' })
export class DisableRowPipe implements PipeTransform {
    public transform<T>(item: T | null | undefined, producer: ProduceDisableFn<T>): boolean {
        return producer ? producer(item) : false;
    }
}
