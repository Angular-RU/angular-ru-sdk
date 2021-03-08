import { Inject, Injectable, OnDestroy, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { exclude } from '@angular-ru/common/array';
import { isFunctionLike } from '@angular-ru/common/function';
import { Any } from '@angular-ru/common/typings';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ControlValueAccessorPatcher } from './control-value-accessor-patcher';
import { ControlValueInterceptorDescriptor } from './control-value-interceptor-descriptor.interface';

@Injectable()
export class ControlValueInterceptor<ModelValue = unknown, ViewValue = ModelValue> implements OnDestroy {
    private onDestroy: Subject<void> = new Subject<void>();
    private readonly interceptor: ControlValueAccessorPatcher<ModelValue, ViewValue>;
    private controlValueOperators: ControlValueInterceptorDescriptor<Any, Any>[] = [];

    constructor(@Inject(NG_VALUE_ACCESSOR) @Self() accessors: ControlValueAccessor[]) {
        const [accessor]: ControlValueAccessor[] = accessors;
        this.interceptor = new ControlValueAccessorPatcher(accessor);
        this.makeSequencesAndPassValues();
    }

    public ngOnDestroy(): void {
        this.interceptor.detach();
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    public attach<MediatorModelValue = Any, MediatorViewValue = MediatorModelValue>(
        descriptor: ControlValueInterceptorDescriptor<MediatorModelValue, MediatorViewValue>
    ): void {
        this.controlValueOperators = this.controlValueOperators.concat(descriptor);
    }

    public detach<MediatorModelValue = Any, MediatorViewValue = MediatorModelValue>(
        descriptor: ControlValueInterceptorDescriptor<MediatorModelValue, MediatorViewValue>
    ): void {
        this.controlValueOperators = this.controlValueOperators.filter(exclude(descriptor));
    }

    private toModelValueConveyor(viewValue: ViewValue): ModelValue {
        let value: Any = viewValue;
        for (const operator of this.controlValueOperators) {
            value = isFunctionLike(operator.toModelValue) ? operator.toModelValue(value) : value;
        }
        return value as ModelValue;
    }

    private toViewValueConveyor(modelValue: ModelValue): ViewValue {
        let value: Any = modelValue;
        for (const operator of this.controlValueOperators) {
            value = isFunctionLike(operator.toViewValue) ? operator.toViewValue(value) : value;
        }
        return value as ViewValue;
    }

    private makeSequencesAndPassValues(): void {
        this.listenViewConvertToModelValue();
        this.listenModelConvertToViewValue();
    }

    private listenModelConvertToViewValue(): void {
        this.interceptor.onModelValueChanged
            .pipe(
                map((modelValue: ModelValue): ViewValue => this.toViewValueConveyor(modelValue)),
                takeUntil(this.onDestroy)
            )
            .subscribe((viewValue: ViewValue): void => this.interceptor.pushViewValue(viewValue));
    }

    private listenViewConvertToModelValue(): void {
        this.interceptor.onViewValueChanged
            .pipe(
                map((viewValue: ViewValue): ModelValue => this.toModelValueConveyor(viewValue)),
                takeUntil(this.onDestroy)
            )
            .subscribe((modelValue: ModelValue): void => this.interceptor.pushModelValue(modelValue));
    }
}
