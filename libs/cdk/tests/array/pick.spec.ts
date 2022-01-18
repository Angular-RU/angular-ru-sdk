import { pick } from '@angular-ru/cdk/array';

interface MockObj {
    name: string;
    age: number;
    place: { home: string };
}

describe('[TEST]: pick', (): void => {
    const objMock: MockObj = { name: 'Mike', age: 20, place: { home: 'sweet home' } };
    const arrMock: MockObj[] = [objMock];

    it('should return value by key', (): void => {
        const primitiveKey: keyof MockObj = 'name';
        const objKey: keyof MockObj = 'place';

        expect(arrMock.map(pick(primitiveKey))).toEqual(['Mike']);
        expect(arrMock.map(pick(objKey))).toEqual([{ home: 'sweet home' }]);
    });

    it('no pick values by deep keys', (): void => {
        const deepKey: string = 'home';

        // @ts-ignore
        expect(arrMock.map(pick(deepKey))).toEqual([undefined]);
    });

    it('should return undefined by typo', (): void => {
        const keyWithTypo: string = 'typo';

        // @ts-ignore
        expect(arrMock.map(pick(keyWithTypo))).toEqual([undefined]);
    });
});
