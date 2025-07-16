// eslint-disable-next-line max-classes-per-file
import {inject, Injectable} from '@angular/core';
import {Nullable, PlainObject} from '@angular-ru/cdk/typings';
import {WebWorkerThreadService} from '@angular-ru/cdk/webworker';

import {InputDescriptor} from './interfaces/input-descriptor';
import {RulesDescriptor} from './interfaces/rules-descriptor';

@Injectable()
export class PlainTableComposerService {
    private readonly webWorker = inject<WebWorkerThreadService>(WebWorkerThreadService);

    public async composeSingle<T extends PlainObject>(
        entry: T,
        keyRules?: RulesDescriptor,
    ): Promise<PlainObject> {
        const [composed]: PlainObject[] = await this.compose([entry], keyRules);

        return composed ?? {};
    }

    // eslint-disable-next-line max-lines-per-function
    public async compose<T extends PlainObject>(
        tableEntries: T[],
        keyRules?: RulesDescriptor,
    ): Promise<PlainObject[]> {
        return (
            this.webWorker
                // eslint-disable-next-line max-lines-per-function,sonarjs/cognitive-complexity
                .run(
                    // eslint-disable-next-line sonarjs/cognitive-complexity,max-lines-per-function
                    (input: InputDescriptor<T>): PlainObject[] => {
                        class PlainComposer {
                            private readonly keySet = new Set<string>();

                            constructor(
                                private readonly rules: Nullable<RulesDescriptor>,
                            ) {}

                            private static isObject(value: any): value is PlainObject {
                                return typeof value === 'object' && value !== null;
                            }

                            public toPlain(rawEntries: T[]): PlainObject[] {
                                this.keySet.clear();
                                const flatEntries: PlainObject[] = rawEntries.map(
                                    (entry: T): PlainObject =>
                                        this.flattenAndClean(entry),
                                );
                                const keys: string[] =
                                    this.rules?.includeKeys ?? Array.from(this.keySet);

                                return flatEntries.map(
                                    (entry: PlainObject): PlainObject =>
                                        this.pickKeys(entry, keys),
                                );
                            }

                            private flattenAndClean(
                                objectRef: PlainObject,
                                keyPrefix = '',
                            ): PlainObject {
                                const depthGraph: PlainObject = {};
                                const keys: string[] = Object.keys(objectRef);

                                for (const key of keys) {
                                    const path: string = keyPrefix
                                        ? `${keyPrefix}.${key}`
                                        : key;

                                    if (this.passesBlacklist(path)) {
                                        if (PlainComposer.isObject(objectRef[key])) {
                                            const childKeys: PlainObject =
                                                this.flattenAndClean(
                                                    objectRef[key],
                                                    path,
                                                );

                                            Object.assign(depthGraph, childKeys);
                                        } else {
                                            this.keySet.add(path);
                                            depthGraph[path] = objectRef[key];
                                        }
                                    }
                                }

                                return depthGraph;
                            }

                            private pickKeys<E extends string>(
                                source: PlainObject,
                                keys: E[],
                            ): Record<E, T[E]> {
                                return keys.reduce(
                                    (
                                        collected: Record<E, T[E]>,
                                        key: E,
                                    ): Record<E, T[E]> => {
                                        collected[key] = source[key];

                                        return collected;
                                    },
                                    {} as Record<E, T[E]>,
                                );
                            }

                            private passesBlacklist(key: string): boolean {
                                if (this.rules?.excludeKeys) {
                                    return !this.rules.excludeKeys.includes(key);
                                }

                                return true;
                            }
                        }

                        return new PlainComposer(input.rules).toPlain(input.entries);
                    },
                    {rules: keyRules, entries: tableEntries},
                )
        );
    }
}
