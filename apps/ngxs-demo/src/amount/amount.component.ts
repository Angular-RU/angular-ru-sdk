import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AmountState} from './amount.state';
import {PriceState} from './price.state';

@Component({
    selector: 'amount',
    imports: [FormsModule],
    templateUrl: './amount.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmountComponent {
    public price = inject(PriceState);
    public amount = inject(AmountState);
}
