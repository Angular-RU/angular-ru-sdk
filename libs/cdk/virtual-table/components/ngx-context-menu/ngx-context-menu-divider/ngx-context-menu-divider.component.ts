import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
    standalone: false,
    selector: 'ngx-context-menu-divider',
    template: '<div class="context-menu__divider"></div>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxContextMenuDividerComponent {}
