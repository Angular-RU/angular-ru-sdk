import {Nullable} from '@angular-ru/cdk/typings';

import {checkEveryValueIsEmpty} from './check-every-value-is-empty';

export interface FileToDownloadInfo {
    blob: Blob | File;
    name?: Nullable<string>;
    extension?: Nullable<string>;
}

export function downloadFile(file: FileToDownloadInfo): void {
    if (checkEveryValueIsEmpty(file.name, file.extension)) {
        throw new Error('File name or file extension must be provided');
    }

    const anchor: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(file.blob);
    const filePath: string = [file.name, file.extension].filter(Boolean).join('.');

    anchor.href = url;
    anchor.download = filePath;
    anchor.click();
    window.URL.revokeObjectURL(url);
}
