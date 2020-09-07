import { Any, PlainObject } from '@angular-ru/common/typings';
import { decodeJwt, toBase64 } from '@angular-ru/stream/jwt';

describe('[TEST]: JWT', (): void => {
    /**
     * const token = 'xxxxxxxxx.XXXXXXXX.xxxxxxxx'
     * const [headerEncoded, payloadEncoded, signature] = token.split('.')
     */
    const token: string = `
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJleHBpcmVzQXQiOjE1NDE2MjQ0MDAsImdyb3VwcyI6WyJncm91cCJdLCJpc3N1ZXIiOiJpc3N1ZXIiLCJ1c2VyIjoidXNlciJ9.
    0x2qcqp0cis-piHKLS11j_g6E2Sis_regNc0e18AU7Y
`.replace(/\n|\t|\s/g, '');

    const decodeModel: Partial<PlainObject> = {
        expiresAt: 1541624400,
        groups: ['group'],
        issuer: 'issuer',
        user: 'user'
    };

    it('should be correct decode', (): void => {
        expect(toBase64(decodeModel)).toBe(
            `eyJleHBpcmVzQXQiOjE1NDE2MjQ0MDAsImdyb3VwcyI6WyJncm91cCJdLCJpc3N1ZXIiOiJpc3N1ZXIiLCJ1c2VyIjoidXNlciJ9`
        );
    });

    it('decodeJwt', (): void => {
        expect(decodeJwt(token)).toEqual(decodeModel);
    });

    it('should be correct encode', (): void => {
        expect(toBase64({ login: 'username', password: 'password' })).toEqual(
            'eyJsb2dpbiI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9'
        );
    });

    it('should be return null when invalid token', (): void => {
        expect(decodeJwt(null)).toEqual(null);
        expect(decodeJwt(NaN as Any)).toEqual(null);
        expect(decodeJwt(undefined!)).toEqual(null);
        expect(decodeJwt('')).toEqual(null);
        expect(decodeJwt('invalid jwt string')).toEqual(null);
    });
});
