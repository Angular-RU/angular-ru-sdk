/* eslint-disable @angular-eslint/no-input-rename */
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@angular-ru/cdk/typings';
import { detectChanges } from '@angular-ru/cdk/utils';

import { AbstractModalViewLayerDirective } from '../../directives/abstract-modal-view-layer.directive';
import { ContextMenuState } from '../../services/context-menu/context-menu-state';
import { MINIMAL_TIMEOUT } from '../../table-builder.properties';

const SIZE: number = 300;
const MAX_HEIGHT: number = 400;

@Component({
    selector: 'ngx-context-menu',
    templateUrl: './ngx-context-menu.component.html',
    styleUrls: ['./ngx-context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuComponent<T>
    extends AbstractModalViewLayerDirective<T, ContextMenuState<T>>
    implements OnInit
{
    @Input() public width: Nullable<number> = SIZE;
    @Input() public height: Nullable<number> = SIZE;
    @Input('max-height') public maxHeight: number = MAX_HEIGHT;

    public get state(): ContextMenuState<T> {
        return this.contextMenu.state;
    }

    public ngOnInit(): void {
        this.subscription = this.contextMenu.events$.subscribe((): void => this.update());
    }

    public close(event: MouseEvent): void {
        this.isShowed = false;
        detectChanges(this.cd);

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => {
                this.contextMenu.close();
                event.preventDefault();
            }, MINIMAL_TIMEOUT);
        });
    }
}
