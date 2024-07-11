import {decodeJwt, toBase64} from '@angular-ru/cdk/stream';
import {PlainObject} from '@angular-ru/cdk/typings';

describe('[TEST]: JWT', (): void => {
    const decodeModel: PlainObject = {
        expiresAt: 1541624400,
        groups: ['group'],
        issuer: 'issuer',
        user: 'user',
    };

    it('should be correct decode', (): void => {
        expect(toBase64(decodeModel)).toBe(
            'eyJleHBpcmVzQXQiOjE1NDE2MjQ0MDAsImdyb3VwcyI6WyJncm91cCJdLCJpc3N1ZXIiOiJpc3N1ZXIiLCJ1c2VyIjoidXNlciJ9',
        );
    });

    describe('decodeJwt', () => {
        /**
         * const token = 'xxxxxxxxx.XXXXXXXX.xxxxxxxx'
         * const [headerEncoded, payloadEncoded, signature] = token.split('.')
         */
        const token: string = `
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJleHBpcmVzQXQiOjE1NDE2MjQ0MDAsImdyb3VwcyI6WyJncm91cCJdLCJpc3N1ZXIiOiJpc3N1ZXIiLCJ1c2VyIjoidXNlciJ9.
            0x2qcqp0cis-piHKLS11j_g6E2Sis_regNc0e18AU7Y
        `.replaceAll(/\s/g, '');

        it('simple example JWT decode', (): void => {
            expect(decodeJwt(token)).toEqual(decodeModel);
        });

        it('complex token', (): void => {
            expect(
                decodeJwt(
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoODgiLCJncm91cHMiOlsiZGlzcHV0ZV9hbmFseXRpY3NfZHdoIiwiU3VycHJpc2UiLCJ0YnVuZGxlX3Byb19hbGwiLCJBenVyZV9saWNlbnNlX0VudGVycHJpc2VfTW9iaWxpdHlfU2VjdXJpdHlfRTMiLCJBenVyZV9BZHN5bmMiLCJyZHB1c2Vyc19wc2QtcHJvZCIsIk1GQSBTbGFjayIsImFkZnNfbGlub3RwIiwid29ya19wYXNzZXMiLCJsb2NhbF9yZHVfVENTNDMxNSIsInNhZ2VfZGVmYXVsdCIsImNyeXB0b191c2VycyIsInplcHBlbGluLWNsYWltLWRpc3B1dGUiLCJhdG1tb25fdGVzdF9zaGFyZV9ydyIsImdyZWVucGx1bV9hY2Nlc3NfYXRtIiwiaHBfbTcyNV9raHV0b3JfMTdzdHJfMmZsb29yIiwidnBuX2xpbm90cCIsImppcmEyLXVzZXJzIiwiYXRtX2Rpc3B1dGUiLCJiaV9vcGVyIiwiYXRtbW9uX3NoYXJlX3J3Iiwic2FzX2NhcmRfbnVtIiwiZ3JlZW5wbHVtX2FjY2Vzc19wZzIiLCJTZXJ2aWNlRGVza193YXRjaGVycyIsIkFCX1RpbmtvZmZCYW5rX09mZmljZSIsImhvbWVfZGlyX2Rpc2tfdSIsInByb2Nlc3NpbmdfbG9nc19zaGFyZV9ybyIsImppcmEtdXNlcnMiLCJBQl9UaW5rb2ZmQmFua19BbGwiLCJ3aWtpX3VzZXJzX25ldyIsIlByaW1lIE9ubGluZSIsImJpX2JhY2tvZmZpY2VfcGF5cm9sbCIsIkV4Y2hhbmdlX1JlY2lwaWVudExpbWl0c18xMDAiLCJtYWlsYm94X3BheW1lbnRfZGlzcHV0ZV9TZW5kX0FzIiwiSW5ldF9PZmZpY2VfVXNlcnMgZ3JvdXAiLCJwYXltZW50X2Rpc3B1dGUiLCJwYXltZW50X2Rpc3B1dGVfU2VuZF9BcyIsImJpX2NsYWltIiwiYmlfcHJvYyIsIkV4dE1haWxfQUxMX09VVCIsIkV4dE1haWxfQUxMX0lOIiwiZGlzcHV0ZSIsIkV4Y2hhbmdlX0VuYWJsZWRfTUFQSSIsIlByb2Nlc3NpbmdBcmNfc2hhcmVfcm9fZ3JvdXAiLCJuZXRfcHJvY2Vzc2luZyIsImRldl9yZWFkX2dyb3VwIiwiUGF5bWVudCBTeXN0ZW0gRGVwYXJ0bWVudCIsImljZXdhcnBfbWFpbF9saXN0cyIsIm1haWxfZ3JvdXBzX2Zvcl9maXJlZCIsIkFCX1RpbmtvZmZJbnN1cmFuY2VfQWxsIiwiYmlfdXNlcnMiLCJtYWlsX0RLT19BTExfR1JPVVAiLCJwY191aV9jdXN0b21lcl9zZXJ2aWNlIiwiZHdoX3VzZXJsYWJzX3BzYV9yZWFkIiwiZnBzX2ZpbGVfZXhjaF9zaGFyZV9ydyIsImR3aF9pbnRlZ3JhdGlvbl9jbGFpbV9zcl9yZXBvcnRfbG9naW5zX3J3IiwiZGlzcF9kb2NzX3NoYXJlX3J3IiwiemVwcGVsaW5fZGlzcHV0ZXMiLCJzYmwtYXJtIiwibWFpbF9PVk9fQUxMX0dST1VQIiwiY2FyZHNfYWxsIiwiY2xhaW1fc2hhcmVfZ3JvdXBfcnciLCJFeHRNYWlsX0Jsb2NrRnJvbUFsbF9UbyIsInNsYWNrX3VzZXJzIiwiamlyYS10ZW1wIiwiQ0RfUmVhZE9ubHkiLCJVU0JfUmVhZE9ubHkiLCJiaV9iYWNrb2ZmaWNlIiwidmF1bHRfcHJvZF9fY3J5cHRvLXVzZXJzX19yZWFkZXJzIiwicHJpbWVfdHN0X3NoYXJlX2dyb3VwX3J3IiwicHJpbWVfZGV2X3NoYXJlX2dyb3VwX3J3Iiwid2ViLWRldmVsb3BlcnMiLCJiYWNrX3RhY3Ffc3VwcG9ydCIsImIyZy1ib251cy1wcm9tbyIsIkNvbXB1dGVyc19ab29tX0luc3RhbGwiLCJ3aWtpX3ZpZGVvX21pY3Nfc2hhcmVfcnciLCLQl9Cw0L_RgNC-0YHRi1_QkdCt0Jpfc2hhcmVfcnciLCJyZHB1c2Vyc19kcy10ZXJtLXBjaTAxcCIsInJkcHVzZXJzX2RzLXRlcm0tcGNpMDJwIiwic21lX2VuY2FzaG1lbnRfdGVzdF9zaGFyZV9ydyIsInNtZV9lbmNhc2htZW50X3NoYXJlX3J3IiwicHJvY2Vzc2luZ19kaXN0cl9zaGFyZV9ncm91cF9ydyIsImNhbGVuZGFyX3NlaW0iLCJkd2hfaW50ZWdyYXRpb25fc2hhcmVfcm8iXSwic2Vzc2lvbklkIjoiMTFkYjc1ZjItMjkxYS00MjUyLWFmYWMtMTNjZDQ5MTA2ZGJlIiwiZW52IjoiW3Rlc3RdIiwiZXhwIjoxNjE2MDU5NjAyLCJ1c2VyIjoiZy5iYXJhbm92IiwiZmluZ2VyUHJpbnQiOiJNMW9zbUJhdUhrOUszNGcyOW9rOEE4VEY2c0hiOFRJOXhvRU1uMDA5ek1ZPSJ9._vFmAkHXtoeAZwXMKY75W7rVXoUGKOG1ijXS3w52T14',
                ),
            ).toEqual({
                iss: expect.any(String),
                groups: expect.any(Array),
                sessionId: expect.any(String),
                env: expect.any(String),
                exp: expect.any(Number),
                user: expect.any(String),
                fingerPrint: expect.any(String),
            });
        });
    });

    it('should be correct encode', (): void => {
        expect(toBase64({login: 'username', password: 'password'})).toBe(
            'eyJsb2dpbiI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9',
        );
    });

    it('should be return null when invalid token', (): void => {
        expect(decodeJwt(null)).toBeNull();
        expect(decodeJwt(NaN as any)).toBeNull();
        expect(decodeJwt(undefined)).toBeNull();
        expect(decodeJwt('')).toBeNull();
        expect(decodeJwt('invalid jwt string')).toBeNull();
    });
});
