import {Pipe, PipeTransform} from '@angular/core';
import {isString} from '@angular-ru/cdk/string';
import {Nullable} from '@angular-ru/cdk/typings';

@Pipe({name: 'httpReplacer'})
export class HttpReplacerPipe implements PipeTransform {
    public transform(value: Nullable<string>): string {
        let result: Nullable<string> = value;

        if (isString(result)) {
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
