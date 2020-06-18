import { Injectable } from '@angular/core';

import { LexerJSON } from '../logger.config';

@Injectable()
export class JsonFactory {
    private readonly _string: string = 'color:green';
    private readonly _number: string = 'color:darkorange';
    private readonly _boolean: string = 'color:blue';
    private readonly _null: string = 'color:magenta';
    private readonly _key: string = 'color:red';
    private readonly lexerTypeFinder: RegExp = LexerJSON;

    // eslint-disable-next-line max-lines-per-function
    public colorsJSON(json: string): string[] {
        const arr: string[] = [];
        json = json.replace(this.lexerTypeFinder, (match: string): string => {
            let style: string = this._number;
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    style = this._key;
                } else {
                    style = this._string;
                }
            } else if (/true|false/.test(match)) {
                style = this._boolean;
            } else if (/null/.test(match)) {
                style = this._null;
            }
            arr.push(style);
            arr.push('');
            return `%c${match}%c`;
        });

        arr.unshift(json);

        return arr;
    }
}
