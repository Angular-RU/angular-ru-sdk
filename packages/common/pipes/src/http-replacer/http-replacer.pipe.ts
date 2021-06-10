import { Pipe, PipeTransform } from '@angular/core';
import { isString } from '@angular-ru/common/string';

@Pipe({ name: 'httpReplacer' })
export class HttpReplacerPipe implements PipeTransform {
    public transform(value: string | undefined): string {
        let result: string | undefined = value;

        if (isString(result) as boolean) {
            result = result
                ?.replace(/^(http|https):\/\//, '')
                .replace(/\/$/, '')
                .replace('www.', '')
                .replace('/index.php', '')
                .toLocaleLowerCase();
        }

        return result ?? '';
    }
}
