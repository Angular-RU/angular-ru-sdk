import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ensureRegexp, isRegexpStr} from '@angular-ru/cdk/regexp';
import {toStringValue} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

import {MarkedValue} from './marked-value';

@Pipe({standalone: false, name: 'markByFilter'})
export class MarkByFilterPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    public transform(
        value: Nullable<string>,
        filter?: Nullable<string>,
        color = '#ffdd2d',
    ): MarkedValue {
        return isNotNil(filter) ? this.search(value, filter, color) : value;
    }

    private search(value: Nullable<string>, filter: string, color: string): SafeHtml {
        if (isNotNil(value)) {
            const highlighted: string = this.highLightingString(
                toStringValue(value),
                toStringValue(filter),
                color,
            );

            return this.sanitizer.bypassSecurityTrustHtml(highlighted);
        }

        return '';
    }

    private highLightingString(value: string, filter: string, color: string): string {
        try {
            const regexp: RegExp = isRegexpStr(filter)
                ? new RegExp(ensureRegexp(filter), 'ig')
                : new RegExp(filter, 'i');

            return value
                ?.toString()
                ?.replace(
                    regexp,
                    (founded: string): string =>
                        `<span style="background: ${color}">${founded}</span>`,
                );
        } catch {
            return value;
        }
    }
}
