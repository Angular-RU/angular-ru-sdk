import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'httpReplacer' })
export class HttpReplacerPipe implements PipeTransform {
    public transform(value: string | undefined): string {
        let result: string | undefined = value;

        if (typeof result === 'string') {
            result = result
                .replace(/^(http|https):\/\//, '')
                .replace(/\/$/, '')
                .replace('www.', '')
                .replace('/index.php', '')
                .toLocaleLowerCase();
        }

        return result ?? '';
    }
}
