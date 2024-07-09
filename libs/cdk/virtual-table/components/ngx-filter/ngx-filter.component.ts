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

import {AbstractModalViewLayerDirective} from '../../directives/abstract-modal-view-layer.directive';
import {NgxFilterDirective} from '../../directives/ngx-filter.directive';
import {FilterStateEvent} from '../../services/filterable/filter-state-event';

const FILTER_WIDTH: number = 300;
const FILTER_MIN_LEFT_X: number = 10;
const FILTER_MIN_TOP_Y: number = 50;

@Component({
    selector: 'ngx-filter',
    templateUrl: './ngx-filter.component.html',
    styleUrls: ['./ngx-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeInLinearAnimation],
})
export class NgxFilterComponent<T>
    extends AbstractModalViewLayerDirective<T, FilterStateEvent>
    implements OnInit, OnDestroy
{
    private destroy$: Subject<void> = new Subject();
    @Input() public width: number = FILTER_WIDTH;
    @Input() public height: Nullable<number> = null;
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('max-height') public maxHeight: Nullable<number> = null;
    @ContentChild(NgxFilterDirective, {static: false}) public filter!: NgxFilterDirective;
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
