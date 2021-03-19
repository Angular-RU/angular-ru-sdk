import { Injectable, NgZone, Optional } from '@angular/core';
import { isObject } from '@angular-ru/common/object';
import { Any, Fn } from '@angular-ru/common/typings';

import { UtilsInterface } from './utils.interface';

@Injectable()
export class UtilsService<T> implements UtilsInterface {
    constructor(@Optional() private readonly zone?: NgZone) {}

    public mergeDeep<S>(target: S, source: S): S {
        const output: S = { ...target };
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach((key: string): void => {
                if (isObject((source as Any)[key])) {
                    const empty: boolean = !(key in target);
                    if (empty) {
                        Object.assign(output, { [key]: (source as Any)[key] });
                    } else {
                        (output as Any)[key] = this.mergeDeep((source as Any)[key], (source as Any)[key]);
                    }
                } else {
                    Object.assign(output, { [key]: (source as Any)[key] });
                }
            });
        }

        return output;
    }

    // eslint-disable-next-line complexity
    public flattenKeysByRow(row: T, parentKey: string | null = null, keys: string[] = []): string[] {
        for (const key in row) {
            if (!(row as Any)?.hasOwnProperty(key)) {
                continue;
            }

            const element: Any = row[key];
            const isObjectValue: boolean = typeof element === 'object' && element !== null && !Array.isArray(element);

            if (isObjectValue) {
                const implicitKey: string = parentKey ? `${parentKey}.${key}` : key;
                this.flattenKeysByRow((row as Any)[key], implicitKey, keys);
            } else {
                keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }

        return keys;
    }

    public requestAnimationFrame(callback: Fn): Promise<void> {
        return new Promise((resolve: Fn): void => {
            this.zone?.runOutsideAngular((): void => {
                window.requestAnimationFrame((): void => {
                    callback();
                    resolve();
                });
            });
        });
    }

    public macrotaskInZone(callback: Fn, time: number = 0): Promise<void> {
        return new Promise((resolve: Fn): void => {
            this.zone?.run((): void => {
                window.setTimeout((): void => {
                    callback();
                    resolve();
                }, time);
            });
        });
    }
}
