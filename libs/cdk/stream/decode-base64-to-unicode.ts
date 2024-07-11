export function decodeBase64ToUnicode(str: string): any {
    const HEX_LENGTH = -2;
    const ZEROS = '00';
    const HEX = 16;

    return decodeURIComponent(
        Array.prototype.map
            .call(window.atob(str), (c: any): any => {
                // eslint-disable-next-line unicorn/prefer-code-point
                const hexCode: string = c.charCodeAt(0).toString(HEX);
                const preparedHexCode: string = `${ZEROS}${hexCode}`.slice(HEX_LENGTH);

                return `%${preparedHexCode}`;
            })
            .join(''),
    );
}
