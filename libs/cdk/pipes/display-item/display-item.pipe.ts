import {Pipe, PipeTransform} from '@angular/core';
import {getValueByPath, isObject} from '@angular-ru/cdk/object';
import {isString} from '@angular-ru/cdk/string';
import {checkValueIsEmpty} from '@angular-ru/cdk/utils';

@Pipe({name: 'displayItem'})
export class DisplayItemPipe implements PipeTransform {
    private static invalidDisplayKey(displayKey?: any | unknown): boolean {
        return Boolean(checkValueIsEmpty(displayKey)) || typeof displayKey !== 'string';
    }

    private static parseObject<T>(item: T, displayKey?: any | unknown): string {
        if (DisplayItemPipe.invalidDisplayKey(displayKey)) {
            throw new Error(
                'attribute "displayKey" can not be empty if input item has "object" type',
            );
        }

        const value: any[] | string =
            getValueByPath<T, string>(item, displayKey as string) ?? '';

        return Array.isArray(value) ? '' : value;
    }

    private static parseNotObject<T>(item: T): string {
        return isString(item) ? (item as unknown as string) : '';
    }

    public transform<T>(item: T, displayKey?: any | unknown): string {
        return Boolean(isObject(item as any)) && !Array.isArray(item)
            ? DisplayItemPipe.parseObject<T>(item, displayKey)
            : DisplayItemPipe.parseNotObject<T>(item);
    }
}
