import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
    DeepPathPipeModule,
    DefaultValuePipeModule,
    MergeCssClassesPipeModule,
    SafePipeModule
} from '@angular-ru/cdk/pipes';
import { WebWorkerThreadService } from '@angular-ru/cdk/webworker';

import { DragIconComponent } from './components/drag-icon/drag-icon.component';
import { NgxColumnComponent } from './components/ngx-column/ngx-column.component';
import { NgxContextMenuComponent } from './components/ngx-context-menu/ngx-context-menu.component';
import { NgxContextMenuDividerComponent } from './components/ngx-context-menu/ngx-context-menu-divider/ngx-context-menu-divider.component';
import { NgxContextMenuItemComponent } from './components/ngx-context-menu/ngx-context-menu-item/ngx-context-menu-item.component';
import { NgxMenuContentComponent } from './components/ngx-context-menu/ngx-context-menu-item/ngx-menu-content-place/ngx-menu-content.component';
import { NgxEmptyComponent } from './components/ngx-empty/ngx-empty.component';
import { NgxFilterComponent } from './components/ngx-filter/ngx-filter.component';
import { NgxFilterViewerComponent } from './components/ngx-filter-viewer/ngx-filter-viewer.component';
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
import { DisableRowPipe } from './pipes/disable-row.pipe';
import { GetClientHeightPipe } from './pipes/get-client-height.pipe';
import { GetFreeSizePipe } from './pipes/get-free-size.pipe';
import { MapToTableEntriesPipe } from './pipes/map-to-table-entries.pipe';
import { TableSelectedItemsPipe } from './pipes/table-selected-items.pipe';
import { TableBuilderComponent } from './table-builder.component';

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        DeepPathPipeModule,
        DefaultValuePipeModule,
        SafePipeModule,
        MergeCssClassesPipeModule,
        MatIconModule
    ],
    declarations: [
        TableBuilderComponent,
        AutoHeightDirective,
        TableTheadComponent,
        TableTbodyComponent,
        NgxColumnComponent,
        TemplateHeadThDirective,
        TemplateBodyTdDirective,
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
        TableSelectedItemsPipe,
        MapToTableEntriesPipe,
        VirtualForDirective,
        GetFreeSizePipe,
        GetClientHeightPipe
    ],
    providers: [WebWorkerThreadService],
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
        TableSelectedItemsPipe,
        MapToTableEntriesPipe,
        NgxSourceNullComponent
    ]
})
export class TableBuilderModule {
    public static forRoot(): ModuleWithProviders<TableBuilderModule> {
        return { ngModule: TableBuilderModule, providers: [] };
    }
}
