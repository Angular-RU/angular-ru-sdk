import {Pipe, PipeTransform} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {ProduceDisableFn} from '../interfaces/table-builder.external';

@Pipe({standalone: false, name: 'disableRow'})
export class DisableRowPipe implements PipeTransform {
    public transform<T>(item: Nullable<T>, producer?: ProduceDisableFn<T>): boolean {
        return isNotNil(producer) ? producer(item) : false;
    }
}
