import {
    DeepPathPipe,
    DefaultValuePipe,
    IsFilledPipe,
    MergeCssClassesPipe,
    SafePipe,
} from '@angular-ru/cdk/pipes';

import {DragIcon} from './components/drag-icon/drag-icon.component';
import {NgxColumn} from './components/ngx-column/ngx-column.component';
import {NgxContextMenu} from './components/ngx-context-menu/ngx-context-menu.component';
import {NgxContextMenuDivider} from './components/ngx-context-menu/ngx-context-menu-divider/ngx-context-menu-divider.component';
import {NgxContextMenuItem} from './components/ngx-context-menu/ngx-context-menu-item/ngx-context-menu-item.component';
import {NgxMenuContent} from './components/ngx-context-menu/ngx-context-menu-item/ngx-menu-content-place/ngx-menu-content.component';
import {NgxEmpty} from './components/ngx-empty/ngx-empty.component';
import {NgxFilter} from './components/ngx-filter/ngx-filter.component';
import {NgxFilterViewer} from './components/ngx-filter-viewer/ngx-filter-viewer.component';
import {NgxFooter} from './components/ngx-footer/ngx-footer.component';
import {NgxHeader} from './components/ngx-header/ngx-header.component';
import {NgxOptions} from './components/ngx-options/ngx-options.component';
import {NgxSourceNull} from './components/ngx-source-null/ngx-source-null.component';
import {TableCell} from './components/table-cell/table-cell.component';
import {TableTbody} from './components/table-tbody/table-tbody.component';
import {TableThead} from './components/table-thead/table-thead.component';
import {AutoHeight} from './directives/auto-height.directive';
import {NgxFilterDirective} from './directives/ngx-filter.directive';
import {ObserverView} from './directives/observer-view.directive';
import {TemplateBodyTd} from './directives/rows/template-body-td.directive';
import {TemplateHeadTh} from './directives/rows/template-head-th.directive';
import {VirtualFor} from './directives/virtual-for.directive';
import {DisableRowPipe} from './pipes/disable-row.pipe';
import {GetClientHeightPipe} from './pipes/get-client-height.pipe';
import {GetFreeSizePipe} from './pipes/get-free-size.pipe';
import {MapToTableEntriesPipe} from './pipes/map-to-table-entries.pipe';
import {TableBuilder} from './table-builder.component';

export const VirtualTable = [
    AutoHeight,
    DeepPathPipe,
    DefaultValuePipe,
    DisableRowPipe,
    DragIcon,
    GetClientHeightPipe,
    GetFreeSizePipe,
    IsFilledPipe,
    MapToTableEntriesPipe,
    MergeCssClassesPipe,
    NgxColumn,
    NgxContextMenu,
    NgxContextMenuDivider,
    NgxContextMenuItem,
    NgxEmpty,
    NgxFilter,
    NgxFilterDirective,
    NgxFilterDirective,
    NgxFilterViewer,
    NgxFooter,
    NgxHeader,
    NgxMenuContent,
    NgxOptions,
    NgxSourceNull,
    ObserverView,
    SafePipe,
    TableBuilder,
    TableCell,
    TableTbody,
    TableThead,
    TemplateBodyTd,
    TemplateHeadTh,
    VirtualFor,
] as const;
