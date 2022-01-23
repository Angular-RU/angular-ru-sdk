import { Any } from '@angular-ru/cdk/typings';

export function decodeBase64ToUnicode(str: string): Any {
    const HEX_LENGTH: number = -2;
    const ZEROS: string = '00';
    const HEX: number = 16;

    return decodeURIComponent(
        Array.prototype.map
            .call(window.atob(str), (c: Any): Any => {
                // eslint-disable-next-line unicorn/prefer-code-point
                const hexCode: string = c.charCodeAt(0).toString(HEX);
                const preparedHexCode: string = `${ZEROS}${hexCode}`.slice(HEX_LENGTH);

                return `%${preparedHexCode}`;
            })
            .join('')
    );
}
