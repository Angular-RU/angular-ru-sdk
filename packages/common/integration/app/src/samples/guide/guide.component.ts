import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'guide',
    templateUrl: './guide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideComponent {
    public form: FormGroup = this.fb.group({ sum: null });

    constructor(private readonly fb: FormBuilder) {}
}
