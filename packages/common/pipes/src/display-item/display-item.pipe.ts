import { Pipe, PipeTransform } from '@angular/core';
import { getValueByPath, isObject } from '@angular-ru/common/object';
import { isString } from '@angular-ru/common/string';
import { Any, Paths } from '@angular-ru/common/typings';
import { checkValueIsEmpty } from '@angular-ru/common/utils';

type MaxDepth = 5;

@Pipe({ name: 'displayItem' })
export class DisplayItemPipe implements PipeTransform {
    private static invalidDisplayKey<T>(displayKey?: Paths<T, MaxDepth>): boolean {
        // noinspection SuspiciousTypeOfGuard
        return checkValueIsEmpty(displayKey) || typeof displayKey !== 'string';
    }

    public transform<T>(item: T, displayKey?: Paths<T, MaxDepth>): string {
        return isObject(item) && !Array.isArray(item)
            ? this.parseObject<T>(item, displayKey)
            : this.parseNotObject<T>(item);
    }

    private parseObject<T>(item: T, displayKey?: Paths<T, MaxDepth>): string {
        if (DisplayItemPipe.invalidDisplayKey(displayKey)) {
            throw new Error('attribute "displayKey" can not be empty if input item has "object" type');
        }
        const value: string | Any[] = getValueByPath<T, string>(item, displayKey as string) ?? '';
        return Array.isArray(value) ? '' : value;
    }

    private parseNotObject<T>(item: T): string {
        return isString(item) ? item : '';
    }
}
