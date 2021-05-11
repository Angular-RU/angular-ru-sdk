import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ensureRegexp, isRegexpStr } from '@angular-ru/common/regexp';
import { toStringVal } from '@angular-ru/common/string';
import { Any } from '@angular-ru/common/typings';

import { MarkedValue, Value } from './mark-by-filter.interfaces';

@Pipe({ name: 'markByFilter' })
export class MarkByFilterPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    public transform(value: Value, filter?: Value, color: string = '#ffdd2d'): MarkedValue {
        return filter ? this.search(value, filter, color) : value;
    }

    private search(value: Value, filter?: Value, color?: string): SafeHtml {
        const existFilter: boolean = !!value && !!filter;
        let newString: string | null | undefined = value;

        if (existFilter) {
            newString = this.highLightingString(toStringVal(value), toStringVal(filter), color);
        }

        return this.sanitizer.bypassSecurityTrustHtml(newString as Any);
    }

    private highLightingString(value: string, filter: string, color?: string): string {
        let newString: string;
        let filterValue: string = filter;

        try {
            filterValue = filterValue.replace(/\s/g, '&nbsp;');

            const regexp: RegExp = isRegexpStr(filterValue)
                ? new RegExp(ensureRegexp(filterValue), 'ig')
                : new RegExp(filterValue, 'i');

            newString = value
                ?.toString()
                ?.replace(/\s/g, '&nbsp;')
                ?.replace(regexp, (founded: string): string => `<span style="background: ${color}">${founded}</span>`);
        } catch {
            newString = value;
        }

        return newString;
    }
}
