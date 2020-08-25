import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'httpReplacer' })
export class HttpReplacerPipe implements PipeTransform {
    public transform(value: string | undefined): string {
        if (typeof value === 'string') {
            value = value
                .replace(/^(http|https):\/\//, '')
                .replace(/\/$/, '')
                .replace('www.', '')
                .replace('/index.php', '')
                .toLocaleLowerCase();
        }

        return value || '';
    }
}
