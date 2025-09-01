import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {AmountFormat, InputFilter} from '@angular-ru/cdk/directives';

import {REG_EXP_ONLY_NUMBERS} from './properties/constants';

@Component({
    selector: 'guide',
    imports: [
        AmountFormat,
        InputFilter,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule,
    ],
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GuideComponent {
    private readonly fb = inject(FormBuilder);

    public value = 'abc';
    public valueNumbers = '123';
    public filterRegExp = /[a-z]+/;
    public onlyNumbers: RegExp = REG_EXP_ONLY_NUMBERS;
    public amountForm: FormGroup = this.fb.group({sum: null});
    public filterControl: FormControl = new FormControl(this.value);
}
