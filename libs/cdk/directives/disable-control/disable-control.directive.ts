import {Directive, effect, inject, input} from '@angular/core';
import {NgControl} from '@angular/forms';
import {PlainObject} from '@angular-ru/cdk/typings';

@Directive({selector: '[disableControl]'})
export class DisableControl {
    private readonly ngControl = inject<NgControl>(NgControl, {optional: true})!;

    constructor() {
        this.setControlStateOnInputChange();
    }

    private setControlStateOnInputChange() {
        effect(() => {
            const disable = this.disableControl();
            const action: string = disable ? 'disable' : 'enable';

            (this.ngControl?.control as PlainObject)?.[action]?.();
        });
    }

    public readonly disableControl = input(false);
}
