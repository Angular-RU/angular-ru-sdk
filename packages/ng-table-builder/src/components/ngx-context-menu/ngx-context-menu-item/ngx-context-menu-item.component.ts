import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ContextItemEvent } from '../../../interfaces/table-builder.external';
import { detectChanges } from '../../../operators/detect-changes';
import { ContextMenuState } from '../../../services/context-menu/context-menu.interface';
import { ContextMenuService } from '../../../services/context-menu/context-menu.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { MIN_PADDING_CONTEXT_ITEM, SCROLLBAR_WIDTH } from '../../../symbols';

const MENU_WIDTH: number = 300;

@Component({
    selector: 'ngx-context-menu-item',
    templateUrl: './ngx-context-menu-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxContextMenuItemComponent implements OnInit, OnDestroy {
    @Input() public visible: boolean = true;
    @Input() public contextTitle: boolean | null = null;
    @Input() public disable: boolean = false;
    @Input() public divider: boolean = false;
    @Input('disable-sub-menu') public disableSubMenu: boolean = false;
    @Input('sub-menu-width') public subMenuWidth: number = MENU_WIDTH;
    @Output() public onClick: EventEmitter<ContextItemEvent> = new EventEmitter();
    @ViewChild('item', { static: false }) public itemRef: ElementRef<HTMLDivElement> | null = null;
    public offsetX: number | null = null;
    public offsetY: number | null = null;
    private subscription: Subscription | null = null;
    private taskId: number | null = null;
    private readonly contextMenu: ContextMenuService;
    private readonly utils: UtilsService;
    private readonly ngZone: NgZone;

    constructor(private readonly cd: ChangeDetectorRef, injector: Injector) {
        this.contextMenu = injector.get<ContextMenuService>(ContextMenuService);
        this.utils = injector.get<UtilsService>(UtilsService);
        this.ngZone = injector.get<NgZone>(NgZone);
    }

    @HostListener('mouseenter')
    public mouseover(): void {
        if (this.state.opened) {
            detectChanges(this.cd);
        }
    }

    public get state(): ContextMenuState {
        return this.contextMenu.state;
    }

    public get clientRect(): Partial<ClientRect | DOMRect> {
        return (this.itemElement.getBoundingClientRect && this.itemElement.getBoundingClientRect()) || {};
    }

    private get itemElement(): Partial<HTMLDivElement> {
        return (this.itemRef && this.itemRef.nativeElement) || {};
    }

    public ngOnInit(): void {
        this.subscription = this.contextMenu.events.subscribe((): void => detectChanges(this.cd));
    }

    public ngOnDestroy(): void {
        this.itemRef = null;
        if (this.subscription && !this.subscription.closed) {
            this.subscription && this.subscription.unsubscribe();
        }
    }

    public calculateSubMenuPosition(ref: HTMLDivElement): void {
        const contentExist: boolean = ref.innerHTML.trim().length !== 0;
        if (contentExist) {
            this.offsetX = this.clientRect.left! + this.subMenuWidth - MIN_PADDING_CONTEXT_ITEM;
            this.offsetX = this.offsetX - this.overflowX();
            this.offsetY = this.clientRect.top! - MIN_PADDING_CONTEXT_ITEM;
            this.offsetY = this.offsetY - this.overflowY(ref);
            this.deferUpdateView();
        }
    }

    public overflowX(): number {
        const overflowX: number = this.subMenuWidth + this.offsetX! - this.utils.bodyRect?.width!;
        return overflowX > 0 ? overflowX + SCROLLBAR_WIDTH : 0;
    }

    public overflowY(ref: HTMLDivElement): number {
        const overflowY: number = ref.offsetHeight + this.offsetY! - this.utils.bodyRect?.height!;
        return overflowY > 0 ? overflowY + SCROLLBAR_WIDTH : 0;
    }

    public emitClick(event: MouseEvent): void {
        if (!this.disable) {
            this.deferCloseMenu();

            this.onClick.emit({
                preventDefault: (): void => {
                    window.clearTimeout(this.taskId!);
                }
            });

            event.stopPropagation();
        }
    }

    private deferCloseMenu(): void {
        this.ngZone.runOutsideAngular((): void => {
            this.taskId = window.setTimeout((): void => this.contextMenu.close());
        });
    }

    private deferUpdateView(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.taskId!);
            this.taskId = window.setTimeout((): void => detectChanges(this.cd));
        });
    }
}
