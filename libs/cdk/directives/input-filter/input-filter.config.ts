import {Injectable} from '@angular/core';
import {FilterPredicate} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';

@Injectable()
export class InputFilterConfig {
    public default: Nullable<FilterPredicate> = null;
}
