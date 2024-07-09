/* eslint-disable spellcheck/spell-checker */
import {PlainObject} from '@angular-ru/cdk/typings';

export const dataset: PlainObject[] = [
    {id: 1, firstName: 'albattani', lastName: 'herschel', age: 32, nullable: null},
    {id: 2, firstName: 'allen', lastName: 'hermann', age: 42, nullable: 'not null'},
    {id: 3, firstName: 'almeida', lastName: 'heisenberg', age: 50, nullable: 'not null'},
    {nullable: undefined, id: 4, firstName: 'antonelli', age: 19},
    {firstName: 'agnesi', id: 5, lastName: 'hawking', age: 22, nullable: null},
];

export const datasetNested: PlainObject[] = [
    {
        id: 1,
        firstName: 'albattani',
        lastName: 'herschel',
        age: 32,
        locale: {country: 'uk', lang: 'en', code: 44},
    },
    {
        id: 2,
        firstName: 'allen',
        lastName: 'hermann',
        age: 42,
        locale: {country: 'us', lang: 'en', code: 1},
    },
    {
        id: 3,
        firstName: 'antonelli',
        age: 19,
        locale: {country: 'at', lang: 'de', code: 43},
    },
    {
        id: 4,
        firstName: 'almeida',
        lastName: 'hawking',
        age: 42,
        locale: {country: 'ru', lang: 'ru', code: 7},
    },
];

export const datasetTranslated: PlainObject[] = [
    {uid: 'qwe-123', name: 'albattani', appearance: {color: 'black', shape: 'square'}},
    {uid: 'wer-456', name: 'allen', appearance: {color: 'red', shape: 'arrow'}},
    {uid: 'asd-434', name: 'antonelli', appearance: {color: null, shape: null}},
];

export const translationMap: PlainObject = {
    model: {uid: 'UID', name: 'Name', appearance: {color: 'Color', shape: 'Shape'}},
};
