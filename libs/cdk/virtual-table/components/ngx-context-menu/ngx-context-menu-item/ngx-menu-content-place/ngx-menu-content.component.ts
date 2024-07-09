/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

@Component({
    selector: 'ngx-menu-content',
    templateUrl: './ngx-menu-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class NgxMenuContentComponent {
    @Input() public icon: Nullable<string> = null;
    @Input('no-margin') public noMargin: Nullable<string | boolean> = null;
    @Input('align-center') public alignCenter: Nullable<string | boolean> = null;

    @HostBinding('class')
    public get class(): string {
        const cssClasses: string = `${this.noMargin === null ? '' : 'content-phrase'}`;

        return this.icon === null ? cssClasses : `icon-place ${cssClasses}`;
    }
}
