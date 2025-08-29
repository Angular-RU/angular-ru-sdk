/* eslint-disable @angular-eslint/no-input-rename */
import {NgStyle} from '@angular/common';
import {input, OnDestroy, OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {detectChanges} from '@angular-ru/cdk/utils';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AbstractModalViewLayer} from '../../directives/abstract-modal-view-layer.directive';
import {ContextMenuState} from '../../services/context-menu/context-menu-state';
import {MINIMAL_TIMEOUT} from '../../table-builder.properties';

const SIZE = 300;
const MAX_HEIGHT = 400;

@Component({
    selector: 'ngx-context-menu',
    imports: [NgStyle],
    templateUrl: './ngx-context-menu.component.html',
    styleUrls: ['./ngx-context-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxContextMenu<T>
    extends AbstractModalViewLayer<T, ContextMenuState<T>>
    implements OnInit, OnDestroy
{
    private readonly destroy$ = new Subject<void>();

    public readonly width = input<Nullable<number>>(SIZE);
    public readonly height = input<Nullable<number>>(SIZE);
    public readonly maxHeight = input<number>(MAX_HEIGHT, {alias: 'max-height'});

    public get state(): ContextMenuState<T> {
        return this.contextMenu.state;
    }

    public ngOnInit(): void {
        this.contextMenu.events$
            .pipe(takeUntil(this.destroy$))
            .subscribe((): void => this.update());
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
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
