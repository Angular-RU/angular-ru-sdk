import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Any, PlainObject } from '@angular-ru/common/typings';
import { detectChanges, isNotNil } from '@angular-ru/common/utils';
import { Subscription } from 'rxjs';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { FilterEvent } from '../../services/filterable/filter-event';
import { FilterableService } from '../../services/filterable/filterable.service';
import { TableFilterType } from '../../services/filterable/table-filter-type';
import { IGNORE_FILTER_TYPES } from './ngx-filter-viewer.properties';

const { TIME_RELOAD }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Component({
    selector: 'ngx-filter-viewer',
    template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxFilterViewerComponent<T> implements OnChanges, OnInit, OnDestroy {
    @Input() public text?: PlainObject | string | undefined | null = null;
    @Input() public key?: string | null = null;
    @Input() public index?: number | null = 0;
    public html?: string | SafeHtml | null = null;
    public founded: boolean = false;
    private subscription: Subscription | null = null;
    private taskId: number | null = null;
    private readonly ngZone: NgZone;
    private readonly filterable: FilterableService<T>;

    constructor(private readonly cd: ChangeDetectorRef, private readonly sanitizer: DomSanitizer, injector: Injector) {
        this.cd.reattach();
        this.ngZone = injector.get<NgZone>(NgZone);
        this.filterable = injector.get<FilterableService<T>>(FilterableService);
    }

    private static wrapSelectedHtml(finder: string): string {
        return `<span style="background-color: #ffdd2d; color: #000">${finder}</span>`;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue({ forceUpdate: false });
        }
    }

    public ngOnInit(): void {
        this.subscription = this.filterable.events.subscribe((event: FilterEvent): void => {
            const hasFilter: boolean =
                isNotNil((this.filterable.definition as Any)[this.key!]) || isNotNil(this.filterable.globalFilterValue);

            if (hasFilter) {
                this.changeSelection(event);
            } else {
                this.defaultHtmlValue({ forceUpdate: true });
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    private changeSelection(event: FilterEvent): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.taskId!);
            this.taskId = window.setTimeout((): void => {
                const hasFilter: boolean =
                    isNotNil(event.value) || isNotNil((this.filterable.definition as Any)[this.key!]);

                if (hasFilter) {
                    this.selected(event);
                } else {
                    this.defaultHtmlValue({ forceUpdate: false });
                }

                detectChanges(this.cd);
            }, TIME_RELOAD + (this.index ?? 0));
        });
    }

    // eslint-disable-next-line max-lines-per-function,complexity
    private selected(event: FilterEvent): void {
        const value: string | null = String((this.filterable.definition as Any)[this.key!] ?? event.value);
        const type: string | TableFilterType | null = isNotNil((this.filterable.definition as Any)[this.key!])
            ? (this.filterable.filterTypeDefinition as Any)[this.key!]
            : event.type;

        if (IGNORE_FILTER_TYPES.includes(type as TableFilterType)) {
            return;
        }

        let regexp: RegExp;
        const escapedValue: string | undefined = value?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        if (type === TableFilterType.START_WITH) {
            regexp = new RegExp(`^${escapedValue}`, 'i');
        } else if (type === TableFilterType.END_WITH) {
            regexp = new RegExp(`${escapedValue}$`, 'i');
        } else if (type === TableFilterType.EQUALS) {
            regexp = new RegExp(`^${escapedValue}$`, 'i');
        } else {
            regexp = new RegExp(`${escapedValue}`, 'ig');
        }

        const trustedHtml: string = String(this.text).replace(regexp, (finder: string): string =>
            NgxFilterViewerComponent.wrapSelectedHtml(finder)
        );

        this.html = this.sanitizer.bypassSecurityTrustHtml(trustedHtml);

        if (trustedHtml.includes('span')) {
            this.founded = true;
        }
    }

    private defaultHtmlValue({ forceUpdate }: { forceUpdate: boolean }): void {
        this.html = this.text;
        this.founded = false;

        if (forceUpdate) {
            detectChanges(this.cd);
        }
    }
}
