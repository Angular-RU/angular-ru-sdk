import { ControlValueAccessor } from '@angular/forms';
import { Any } from '@angular-ru/common/typings';
import { Observable, Subject } from 'rxjs';

export class ControlValueAccessorPatcher<ModelValue = Any, ViewValue = ModelValue> {
    public readonly onViewValueChanged: Observable<ViewValue>;
    public readonly onModelValueChanged: Observable<ModelValue>;

    private readonly onViewValueChangedSubject: Subject<ViewValue> = new Subject<ViewValue>();
    private readonly onModelValueChangedSubject: Subject<ModelValue> = new Subject<ModelValue>();

    private readonly accessor: ControlValueAccessor;
    private readonly writeViewValueFunction: (viewValue: ViewValue) => void;
    private readonly registerOnViewValueChangeFunction: (
        onViewValueChangeFunction: (viewValue: ViewValue) => void
    ) => void;
    private onModelValueChangeFunction?: (modelValue: ModelValue) => void;

    constructor(accessor: ControlValueAccessor) {
        this.onViewValueChanged = this.onViewValueChangedSubject.asObservable();
        this.onModelValueChanged = this.onModelValueChangedSubject.asObservable();

        this.accessor = accessor;
        this.writeViewValueFunction = this.accessor.writeValue.bind(this.accessor);
        this.registerOnViewValueChangeFunction = this.accessor.registerOnChange.bind(this.accessor);

        this.accessor.registerOnChange = (onModelValueChangeFunction: (modelValue: ModelValue) => void): void => {
            this.onModelValueChangeFunction = onModelValueChangeFunction;
            const proxyUpdateViewValue = (viewValue: ViewValue): void => {
                this.onViewValueChangedSubject.next(viewValue);
            };
            this.registerOnViewValueChangeFunction(proxyUpdateViewValue);
        };

        this.accessor.writeValue = (modelValue: ModelValue): void => {
            this.onModelValueChangedSubject.next(modelValue);
        };
    }

    public pushModelValue(modelValue: ModelValue): void {
        this.onModelValueChangeFunction?.(modelValue);
    }

    public pushViewValue(viewValue: ViewValue): void {
        this.writeViewValueFunction(viewValue);
    }

    public detach(): void {
        this.accessor.registerOnChange = this.registerOnViewValueChangeFunction;
        this.accessor.registerOnChange(this.onModelValueChangeFunction);
        this.accessor.writeValue = this.writeViewValueFunction;
    }
}
