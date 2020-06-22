import { ApplicationRef, ChangeDetectorRef, ElementRef, Injector, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { MousePosition } from '../../interfaces/table-builder.internal';
import { detectChanges } from '../../operators/detect-changes';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { FilterableService } from '../../services/filterable/filterable.service';
import { UtilsService } from '../../services/utils/utils.service';
import { SCROLLBAR_WIDTH } from '../../symbols';

export interface PositionState {
    key: string | null;
    opened: boolean | null;
    position: MousePosition;
}

// eslint-disable-next-line
export abstract class ModalViewLayer<T extends PositionState> implements OnDestroy {
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
        const overflowX: number = this.width! + this.left - this.utils.bodyRect?.width!;
        return overflowX > 0 ? overflowX + SCROLLBAR_WIDTH : 0;
    }

    public get overflowY(): number {
        const overflowY: number = this.calculatedHeight + this.top - this.utils.bodyRect?.height!;
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

    public updateView(): void {
        detectChanges(this.cd);

        this.ngZone.runOutsideAngular((): void => {
            window.requestAnimationFrame((): void => {
                detectChanges(this.cd);
                this.refresh();
            });
        });
    }

    public ngOnDestroy(): void {
        if (!this.subscription?.closed) {
            this.subscription?.unsubscribe();
        }
    }

    public abstract close(event: MouseEvent): void;

    protected update(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => {
                this.isViewed = !!this.state.opened;
                this.updateView();
                window.setTimeout((): void => this.updateView());
            });
        });
    }

    private refresh(): void {
        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => {
                this.isRendered = true;
                this.minHeight = this.calculatedHeight;
                detectChanges(this.cd);
            }, TABLE_GLOBAL_OPTIONS.TIME_IDLE);
        });
    }
}
