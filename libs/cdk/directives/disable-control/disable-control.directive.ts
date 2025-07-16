import {Directive, inject, Input} from '@angular/core';
import {NgControl} from '@angular/forms';
import {PlainObject} from '@angular-ru/cdk/typings';

@Directive({selector: '[disableControl]'})
export class DisableControl {
    private readonly ngControl = inject<NgControl>(NgControl, {optional: true})!;

    @Input()
    public set disableControl(condition: boolean) {
        const action: string = condition ? 'disable' : 'enable';

        (this.ngControl?.control as PlainObject)?.[action]?.();
    }
}
