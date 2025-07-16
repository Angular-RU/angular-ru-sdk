/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {coerceBoolean} from '@angular-ru/cdk/coercion';
import {Nullable} from '@angular-ru/cdk/typings';
import {detectChanges, getBodyRect} from '@angular-ru/cdk/utils';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ContextItemEvent} from '../../../interfaces/table-builder.external';
import {ContextMenuService} from '../../../services/context-menu/context-menu.service';
import {ContextMenuState} from '../../../services/context-menu/context-menu-state';
import {
    MIN_PADDING_CONTEXT_ITEM,
    SCROLLBAR_SIZE,
} from '../../../table-builder.properties';
import {NgxContextMenuDivider} from '../ngx-context-menu-divider/ngx-context-menu-divider.component';

const MENU_WIDTH = 300;

@Component({
    selector: 'ngx-context-menu-item',
    imports: [NgxContextMenuDivider],
    templateUrl: './ngx-context-menu-item.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxContextMenuItem<T = any> implements OnInit, OnDestroy {
    private readonly cd = inject<ChangeDetectorRef>(ChangeDetectorRef);

    private readonly destroy$ = new Subject<void>();
    private taskId: Nullable<number> = null;
    private readonly contextMenu = inject(ContextMenuService<T>);
    private readonly ngZone = inject(NgZone);
    @Input()
    public visible: boolean | string = true;

    @Input()
    public contextTitle: Nullable<boolean | string> = null;

    @Input()
    public disable: Nullable<boolean | string> = false;

    @Input()
    public divider: Nullable<boolean | string> = false;

    @Input('disable-sub-menu')
    public disableSubMenu = false;

    @Input('sub-menu-width')
    public subMenuWidth: number = MENU_WIDTH;

    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output()
    public readonly onClick = new EventEmitter<ContextItemEvent>();

    @ViewChild('item', {static: false})
    public itemRef: Nullable<ElementRef<HTMLDivElement>> = null;

    public offsetX: Nullable<number> = null;
    public offsetY: Nullable<number> = null;

    public get state(): ContextMenuState<T> {
        return this.contextMenu.state;
    }

    public get clientRect(): Partial<DOMRect> {
        return this.itemElement.getBoundingClientRect?.() ?? {};
    }

    private get itemElement(): Partial<HTMLDivElement> {
        return this.itemRef?.nativeElement ?? {};
    }

    public ngOnInit(): void {
        this.contextMenu.events$
            .pipe(takeUntil(this.destroy$))
            .subscribe((): void => detectChanges(this.cd));
    }

    public ngOnDestroy(): void {
        this.itemRef = null;
        this.destroy$.next();
        this.destroy$.complete();
    }

    public calculateSubMenuPosition(ref: HTMLDivElement): void {
        const contentExist: boolean = ref.innerHTML.trim().length > 0;

        if (contentExist) {
            this.offsetX =
                this.clientRect.left! + this.subMenuWidth - MIN_PADDING_CONTEXT_ITEM;
            this.offsetX -= this.overflowX();
            this.offsetY = this.clientRect.top! - MIN_PADDING_CONTEXT_ITEM;
            this.offsetY -= this.overflowY(ref);
            this.deferUpdateView();
        }
    }

    public overflowX(): number {
        const overflowX: number =
            this.subMenuWidth + (this.offsetX ?? 0) - (getBodyRect()?.width ?? 0);

        return overflowX > 0 ? overflowX + SCROLLBAR_SIZE : 0;
    }

    public overflowY(ref: HTMLDivElement): number {
        const overflowY: number =
            ref.offsetHeight + (this.offsetY ?? 0) - (getBodyRect()?.height ?? 0);

        return overflowY > 0 ? overflowY + SCROLLBAR_SIZE : 0;
    }

    public emitClick(event: MouseEvent): void {
        if (coerceBoolean(this.disable)) {
            return;
        }

        this.deferCloseMenu();

        this.onClick.emit({
            preventDefault: (): void => {
                window.clearTimeout(this.taskId ?? 0);
            },
        });

        event.stopPropagation();
    }

    private deferCloseMenu(): void {
        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            this.taskId = window.setTimeout((): void => this.contextMenu.close());
        });
    }

    private deferUpdateView(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.taskId ?? 0);
            // eslint-disable-next-line no-restricted-properties
            this.taskId = window.setTimeout((): void => detectChanges(this.cd));
        });
    }
}
