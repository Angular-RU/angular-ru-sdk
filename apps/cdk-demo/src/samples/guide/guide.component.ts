import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {REG_EXP_ONLY_NUMBERS} from './properties/constants';

@Component({
    standalone: false,
    selector: 'guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideComponent {
    public value = 'abc';
    public valueNumbers = '123';
    public filterRegExp = /[a-z]+/;
    public onlyNumbers: RegExp = REG_EXP_ONLY_NUMBERS;
    public amountForm: FormGroup = this.fb.group({sum: null});
    public filterControl: FormControl = new FormControl(this.value);

    constructor(private readonly fb: FormBuilder) {}
}
