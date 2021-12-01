/* eslint-disable spellcheck/spell-checker */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { REG_EXP_ONLY_NUMBERS } from './properties/constants';

@Component({
    selector: 'input-filter',
    templateUrl: './input-filter.component.html',
    styleUrls: ['./input-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFilterComponent {
    public value: string = 'abc';
    public valueNumbers: string = '123';
    public filterRegExp: RegExp = /[a-z]+/;
    public onlyNumbers: RegExp = REG_EXP_ONLY_NUMBERS;
    public filterControl: FormControl = new FormControl(this.value);
}
