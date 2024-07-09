import {pick} from '@angular-ru/cdk/array';

interface MockObject {
    name: string;
    age: number;
    place: {home: string};
}

describe('[TEST]: pick', (): void => {
    const objectMock: MockObject = {name: 'Mike', age: 20, place: {home: 'sweet home'}};
    const arrMock: MockObject[] = [objectMock];

    it('should return value by key', (): void => {
        const primitiveKey: keyof MockObject = 'name';
        const objectKey: keyof MockObject = 'place';

        expect(arrMock.map(pick(primitiveKey))).toEqual(['Mike']);
        expect(arrMock.map(pick(objectKey))).toEqual([{home: 'sweet home'}]);
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
