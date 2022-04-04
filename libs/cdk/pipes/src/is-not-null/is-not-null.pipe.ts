import { Pipe, PipeTransform } from '@angular/core';

import { isNil } from '@angular-ru/cdk/utils';

@Pipe({ name: 'isNotNull' })
export class IsNotNullPipe implements PipeTransform {
    public transform(value: any): boolean {
        return !isNil(value);
    }
}
