import {Injectable} from '@angular/core';

import {LEXER_JSON} from '../logger.config';

@Injectable()
export class JsonFactory {
    private readonly _string: string = 'color:green';
    private readonly _number: string = 'color:darkorange';
    private readonly _boolean: string = 'color:blue';
    private readonly _null: string = 'color:magenta';
    private readonly _key: string = 'color:red';
    private readonly lexerTypeFinder: RegExp = LEXER_JSON;

    // eslint-disable-next-line max-lines-per-function
    public colorsJSON(json: string): string[] {
        let resultJson: string = json;
        const arr: string[] = [];

        resultJson = resultJson.replace(this.lexerTypeFinder, (match: string): string => {
            let style: string = this._number;

            if (match.startsWith('"')) {
                if (match.endsWith(':')) {
                    style = this._key;
                } else {
                    style = this._string;
                }
            } else if (/true|false/.test(match)) {
                style = this._boolean;
            } else if (match.includes('null')) {
                style = this._null;
            }

            arr.push(style, '');

            return `%c${match}%c`;
        });

        arr.unshift(resultJson);

        return arr;
    }
}
