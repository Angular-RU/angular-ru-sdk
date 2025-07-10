import {NgStyle} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {fadeInLinearAnimation} from '@angular-ru/cdk/animations';
import {Nullable} from '@angular-ru/cdk/typings';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AbstractModalViewLayer} from '../../directives/abstract-modal-view-layer.directive';
import {NgxFilterDirective} from '../../directives/ngx-filter.directive';
import {FilterStateEvent} from '../../services/filterable/filter-state-event';

const FILTER_WIDTH = 300;
const FILTER_MIN_LEFT_X = 10;
const FILTER_MIN_TOP_Y = 50;

@Component({
    selector: 'ngx-filter',
    imports: [NgStyle],
    templateUrl: './ngx-filter.component.html',
    styleUrls: ['./ngx-filter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInLinearAnimation],
})
export class NgxFilter<T>
    extends AbstractModalViewLayer<T, FilterStateEvent>
    implements OnInit, OnDestroy
{
    private readonly destroy$ = new Subject<void>();
    @Input()
    public width: number = FILTER_WIDTH;

    @Input()
    public height: Nullable<number> = null;

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('max-height')
    public maxHeight: Nullable<number> = null;

    @ContentChild(NgxFilterDirective, {static: false})
    public filter!: NgxFilterDirective;

    public readonly leftX: number = FILTER_MIN_LEFT_X;
    public readonly topY: number = FILTER_MIN_TOP_Y;

    public get state(): Partial<FilterStateEvent> {
        return this.filterable.state;
    }

    public closeFilter(): void {
        this.filterable.closeFilter();
    }

    public close(): void {
        this.closeFilter();
    }

    public ngOnInit(): void {
        this.filterable.filterOpenEvents$
            .pipe(takeUntil(this.destroy$))
            .subscribe((): void => this.update());
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.destroy$.next();
        this.destroy$.complete();
    }
}
