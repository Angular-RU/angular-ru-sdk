import {
    ApplicationRef,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Injector,
    NgZone,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {detectChanges, getBodyRect, isNotNil, isTrue} from '@angular-ru/cdk/utils';
import {Subscription} from 'rxjs';

import {MousePosition} from '../interfaces/table-builder.internal';
import {ContextMenuService} from '../services/context-menu/context-menu.service';
import {FilterableService} from '../services/filterable/filterable.service';
import {MINIMAL_TIMEOUT, SCROLLBAR_SIZE} from '../table-builder.properties';

export interface PositionState {
    key: Nullable<string>;
    opened: Nullable<boolean>;
    position: MousePosition;
}

@Directive()
export abstract class AbstractModalViewLayerDirective<T, K extends PositionState>
    implements OnDestroy
{
    public abstract width: Nullable<number>;
    public abstract height: Nullable<number>;
    public abstract maxHeight: Nullable<number>;
    @ViewChild('menu', {static: false})
    protected menu!: ElementRef<HTMLDivElement>;

    protected subscription: Nullable<Subscription> = null;
    protected readonly app: ApplicationRef;
    protected readonly filterable: FilterableService<T>;
    protected readonly ngZone: NgZone;
    protected readonly contextMenu: ContextMenuService<T>;
    public isViewed = false;
    public isRendered = false;
    public isShowed = false;
    public minHeight: Nullable<number> = null;

    constructor(
        protected readonly cd: ChangeDetectorRef,
        injector: Injector,
    ) {
        this.app = injector.get<ApplicationRef>(ApplicationRef);
        this.filterable = injector.get<FilterableService<T>>(FilterableService);
        this.ngZone = injector.get<NgZone>(NgZone);
        this.contextMenu = injector.get<ContextMenuService<T>>(ContextMenuService);
    }

    public get left(): number {
        return this.state.position?.left ?? 0;
    }

    public get top(): number {
        return this.state.position?.top ?? 0;
    }

    public get overflowX(): number {
        const overflowX: number =
            (this.width ?? 0) + this.left - (getBodyRect()?.width ?? 0);

        return overflowX > 0 ? overflowX + SCROLLBAR_SIZE : 0;
    }

    public get overflowY(): number {
        const remainHeight: number = (getBodyRect()?.height ?? 0) - this.top;

        if (this.calculatedHeight > remainHeight) {
            return this.calculatedHeight - remainHeight + SCROLLBAR_SIZE;
        }

        return 0;
    }

    public get calculatedHeight(): number {
        let height: Nullable<number>;

        try {
            if (isNotNil(this.height)) {
                height =
                    this.menu.nativeElement.scrollHeight > this.height
                        ? this.menu.nativeElement.offsetHeight
                        : this.height;
            } else {
                height = this.menu.nativeElement.scrollHeight;
            }
        } catch (error: unknown) {
            height = this.height;
        }

        return height!;
    }

    public abstract get state(): Partial<K>;

    public abstract close(event: MouseEvent): void;

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    protected update(): void {
        this.isViewed = isTrue(this.state.opened);
        this.isRendered = true;
        detectChanges(this.cd);

        this.ngZone.run((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => {
                this.minHeight = this.calculatedHeight;
                detectChanges(this.cd);

                // eslint-disable-next-line no-restricted-properties
                window.setTimeout((): void => {
                    this.isShowed = true;
                    detectChanges(this.cd);
                }, MINIMAL_TIMEOUT);
            }, MINIMAL_TIMEOUT);
        });
    }
}
