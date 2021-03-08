import { Directive, Input } from '@angular/core';
import { ControlValueInterceptor, ControlValueInterceptorDescriptor } from '@angular-ru/common/forms';
import { isNotNil } from '@angular-ru/common/utils';

@Directive({
    selector: '[trim]',
    providers: [ControlValueInterceptor]
})
export class TrimDirective {
    constructor(private readonly interceptor: ControlValueInterceptor) {
        this.interceptor.attach({ toModelValue: (inline: string): string => inline.trim() });
    }
}

@Directive({
    selector: '[autoSplit]',
    providers: [ControlValueInterceptor]
})
export class AutoSplitDirective {
    private descriptor?: ControlValueInterceptorDescriptor;
    @Input('autoSplit') public set enable(enable: string | boolean) {
        if (enable || typeof enable === 'string') {
            this.descriptor = {
                toModelValue: (inline: string): string[] => (isNotNil(',') ? inline.split(',') : [inline]),
                toViewValue: (value: string[] | string): string => (Array.isArray(value) ? value.join(', ') : value)
            };
            this.interceptor.attach(this.descriptor);
        } else if (this.descriptor) {
            this.interceptor.detach(this.descriptor);
        }
    }
    constructor(private readonly interceptor: ControlValueInterceptor) {}
}
