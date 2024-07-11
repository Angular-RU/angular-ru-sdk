import {Directive, Input} from '@angular/core';
import {ControlValueInterceptor} from '@angular-ru/cdk/forms';
import {trim} from '@angular-ru/cdk/string';
import {checkValueIsFilled} from '@angular-ru/cdk/utils';

import {SplitStringOptions} from './split-string-options';

@Directive({
    selector: '[splitString]',
    providers: [ControlValueInterceptor],
})
export class SplitStringDirective {
    private readonly defaultSplitOptions: SplitStringOptions = {
        separator: /[\n,;]/g,
        joinWith: ', ',
    };

    @Input()
    public splitOptions?: Partial<SplitStringOptions>;

    constructor(interceptor: ControlValueInterceptor) {
        interceptor.attach({
            toModelValue: (viewValue: string): string[] =>
                this.splitAndTrimViewValue(viewValue),
            toViewValue: (modelValue: string[] | string): string =>
                Array.isArray(modelValue)
                    ? modelValue.join(
                          this.splitOptions?.joinWith ??
                              this.defaultSplitOptions.joinWith,
                      )
                    : modelValue,
        });
    }

    private splitAndTrimViewValue(viewValue: string): string[] {
        const separator: RegExp | string =
            this.splitOptions?.separator ?? this.defaultSplitOptions.separator;

        return viewValue
            .split(separator)
            .map((element: string): string => trim(element))
            .filter((element: string): element is string => checkValueIsFilled(element));
    }
}
