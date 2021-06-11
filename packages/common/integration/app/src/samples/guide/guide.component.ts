import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    styleUrls: ['./guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent {
    public value: string = 'abc';
    public filterRegExp: RegExp = /[a-z]+/;
    public amountForm: FormGroup = this.fb.group({ sum: null });
    public filterControl: FormControl = new FormControl(this.value);

    constructor(private readonly fb: FormBuilder) {}
}
