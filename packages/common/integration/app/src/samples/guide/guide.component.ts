import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent {
    public amountForm: FormGroup = this.fb.group({ sum: null });
    public filterForm: FormGroup = this.fb.group({ value: 'abc' });
    public filterRegExp: RegExp = /[a-z]+/;

    constructor(private readonly fb: FormBuilder) {}
}
