import { InjectionToken } from '@angular/core';

export const enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export const FIRST_DAY_OF_WEEK: InjectionToken<DayOfWeek> = new InjectionToken<DayOfWeek>('First day of week', {
    factory: (): DayOfWeek => DayOfWeek.Monday
});
