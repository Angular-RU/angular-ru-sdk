import { Pipe, PipeTransform } from '@angular/core';
import { getValueByPath, isObject } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'displayItem' })
export class DisplayItemPipe implements PipeTransform {
    private static invalidDisplayKey<T>(displayKey?: keyof T): boolean {
        return checkValueIsEmpty(displayKey) || typeof displayKey !== 'string';
    }

    public transform<T>(item: T, displayKey?: keyof T): string {
        return isObject(item) && !Array.isArray(item)
            ? this.parseObject<T>(item, displayKey)
            : this.parseNotObject<T>(item);
    }

    private parseObject<T>(item: T, displayKey?: keyof T): string {
        if (DisplayItemPipe.invalidDisplayKey(displayKey)) {
            throw new Error('attribute "displayKey" can not be empty if input item has "object" type');
        }
        const value: string | Any[] = getValueByPath<T, string>(item, displayKey as string) ?? '';
        return Array.isArray(value) ? '' : value;
    }

    private parseNotObject<T>(item: T): string {
        return typeof item === 'string' ? item : '';
    }
}
