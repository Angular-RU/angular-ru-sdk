import { Pipe, PipeTransform } from '@angular/core';

import { isNil } from '@angular-ru/cdk/utils';

@Pipe({ name: 'isNil' })
export class IsNilPipe implements PipeTransform {
    public transform(value: any): boolean {
        return isNil(value);
    }
}
