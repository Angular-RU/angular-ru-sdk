import { Pipe, PipeTransform } from '@angular/core';
import { getValueByPath, isObject } from '@angular-ru/common/object';
import { Any } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

@Pipe({ name: 'displayItem' })
export class DisplayItemPipe implements PipeTransform {
    public transform<T>(item: T, displayKey?: keyof T): string {
        if (isObject(item)) {
            return this.parseObject<T>(item, displayKey);
        } else {
            return this.parseNotObject<T>(item);
        }
    }

    private parseObject<T>(item: T, displayKey?: keyof T): string {
        if (Array.isArray(item)) {
            return '';
        }
        if (checkValueIsEmpty(displayKey) || typeof displayKey !== 'string') {
            throw new Error('attribute "displayKey" can not be empty if input item has "object" type');
        }
        const value: string | Any[] = getValueByPath<T, string>(item, displayKey, '') ?? '';
        if (Array.isArray(value)) {
            return '';
        } else {
            return value;
        }
    }

    private parseNotObject<T>(item: T): string {
        if (typeof item === 'string') {
            return item;
        }
        return '';
    }
}
