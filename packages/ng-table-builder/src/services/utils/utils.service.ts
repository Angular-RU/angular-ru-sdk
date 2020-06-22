import { Injectable, NgZone, Optional } from '@angular/core';

import { TableRow } from '../../interfaces/table-builder.external';
import { Any, Fn, KeyMap } from '../../interfaces/table-builder.internal';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';
import { UtilsInterface } from './utils.interface';

@Injectable()
export class UtilsService implements UtilsInterface {
    constructor(@Optional() private readonly zone?: NgZone) {}

    public get bodyRect(): ClientRect | DOMRect | undefined {
        return document.querySelector('body')?.getBoundingClientRect();
    }

    private static replaceUndefinedOrNull(_: string, value: unknown): unknown {
        return checkValueIsEmpty(value) ? undefined : value;
    }

    public clone<T = Any>(obj: T): T {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    }

    public isObject<T = object>(obj: T): boolean {
        return obj === Object(obj);
    }

    public mergeDeep<T>(target: T, source: T): T {
        const output: T = { ...target };
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((key: string): void => {
                if (this.isObject((source as Any)[key])) {
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
    public flattenKeysByRow(row: TableRow, parentKey: string | null = null, keys: string[] = []): string[] {
        for (const key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }

            const element: Any = row[key];
            const isObject: boolean = typeof element === 'object' && element !== null && !Array.isArray(element);

            if (isObject) {
                const implicitKey: string = parentKey ? `${parentKey}.${key}` : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            } else {
                keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }

        return keys;
    }

    public clean(obj: KeyMap): KeyMap {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
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
