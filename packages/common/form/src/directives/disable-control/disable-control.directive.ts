import { PlainObject } from '@angular-ru/common/typings';
import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[disableControl]' })
export class DisableControlDirective {
    constructor(private readonly ngControl: NgControl) {}

    @Input()
    public set disableControl(condition: boolean) {
        const action: string = condition ? 'disable' : 'enable';
        (this.ngControl?.control as PlainObject)?.[action]?.();
    }
}
