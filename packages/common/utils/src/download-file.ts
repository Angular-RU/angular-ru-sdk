interface FileToDownloadInfo {
    blob: Blob | File;
    name: string;
    extension: string;
}

export function downloadFile(file: FileToDownloadInfo): void {
    const anchor: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(file.blob);
    anchor.href = url;
    anchor.download = `${file.name}.${file.extension}`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}
