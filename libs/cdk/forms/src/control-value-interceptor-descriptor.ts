export interface ControlValueInterceptorDescriptor<ModelValue = any, ViewValue = ModelValue> {
    toViewValue?: (modelValue: ModelValue) => ViewValue;
    toModelValue?: (viewValue: ViewValue) => ModelValue;
}
