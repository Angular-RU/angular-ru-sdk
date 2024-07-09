import {ModuleWithProviders, NgModule, Self} from '@angular/core';
import {
    NgxsDataFactory,
    NgxsDataInjector,
    NgxsDataSequence,
} from '@angular-ru/ngxs/internals';
import {NgxsDataExtension} from '@angular-ru/ngxs/typings';

@NgModule()
export class NgxsDataPluginModule {
    constructor(
        @Self() public accessor: NgxsDataFactory,
        @Self() public injector: NgxsDataInjector,
    ) {}

    public static forRoot(
        extensions: NgxsDataExtension[] = [],
    ): ModuleWithProviders<NgxsDataPluginModule> {
        return {
            ngModule: NgxsDataPluginModule,
            providers: [
                NgxsDataFactory,
                NgxsDataInjector,
                NgxsDataSequence,
                ...extensions,
            ],
        };
    }
}
