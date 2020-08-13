import { Any } from '@angular-ru/common/typings';
import { WebWorkerThreadService } from '@angular-ru/common/webworker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { DragIconComponent } from './components/drag-icon/drag-icon.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxContextMenuDividerComponent } from './components/ngx-context-menu/ngx-context-menu-divider/ngx-context-menu-divider.component';
import { NgxContextMenuItemComponent } from './components/ngx-context-menu/ngx-context-menu-item/ngx-context-menu-item.component';
import { NgxMenuContentComponent } from './components/ngx-context-menu/ngx-context-menu-item/ngx-menu-content-place/ngx-menu-content.component';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { NgxEmptyComponent } from './components/ngx-empty/ngx-empty.component';
import { NgxFilterViewerComponent } from './components/ngx-filter-viewer/ngx-filter-viewer.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { NgxFooterComponent } from './components/ngx-footer/ngx-footer.component';
import { NgxHeaderComponent } from './components/ngx-header/ngx-header.component';
import { NgxOptionsComponent } from './components/ngx-options/ngx-options.component';
import { NgxSourceNullComponent } from './components/ngx-source-null/ngx-source-null.component';
import { TableCellComponent } from './components/table-cell/table-cell.component';
import { TableTbodyComponent } from './components/table-tbody/table-tbody.component';
import { TableTheadComponent } from './components/table-thead/table-thead.component';
import { AutoHeightDirective } from './directives/auto-height.directive';
import { NgxFilterDirective } from './directives/ngx-filter.directive';
import { ObserverViewDirective } from './directives/observer-view.directive';
import { TemplateBodyTdDirective } from './directives/rows/template-body-td.directive';
import { TemplateHeadThDirective } from './directives/rows/template-head-th.directive';
import { VirtualForDirective } from './directives/virtual-for.directive';
import { DeepPathPipe } from './pipes/deep-path.pipe';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { DisableRowPipe } from './pipes/disable-row.pipe';
import { UtilsService } from './services/utils/utils.service';
import { TableBuilderComponent } from './table-builder.component';

if ((window as Any)['Zone']) {
    (window as Any)[(window as Any)['Zone'].__symbol__('MutationObserver')] = MutationObserver;
}

@NgModule({
    imports: [CommonModule, DragDropModule],
    declarations: [
        TableBuilderComponent,
        AutoHeightDirective,
        TableTheadComponent,
        TableTbodyComponent,
        NgxColumnComponent,
        TemplateHeadThDirective,
        TemplateBodyTdDirective,
        DeepPathPipe,
        DefaultValuePipe,
        NgxOptionsComponent,
        TableCellComponent,
        ObserverViewDirective,
        NgxContextMenuComponent,
        NgxContextMenuItemComponent,
        NgxContextMenuDividerComponent,
        NgxMenuContentComponent,
        NgxEmptyComponent,
        NgxHeaderComponent,
        NgxFooterComponent,
        NgxFilterViewerComponent,
        NgxFilterComponent,
        NgxFilterDirective,
        DragIconComponent,
        NgxSourceNullComponent,
        DisableRowPipe,
        VirtualForDirective
    ],
    providers: [UtilsService, WebWorkerThreadService],
    exports: [
        TableBuilderComponent,
        TemplateHeadThDirective,
        TemplateBodyTdDirective,
        NgxColumnComponent,
        NgxOptionsComponent,
        NgxContextMenuComponent,
        NgxContextMenuItemComponent,
        NgxContextMenuDividerComponent,
        NgxMenuContentComponent,
        NgxEmptyComponent,
        NgxHeaderComponent,
        NgxFooterComponent,
        NgxFilterViewerComponent,
        NgxFilterComponent,
        NgxFilterDirective,
        NgxSourceNullComponent
    ]
})
export class TableBuilderModule {
    public static forRoot(): ModuleWithProviders<TableBuilderModule> {
        return {
            ngModule: TableBuilderModule,
            providers: []
        };
    }
}
