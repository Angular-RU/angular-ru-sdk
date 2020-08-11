import { isLocalhost } from '@angular-ru/common/http';

describe('[TEST]: http', () => {
    it('is localhost', () => {
        expect(isLocalhost('https://localhost:4200')).toEqual(true);
        expect(isLocalhost('https://0.0.0.0:4200')).toEqual(true);
        expect(isLocalhost('https://127.0.0.1:4200')).toEqual(true);
        expect(isLocalhost('https://google.com')).toEqual(false);
        expect(isLocalhost('https://google.com/localhost')).toEqual(false);
    });
});
