import {ApplicationRef, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {NgxsDataPluginModule} from '@angular-ru/ngxs';
import {
    NGXS_DATA_STORAGE_CONTAINER,
    NGXS_DATA_STORAGE_EXTENSION,
} from '@angular-ru/ngxs/storage';
import {NgxsModule} from '@ngxs/store';
import {ɵStateClass as StateClass} from '@ngxs/store/internals';

import {createInternalNgxsRootElement} from './internal/create-internal-ngxs-root-element';
import {NgxsAppMockModule} from './ngxs-app-mock.module';

type NgxsDataTestingModuleProviders = [
    Type<NgxsAppMockModule>,
    ModuleWithProviders<NgxsModule>,
    ModuleWithProviders<NgxsDataPluginModule>,
];

@NgModule({
    imports: [NgxsModule],
    exports: [NgxsModule],
})
export class NgxsDataTestingModule {
    public static forRoot(states: StateClass[] = []): NgxsDataTestingModuleProviders {
        return [
            NgxsAppMockModule,
            NgxsModule.forRoot(states, {
                developmentMode: true,
                selectorOptions: {suppressErrors: false},
            }),
            NgxsDataPluginModule.forRoot([
                NGXS_DATA_STORAGE_EXTENSION,
                NGXS_DATA_STORAGE_CONTAINER,
            ]),
        ];
    }

    public static ngxsInitPlatform(): void {
        createInternalNgxsRootElement();
        // eslint-disable-next-line @angular-eslint/no-lifecycle-call
        NgxsAppMockModule.ngDoBootstrap(TestBed.inject(ApplicationRef));
    }
}
