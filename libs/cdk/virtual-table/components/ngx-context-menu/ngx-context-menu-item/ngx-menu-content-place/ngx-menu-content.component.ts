/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    input,
    ViewEncapsulation,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';

@Component({
    selector: 'ngx-menu-content',
    templateUrl: './ngx-menu-content.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxMenuContent {
    public readonly icon = input<Nullable<string>>(null);

    public readonly noMargin = input<Nullable<boolean | string>>(null, {
        alias: 'no-margin',
    });

    public readonly alignCenter = input<Nullable<boolean | string>>(null, {
        alias: 'align-center',
    });

    @HostBinding('class')
    public get class(): string {
        const cssClasses = `${this.noMargin() === null ? '' : 'content-phrase'}`;

        return this.icon() === null ? cssClasses : `icon-place ${cssClasses}`;
    }
}
