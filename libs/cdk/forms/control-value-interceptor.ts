import {inject, Injectable, OnDestroy} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {exclude} from '@angular-ru/cdk/array';
import {isFunctionLike} from '@angular-ru/cdk/function';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {ControlValueAccessorPatcher} from './control-value-accessor-patcher';
import {ControlValueInterceptorDescriptor} from './control-value-interceptor-descriptor';

@Injectable()
export class ControlValueInterceptor<ModelValue = unknown, ViewValue = ModelValue>
    implements OnDestroy
{
    private readonly onDestroy$: Subject<void> = new Subject<void>();
    private readonly interceptor?: ControlValueAccessorPatcher<ModelValue, ViewValue>;
    private controlValueOperators: ControlValueInterceptorDescriptor[] = [];

    constructor() {
        const accessors = inject(NG_VALUE_ACCESSOR, {self: true});

        const [accessor] = accessors;

        if (accessor) {
            this.interceptor = new ControlValueAccessorPatcher(accessor);
        }

        this.makeSequencesAndPassValues();
    }

    public ngOnDestroy(): void {
        this.interceptor?.detach();
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    public attach<MediatorModelValue = any, MediatorViewValue = MediatorModelValue>(
        descriptor: ControlValueInterceptorDescriptor<
            MediatorModelValue,
            MediatorViewValue
        >,
    ): void {
        this.controlValueOperators = this.controlValueOperators.concat(descriptor);
    }

    public detach<MediatorModelValue = any, MediatorViewValue = MediatorModelValue>(
        descriptor: ControlValueInterceptorDescriptor<
            MediatorModelValue,
            MediatorViewValue
        >,
    ): void {
        this.controlValueOperators = this.controlValueOperators.filter(
            exclude(descriptor),
        );
    }

    private toModelValue(viewValue: ViewValue): ModelValue {
        let value: any = viewValue;

        for (const operator of this.controlValueOperators) {
            value = isFunctionLike(operator.toModelValue)
                ? operator.toModelValue(value)
                : value;
        }

        return value as ModelValue;
    }

    private toViewValue(modelValue: ModelValue): ViewValue {
        let value: any = modelValue;

        for (const operator of this.controlValueOperators) {
            value = isFunctionLike(operator.toViewValue)
                ? operator.toViewValue(value)
                : value;
        }

        return value as ViewValue;
    }

    private makeSequencesAndPassValues(): void {
        this.listenViewConvertToModelValue();
        this.listenModelConvertToViewValue();
    }

    private listenModelConvertToViewValue(): void {
        this.interceptor?.onModelValueChanged$
            .pipe(
                map((modelValue: ModelValue): ViewValue => this.toViewValue(modelValue)),
                takeUntil(this.onDestroy$),
            )
            .subscribe((viewValue: ViewValue): void =>
                this.interceptor?.pushViewValue(viewValue),
            );
    }

    private listenViewConvertToModelValue(): void {
        this.interceptor?.onViewValueChanged$
            .pipe(
                map((viewValue: ViewValue): ModelValue => this.toModelValue(viewValue)),
                takeUntil(this.onDestroy$),
            )
            .subscribe((modelValue: ModelValue): void =>
                this.interceptor?.pushModelValue(modelValue),
            );
    }
}
