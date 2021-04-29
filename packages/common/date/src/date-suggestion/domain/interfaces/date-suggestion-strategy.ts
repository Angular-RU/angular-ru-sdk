import { AbstractControl } from '@angular/forms';
import { DateIntervalDescriptor } from '@angular-ru/common/typings';

export interface DateSuggestionStrategy {
    updateIntervalFor(control: AbstractControl, dateIntervalDescriptor: DateIntervalDescriptor): void;
}
