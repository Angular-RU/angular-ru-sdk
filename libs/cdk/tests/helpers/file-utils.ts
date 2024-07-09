import {isNil} from '@angular-ru/cdk/utils';
import fs from 'fs';
import path from 'path';

export function readFromBlob(blob?: Blob): Promise<string> {
    if (isNil(blob)) {
        return Promise.reject();
    }

    return new Promise((resolve: (value: string) => void): void => {
        const reader: FileReader = new FileReader();

        reader.readAsText(blob);
        reader.addEventListener('load', (): void => resolve(reader.result as string));
    }).then(minify);
}

export function fileSuitesReader(base: string): (...filePath: string[]) => string {
    return function (...filePath: string[]): string {
        return minify(
            fs.readFileSync(path.join(base, 'file-suites', ...filePath)).toString(),
        );
    };
}

export function minify(content: string): string {
    return content
        .trim()
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ')
        .replace(/> </g, '><')
        .replace(/ \/>/g, '/>')
        .replace(/ >/g, '>');
}
