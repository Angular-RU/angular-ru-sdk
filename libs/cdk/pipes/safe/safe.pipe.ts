import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Nullable} from '@angular-ru/cdk/typings';

import {SafeType} from './safe-type';
import {SafeTypeOptions} from './safe-type-options';
import {SafeValueType} from './safe-value-type';

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
    protected sanitizer = inject(DomSanitizer);

    // eslint-disable-next-line complexity
    public transform(value: Nullable<string>, type: SafeTypeOptions): SafeType | string {
        const prepared: string = value ?? '';

        switch (type) {
            case SafeValueType.HTML:
                return this.sanitizer.bypassSecurityTrustHtml(prepared);
            case SafeValueType.RESOURCE_URL:
                return this.sanitizer.bypassSecurityTrustResourceUrl(prepared);
            case SafeValueType.SCRIPT:
                return this.sanitizer.bypassSecurityTrustScript(prepared);
            case SafeValueType.STYLE:
                return this.sanitizer.bypassSecurityTrustStyle(prepared);
            case SafeValueType.URL:
                return this.sanitizer.bypassSecurityTrustUrl(prepared);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}
