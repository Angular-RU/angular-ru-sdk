/* eslint-disable max-classes-per-file */
// noinspection AngularMissingOrInvalidDeclarationInModule

import {Directive, ElementRef, HostListener, inject, Input} from '@angular/core';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {
    ControlValueInterceptor,
    ControlValueInterceptorDescriptor,
} from '@angular-ru/cdk/forms';
import {isNotNil} from '@angular-ru/cdk/utils';

@Directive({selector: '[trim]', providers: [ControlValueInterceptor]})
export class TrimDirective {
    private readonly interceptor = inject<ControlValueInterceptor>(
        ControlValueInterceptor,
    );

    private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

    constructor() {
        this.interceptor.attach({
            toModelValue: (inline: string): string => inline.trim(),
        });
    }

    @HostListener('blur')
    public onBlur(): void {
        this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.trim();
    }
}

@Directive({
    selector: '[autoSplit]',
    providers: [ControlValueInterceptor],
})
export class AutoSplitDirective {
    private readonly interceptor = inject(ControlValueInterceptor);

    private descriptor?: ControlValueInterceptorDescriptor;

    @Input('autoSplit')
    public set enable(enable: boolean | string) {
        if (coerceBoolean(enable)) {
            this.descriptor = {
                toModelValue: (inline: string): string[] =>
                    isNotNil(',') ? inline.split(',') : [inline],
                toViewValue: (value: string[] | string): string =>
                    Array.isArray(value) ? value.join(', ') : value,
            };
            this.interceptor.attach(this.descriptor);
        } else if (this.descriptor) {
            this.interceptor.detach(this.descriptor);
        }
    }
}
