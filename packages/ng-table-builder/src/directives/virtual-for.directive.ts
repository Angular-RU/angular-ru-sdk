import { Directive, EmbeddedViewRef, Input, NgZone, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { detectChanges } from '@angular-ru/common/utils';

import { InternalVirtualRef, VirtualContext, VirtualIndex } from '../interfaces/table-builder.external';

@Directive({ selector: '[virtualFor][virtualForOf]' })
export class VirtualForDirective<T> implements OnDestroy {
    @Input() public virtualForDiffIndexes?: number[];
    private cache: Map<number, InternalVirtualRef<T>> = new Map();
    private _source: T[] = [];
    private _indexes: VirtualIndex[] = [];
    private removeFrameId: number | null = null;
    private initFrameId: number | null = null;
    private dirty: boolean = false;

    constructor(
        private readonly view: ViewContainerRef,
        private readonly template: TemplateRef<VirtualContext<T>>,
        private readonly ngZone: NgZone
    ) {}

    @Input()
    public set virtualForOriginSource(origin: T[] | null | undefined) {
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

    private get sourceRef(): T[] {
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

    private createEmbeddedView(row: T, index: VirtualIndex): void {
        const viewRef: EmbeddedViewRef<VirtualContext<T>> = this.view.createEmbeddedView<VirtualContext<T>>(
            this.template,
            {
                $implicit: row,
                virtualIndex: index,
                index: index.position
            }
        );

        detectChanges(viewRef);
        this.cache.set(index.position, [row, viewRef]);
    }

    private createEmbeddedViewByIndex(index: VirtualIndex): void {
        const row: T = this.sourceRef[index.position];
        const virtualRef: InternalVirtualRef<T> | undefined = this.cache.get(index.position);

        if (virtualRef) {
            const [oldRow, viewRef]: InternalVirtualRef<T> = virtualRef;
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
        const ref: InternalVirtualRef<T> | undefined = this.cache.get(index);
        if (ref) {
            const [, viewRefItem]: InternalVirtualRef<T> = ref;
            const stackId: number = this.view.indexOf(viewRefItem);
            this.cache.delete(index);

            if (stackId > -1) {
                this.view.remove(stackId);
            }
        }
    }
}
