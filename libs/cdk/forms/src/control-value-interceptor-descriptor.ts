import { Any } from '@angular-ru/cdk/typings';

export interface ControlValueInterceptorDescriptor<ModelValue = Any, ViewValue = ModelValue> {
    toViewValue?: (modelValue: ModelValue) => ViewValue;
    toModelValue?: (viewValue: ViewValue) => ModelValue;
}
