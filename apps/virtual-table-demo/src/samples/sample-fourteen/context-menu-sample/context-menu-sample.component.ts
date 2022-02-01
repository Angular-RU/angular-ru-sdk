import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FilterStateEvent, TableBuilderComponent, TableFilterType } from '@angular-ru/cdk/virtual-table';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

WebWorkerThreadService.prototype.run = function run<T, K>(workerFunction: (input: K) => T, data?: K): Promise<T> {
    return Promise.resolve(workerFunction(data!));
};

@Component({
    selector: 'context-menu-sample',
    templateUrl: './context-menu-sample.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuSampleComponent<T> {
    @Input() public table!: TableBuilderComponent<T>;
    @Input() public state!: Partial<FilterStateEvent>;

    public TableFilterType: typeof TableFilterType = TableFilterType;
}
