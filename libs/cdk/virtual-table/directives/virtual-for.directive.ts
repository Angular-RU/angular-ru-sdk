import {
    Directive,
    EmbeddedViewRef,
    Input,
    NgZone,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {Nullable} from '@angular-ru/cdk/typings';
import {detectChanges, isNil, isNotNil} from '@angular-ru/cdk/utils';

import {
    InternalVirtualRef,
    VirtualContext,
    VirtualIndex,
} from '../interfaces/table-builder.external';

@Directive({selector: '[virtualFor][virtualForOf]'})
export class VirtualForDirective<T> implements OnDestroy {
    private readonly cache = new Map<number, InternalVirtualRef<T>>();
    private _source: T[] = [];
    private _indexes: VirtualIndex[] = [];
    private removeFrameId?: number;
    private initFrameId?: number;
    private dirty = false;
    @Input()
    public virtualForDiffIndexes?: Nullable<number[]>;

    constructor(
        private readonly view: ViewContainerRef,
        private readonly template: TemplateRef<VirtualContext<T>>,
        private readonly ngZone: NgZone,
    ) {}

    @Input()
    public set virtualForOriginSource(origin: Nullable<T[]>) {
        if (this._source !== origin) {
            this._source = origin ?? [];
            this.dirty = true;
        }
    }

    @Input()
    public set virtualForOf(indexes: Nullable<VirtualIndex[]>) {
        this.ngZone.runOutsideAngular((): void => {
            this.initFrameId = window.requestAnimationFrame((): void => {
                if (isNil(this._source) || this._indexes === indexes) {
                    return;
                }

                this._indexes = indexes ?? [];
                this.removeOldNodes();
                this.createNewNodes(this._indexes);
            });
        });
    }

    private get sourceRef(): T[] {
        return this._source ?? [];
    }

    public ngOnDestroy(): void {
        window.cancelAnimationFrame(this.initFrameId ?? 0);
        window.cancelAnimationFrame(this.removeFrameId ?? 0);
        this.view.clear();
    }

    private createNewNodes(indexes: VirtualIndex[]): void {
        for (const index of indexes ?? []) {
            this.createEmbeddedViewByIndex(index);
        }
    }

    private createEmbeddedView(row: T, index: VirtualIndex): void {
        const viewRef: EmbeddedViewRef<VirtualContext<T>> = this.view.createEmbeddedView<
            VirtualContext<T>
        >(this.template, {
            $implicit: row,
            virtualIndex: index,
            index: index.position,
        });

        detectChanges(viewRef);
        this.cache.set(index.position, [row, viewRef]);
    }

    private createEmbeddedViewByIndex(index: VirtualIndex): void {
        const row: Nullable<T> = this.sourceRef[index.position];
        const cachedVirtualRef: Nullable<InternalVirtualRef<T>> = this.cache.get(
            index.position,
        );

        if (isNotNil(cachedVirtualRef)) {
            const [oldRow, viewRef]: InternalVirtualRef<T> = cachedVirtualRef;

            if (isNotNil(row) && row !== oldRow) {
                const stackId: number = this.view.indexOf(viewRef);

                this.view.remove(stackId);
                this.createEmbeddedView(row, index);
            }
        } else if (isNotNil(row)) {
            this.createEmbeddedView(row, index);
        }
    }

    private removeOldNodes(): void {
        if (this.dirty) {
            this.dirty = false;

            return;
        }

        for (const index of this.virtualForDiffIndexes ?? []) {
            this.removeFrameId = window.requestAnimationFrame((): void =>
                this.removeEmbeddedViewByIndex(index),
            );
        }
    }

    private removeEmbeddedViewByIndex(index: number): void {
        const ref: Nullable<InternalVirtualRef<T>> = this.cache.get(index);

        if (isNotNil(ref)) {
            const [, viewRefItem]: InternalVirtualRef<T> = ref;
            const stackId: number = this.view.indexOf(viewRefItem);

            this.cache.delete(index);

            if (stackId > -1) {
                this.view.remove(stackId);
            }
        }
    }
}
