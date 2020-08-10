import { detectChanges } from '@angular-ru/common/utils';
import {
    ApplicationRef,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Injector,
    NgZone,
    OnDestroy,
    ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MousePosition } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { FilterableService } from '../../services/filterable/filterable.service';
import { UtilsService } from '../../services/utils/utils.service';
import { MINIMAL_TIMEOUT, SCROLLBAR_WIDTH } from '../../symbols';

export interface PositionState {
    key: string | null;
    opened: boolean | null;
    position: MousePosition;
}

@Directive()
export abstract class AbstractModalViewLayer<T extends PositionState> implements OnDestroy {
    public width: number | null = null;
    public height: number | null = null;
    public isViewed: boolean = false;
    public isRendered: boolean = false;
    public minHeight: number | null = null;
    protected subscription: Subscription | null = null;
    protected readonly app: ApplicationRef;
    protected readonly utils: UtilsService;
    protected readonly filterable: FilterableService;
    protected readonly ngZone: NgZone;
    protected readonly contextMenu: ContextMenuService;

    @ViewChild('menu', { static: false })
    protected menu!: ElementRef<HTMLDivElement>;

    protected constructor(protected readonly cd: ChangeDetectorRef, injector: Injector) {
        this.app = injector.get<ApplicationRef>(ApplicationRef);
        this.utils = injector.get<UtilsService>(UtilsService);
        this.filterable = injector.get<FilterableService>(FilterableService);
        this.ngZone = injector.get<NgZone>(NgZone);
        this.contextMenu = injector.get<ContextMenuService>(ContextMenuService);
    }

    public get left(): number {
        return (this.state.position && this.state.position.left) || 0;
    }

    public get top(): number {
        return (this.state.position && this.state.position.top) || 0;
    }

    public get overflowX(): number {
        const overflowX: number = this.width! + this.left - (this.utils.bodyRect?.width ?? 0);
        return overflowX > 0 ? overflowX + SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.calculatedHeight + this.top - (this.utils.bodyRect?.height ?? 0);
        return overflowY > 0 ? overflowY + SCROLLBAR_WIDTH : 0;
    }

    public abstract get state(): Partial<T>;

    public get calculatedHeight(): number {
        let height: number | null;

        try {
            if (this.height) {
                height =
                    this.menu.nativeElement.scrollHeight > this.height
                        ? this.menu.nativeElement.offsetHeight
                        : this.height;
            } else {
                height = this.menu.nativeElement.scrollHeight;
            }
        } catch (e) {
            height = this.height;
        }

        return height!;
    }

    public ngOnDestroy(): void {
        if (!this.subscription?.closed) {
            this.subscription?.unsubscribe();
        }
    }

    public abstract close(event: MouseEvent): void;

    protected update(): void {
        this.isViewed = !!this.state.opened;
        this.isRendered = true;
        detectChanges(this.cd);
        this.app.tick();

        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => {
                detectChanges(this.cd);
                window.setTimeout((): void => {
                    this.minHeight = this.calculatedHeight;
                    detectChanges(this.cd);
                }, MINIMAL_TIMEOUT);
            }, MINIMAL_TIMEOUT);
        });
    }
}
