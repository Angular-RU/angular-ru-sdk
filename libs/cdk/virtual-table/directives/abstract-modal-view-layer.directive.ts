import type {Signal} from '@angular/core';
import {
    ApplicationRef,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    inject,
    NgZone,
    OnDestroy,
    viewChild,
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
export abstract class AbstractModalViewLayer<T, K extends PositionState>
    implements OnDestroy
{
    protected readonly cd = inject(ChangeDetectorRef);

    public abstract width: Signal<Nullable<number>>;
    public abstract height: Signal<Nullable<number>>;
    public abstract maxHeight: Signal<Nullable<number>>;

    protected readonly menu = viewChild<ElementRef<HTMLDivElement>>('menu');

    protected subscription: Nullable<Subscription> = null;
    protected readonly app = inject(ApplicationRef);
    protected readonly filterable = inject(FilterableService<T>);
    protected readonly ngZone = inject(NgZone);
    protected readonly contextMenu = inject(ContextMenuService<T>);
    public isViewed = false;
    public isRendered = false;
    public isShowed = false;
    public minHeight: Nullable<number> = null;

    public get left(): number {
        return this.state.position?.left ?? 0;
    }

    public get top(): number {
        return this.state.position?.top ?? 0;
    }

    public get overflowX(): number {
        const overflowX: number =
            (this.width() ?? 0) + this.left - (getBodyRect()?.width ?? 0);

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
        let calculatedHeight: Nullable<number>;

        try {
            const height = this.height();

            if (isNotNil(height)) {
                calculatedHeight =
                    (this.menu()?.nativeElement.scrollHeight ?? 0) > height
                        ? this.menu()?.nativeElement.offsetHeight
                        : height;
            } else {
                calculatedHeight = this.menu()?.nativeElement.scrollHeight;
            }
        } catch {
            calculatedHeight = this.height();
        }

        return calculatedHeight!;
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
