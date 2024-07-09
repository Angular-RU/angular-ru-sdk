import {Injectable} from '@angular/core';
import {Fn, Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';
import {fromEvent, ReplaySubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TABLE_GLOBAL_OPTIONS} from '../../config/table-global-options';

const {COLUMN_RESIZE_MIN_WIDTH}: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Injectable()
export class ResizableService {
    private destroyed$: Nullable<ReplaySubject<boolean>> = null;
    public startX: Nullable<number> = null;
    public startWidth: Nullable<number> = null;

    private static clearSelection(): void {
        if (isNotNil(window.getSelection)) {
            window.getSelection()?.removeAllRanges();
        } else if (isNotNil((document as any).selection)) {
            (document as any).selection?.empty();
        }
    }

    // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor
    public resize(
        mouseEvent: MouseEvent,
        column: HTMLElement,
        mousemove: Fn,
        mouseup: Fn,
    ): void {
        this.destroyed$ = new ReplaySubject(1);
        this.startX = mouseEvent.pageX;
        this.startWidth = column.offsetWidth;

        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((event: Event): void =>
                this.computeEvent(event as MouseEvent, mousemove),
            );

        fromEvent(document, 'mouseup')
            .pipe(takeUntil(this.destroyed$))
            .subscribe((event: Event): void =>
                this.unsubscribe(event as MouseEvent, mouseup),
            );
    }

    private computeEvent(event: MouseEvent, mousemove: Fn): void {
        ResizableService.clearSelection();
        const width: number = (this.startWidth ?? 0) + (event.pageX - (this.startX ?? 0));

        if (width >= COLUMN_RESIZE_MIN_WIDTH) {
            mousemove(width);
        }
    }

    private unsubscribe(event: MouseEvent, mouseup: Fn): void {
        this.destroyed$?.next(true);
        this.destroyed$?.complete();
        mouseup(event);
    }
}
