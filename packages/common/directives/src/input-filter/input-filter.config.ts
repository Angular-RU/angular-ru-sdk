import { Injectable } from '@angular/core';
import { FilterPredicate } from '@angular-ru/common/string';
import { Nullable } from '@angular-ru/common/typings';

@Injectable()
export class InputFilterConfig {
    public default: Nullable<FilterPredicate> = null;
}
