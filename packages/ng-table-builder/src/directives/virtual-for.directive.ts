import { Directive, EmbeddedViewRef, Input, NgZone, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { detectChanges } from '@angular-ru/common/utils';

import { InternalVirtualRef, TableRow, VirtualContext, VirtualIndex } from '../interfaces/table-builder.external';

@Directive({ selector: '[virtualFor][virtualForOf]' })
export class VirtualForDirective implements OnDestroy {
    @Input() public virtualForDiffIndexes?: number[];
    private cache: Map<number, InternalVirtualRef> = new Map();
    private _source: TableRow[] = [];
    private _indexes: VirtualIndex[] = [];
    private removeFrameId: number | null = null;
    private initFrameId: number | null = null;
    private dirty: boolean = false;

    constructor(
        private readonly view: ViewContainerRef,
        private readonly template: TemplateRef<VirtualContext>,
        private readonly ngZone: NgZone
    ) {}

    @Input()
    public set virtualForOriginSource(origin: TableRow[] | null | undefined) {
        if (this._source !== origin) {
            this._source = origin ?? [];
            this.dirty = true;
        }
    }

    @Input()
    public set virtualForOf(indexes: VirtualIndex[] | null | undefined) {
        this.ngZone.runOutsideAngular((): void => {
            this.initFrameId = window.requestAnimationFrame((): void => {
                if (!this._source || this._indexes === indexes) {
                    return;
                }

                this._indexes = indexes ?? [];
                this.removeOldNodes();
                this.createNewNodes(this._indexes);
            });
        });
    }

    private get sourceRef(): TableRow[] {
        return this._source || [];
    }

    public ngOnDestroy(): void {
        window.cancelAnimationFrame(this.initFrameId!);
        window.cancelAnimationFrame(this.removeFrameId!);
        this.view.clear();
    }

    private createNewNodes(indexes: VirtualIndex[]): void {
        (indexes || []).forEach((index: VirtualIndex): void => this.createEmbeddedViewByIndex(index));
    }

    private createEmbeddedView(row: TableRow, index: VirtualIndex): void {
        const viewRef: EmbeddedViewRef<VirtualContext> = this.view.createEmbeddedView<VirtualContext>(this.template, {
            $implicit: row,
            virtualIndex: index,
            index: index.position
        });

        detectChanges(viewRef);
        this.cache.set(index.position, [row, viewRef]);
    }

    private createEmbeddedViewByIndex(index: VirtualIndex): void {
        const row: TableRow = this.sourceRef[index.position];
        const virtualRef: InternalVirtualRef | undefined = this.cache.get(index.position);

        if (virtualRef) {
            const [oldRow, viewRef]: InternalVirtualRef = virtualRef;
            if (row !== oldRow) {
                const stackId: number = this.view.indexOf(viewRef);
                this.view.remove(stackId);
                this.createEmbeddedView(row, index);
            }
        } else {
            this.createEmbeddedView(row, index);
        }
    }

    private removeOldNodes(): void {
        if (this.dirty) {
            this.dirty = false;
            return;
        }

        this.virtualForDiffIndexes?.forEach((index: number): void => {
            this.removeFrameId = window.requestAnimationFrame((): void => this.removeEmbeddedViewByIndex(index));
        });
    }

    private removeEmbeddedViewByIndex(index: number): void {
        const ref: InternalVirtualRef | undefined = this.cache.get(index);
        if (ref) {
            const [, viewRefItem]: InternalVirtualRef = ref;
            const stackId: number = this.view.indexOf(viewRefItem);
            this.cache.delete(index);

            if (stackId > -1) {
                this.view.remove(stackId);
            }
        }
    }
}
