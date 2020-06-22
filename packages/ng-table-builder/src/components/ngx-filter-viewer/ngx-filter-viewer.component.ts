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
import { Subscription } from 'rxjs';

import { TABLE_GLOBAL_OPTIONS } from '../../config/table-global-options';
import { detectChanges } from '../../operators/detect-changes';
import { FilterEvent, TableFilterType } from '../../services/filterable/filterable.interface';
import { FilterableService } from '../../services/filterable/filterable.service';

const { TIME_RELOAD }: typeof TABLE_GLOBAL_OPTIONS = TABLE_GLOBAL_OPTIONS;

@Component({
    selector: 'ngx-filter-viewer',
    template: '<span [class.filter-founded]="founded" [innerHTML]="html"></span>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxFilterViewerComponent implements OnChanges, OnInit, OnDestroy {
    @Input() public text: string | null = null;
    @Input() public key: string | null = null;
    @Input() public index: number = 0;
    public html: string | SafeHtml | null = null;
    public founded: boolean = false;
    private subscription: Subscription | null = null;
    private taskId: number | null = null;
    private readonly ngZone: NgZone;
    private readonly filterable: FilterableService;

    constructor(private readonly cd: ChangeDetectorRef, private readonly sanitizer: DomSanitizer, injector: Injector) {
        this.cd.reattach();
        this.ngZone = injector.get<NgZone>(NgZone);
        this.filterable = injector.get<FilterableService>(FilterableService);
    }

    private static wrapSelectedHtml(finder: string): string {
        return `<span style="background-color: #ffdd2d; color: #000">${finder}</span>`;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['text'] && changes['text'].firstChange) {
            this.defaultHtmlValue();
        }
    }

    public ngOnInit(): void {
        this.subscription = this.filterable.events.subscribe((event: FilterEvent): void => {
            if (this.filterable.definition[this.key!] || this.filterable.globalFilterValue) {
                this.changeSelection(event);
            } else {
                this.defaultHtmlValue();
            }

            detectChanges(this.cd);
        });
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    private changeSelection(event: FilterEvent): void {
        this.ngZone.runOutsideAngular((): void => {
            window.clearInterval(this.taskId!);
            this.taskId = window.setTimeout((): void => {
                if (event.value || this.filterable.definition[this.key!]) {
                    this.selected(event);
                } else {
                    this.defaultHtmlValue();
                }

                detectChanges(this.cd);
            }, TIME_RELOAD + this.index);
        });
    }

    // eslint-disable-next-line max-lines-per-function,complexity
    private selected(event: FilterEvent): void {
        const value: string | null = this.filterable.definition[this.key!] || event.value;
        const type: TableFilterType | null = this.filterable.definition[this.key!]
            ? this.filterable.filterTypeDefinition[this.key!]
            : event.type;

        if (type === TableFilterType.DOES_NOT_EQUAL || type === TableFilterType.DOES_NOT_CONTAIN) {
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

    private defaultHtmlValue(): void {
        this.html = this.text;
        this.founded = false;
    }
}
