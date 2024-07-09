import {Pipe, PipeTransform} from '@angular/core';
import {isTrue} from '@angular-ru/cdk/utils';

@Pipe({name: 'entrySingleSet'})
export class EntrySingleSetPipe implements PipeTransform {
    public transform(key: string, listKeys?: Set<string>): boolean {
        return isTrue(listKeys?.has(key));
    }
}
