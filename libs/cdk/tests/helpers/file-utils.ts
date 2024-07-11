import fs from 'node:fs';
import path from 'node:path';

import {isNil} from '@angular-ru/cdk/utils';

export async function readFromBlob(blob?: Blob): Promise<string> {
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
        .replaceAll('\n', ' ')
        .replaceAll(/\s\s+/g, ' ')
        .replaceAll('> <', '><')
        .replaceAll(' />', '/>')
        .replaceAll(' >', '>');
}
