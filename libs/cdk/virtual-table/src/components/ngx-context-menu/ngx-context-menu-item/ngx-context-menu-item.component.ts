/* eslint-disable @angular-eslint/no-input-rename */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { coerceBoolean } from '@angular-ru/cdk/coercion';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { detectChanges, getBodyRect } from '@angular-ru/cdk/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContextItemEvent } from '../../../interfaces/table-builder.external';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';
import { ContextMenuState } from '../../../services/context-menu/context-menu-state';
import { MIN_PADDING_CONTEXT_ITEM, SCROLLBAR_SIZE } from '../../../table-builder.properties';

const MENU_WIDTH: number = 300;

@Component({
    selector: 'ngx-context-menu-item',
    templateUrl: './ngx-context-menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuItemComponent<T = Any> implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    private taskId: Nullable<number> = null;
    private readonly contextMenu: ContextMenuService<T>;
    private readonly ngZone: NgZone;
    @Input() public visible: string | boolean = true;
    @Input() public contextTitle: Nullable<string | boolean> = null;
    @Input() public disable: Nullable<string | boolean> = false;
    @Input() public divider: Nullable<string | boolean> = false;
    @Input('disable-sub-menu') public disableSubMenu: boolean = false;
    @Input('sub-menu-width') public subMenuWidth: number = MENU_WIDTH;
    // TODO: should be rename (breaking changes)
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() public readonly onClick: EventEmitter<ContextItemEvent> = new EventEmitter();
    @ViewChild('item', { static: false }) public itemRef: Nullable<ElementRef<HTMLDivElement>> = null;
    public offsetX: Nullable<number> = null;
    public offsetY: Nullable<number> = null;

    constructor(private readonly cd: ChangeDetectorRef, injector: Injector) {
        this.contextMenu = injector.get<ContextMenuService<T>>(ContextMenuService);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

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
        this.contextMenu.events$.pipe(takeUntil(this.destroy$)).subscribe((): void => detectChanges(this.cd));
    }

    public ngOnDestroy(): void {
        this.itemRef = null;
        this.destroy$.next();
        this.destroy$.complete();
    }

    public calculateSubMenuPosition(ref: HTMLDivElement): void {
        const contentExist: boolean = ref.innerHTML.trim().length > 0;

        if (contentExist) {
            this.offsetX = this.clientRect.left! + this.subMenuWidth - MIN_PADDING_CONTEXT_ITEM;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top! - MIN_PADDING_CONTEXT_ITEM;
            this.offsetY = this.offsetY - this.overflowY(ref);
            this.deferUpdateView();
        }
    }

    public overflowX(): number {
        const overflowX: number = this.subMenuWidth + this.offsetX! - (getBodyRect()?.width ?? 0);

        return overflowX > 0 ? overflowX + SCROLLBAR_SIZE : 0;
    }

    public overflowY(ref: HTMLDivElement): number {
        const overflowY: number = ref.offsetHeight + this.offsetY! - (getBodyRect()?.height ?? 0);

        return overflowY > 0 ? overflowY + SCROLLBAR_SIZE : 0;
    }

    public emitClick(event: MouseEvent): void {
        if (coerceBoolean(this.disable)) {
            return;
        }

        this.deferCloseMenu();

        this.onClick.emit({
            preventDefault: (): void => {
                window.clearTimeout(this.taskId!);
            }
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
            window.clearInterval(this.taskId!);
            // eslint-disable-next-line no-restricted-properties
            this.taskId = window.setTimeout((): void => detectChanges(this.cd));
        });
    }
}
