import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ngx-menu-content',
    templateUrl: './ngx-menu-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxMenuContentComponent {
    @Input() public icon: string | null = null;
    @Input('no-margin') public noMargin: boolean | null = null;
    @Input('align-center') public alignCenter: boolean | null = null;

    @HostBinding('class')
    public get class(): string {
        const cssClasses: string = `${this.noMargin === null ? '' : 'content-phrase'}`;
        return this.icon === null ? cssClasses : `icon-place ${cssClasses}`;
    }
}
