import fs from 'fs';
import path from 'path';

export function readFromBlob(blob: Blob): Promise<string> {
    return new Promise((resolve: (value: string) => void): void => {
        const reader: FileReader = new FileReader();

        reader.readAsText(blob);
        reader.addEventListener('load', (): void => resolve(reader.result as string));
    }).then(minify);
}

export function readFile(filePath: string): string {
    return minify(fs.readFileSync(path.join(__dirname, 'file-suites', filePath)).toString());
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
