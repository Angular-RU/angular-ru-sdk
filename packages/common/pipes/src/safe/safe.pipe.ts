import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeType, SafeTypeOptions, SafeValueType } from './safe.interfaces';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) {}

    // eslint-disable-next-line complexity
    public transform(value: string | undefined, type: SafeTypeOptions): SafeType | string {
        const prepared: string = value ?? '';
        switch (type) {
            case SafeValueType.HTML:
                return this.sanitizer.bypassSecurityTrustHtml(prepared);
            case SafeValueType.STYLE:
                return this.sanitizer.bypassSecurityTrustStyle(prepared);
            case SafeValueType.SCRIPT:
                return this.sanitizer.bypassSecurityTrustScript(prepared);
            case SafeValueType.URL:
                return this.sanitizer.bypassSecurityTrustUrl(prepared);
            case SafeValueType.RESOURCE_URL:
                return this.sanitizer.bypassSecurityTrustResourceUrl(prepared);
            default:
                throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}
