import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'amount-format',
    templateUrl: './amount-format.component.html',
    styleUrls: ['./amount-format.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountFormatComponent {
    public amountForm: FormGroup = this.fb.group({ sum: null });

    constructor(private readonly fb: FormBuilder) {}
}
