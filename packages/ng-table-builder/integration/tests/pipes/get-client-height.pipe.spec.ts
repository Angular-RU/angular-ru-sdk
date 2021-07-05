import { Nullable } from '@angular-ru/common/typings';
import { GetClientHeightPipe } from '../../../src/pipes/get-client-height.pipe';

class MockElementRef<T = any> {
    public nativeElement: Nullable<T>;

    constructor(nativeElement: Nullable<T>) {
        this.nativeElement = nativeElement;
    }
}

describe('[TEST] get client height pipe', () => {
    const getClientHeightPipe: GetClientHeightPipe = new GetClientHeightPipe();
    const elRef1: Nullable<MockElementRef> = new MockElementRef({ clientHeight: 30 });
    const elRef2: Nullable<MockElementRef> = new MockElementRef({ clientHeight: null });
    const elRef3: Nullable<MockElementRef> = new MockElementRef({ clientHeight: undefined });
    const elRef4: Nullable<MockElementRef> = new MockElementRef({});
    const elRef5: Nullable<MockElementRef> = new MockElementRef(undefined);
    const elRef6: Nullable<MockElementRef> = new MockElementRef(null);
    const elRef7: Nullable<MockElementRef> = null;
    const elRefs: Nullable<MockElementRef>[] = [
        new MockElementRef({ clientHeight: 20 }),
        new MockElementRef({}),
        null,
        new MockElementRef({ clientHeight: 30 })
    ];

    it('should be correct calculate client height when clientHeight = 30', () => {
        expect(getClientHeightPipe.transform(elRef1)).toEqual(30);
    });

    it('should be correct calculate client height when clientHeight = null', () => {
        expect(getClientHeightPipe.transform(elRef2)).toEqual(0);
    });

    it('should be correct calculate client height when clientHeight = undefined', () => {
        expect(getClientHeightPipe.transform(elRef3)).toEqual(0);
    });

    it('should be correct calculate client height when clientHeight is not key of nativeElement', () => {
        expect(getClientHeightPipe.transform(elRef4)).toEqual(0);
    });

    it('should be correct calculate client height when nativeElement = undefined', () => {
        expect(getClientHeightPipe.transform(elRef5)).toEqual(0);
    });

    it('should be correct calculate client height when nativeElement = null', () => {
        expect(getClientHeightPipe.transform(elRef6)).toEqual(0);
    });

    it('should be correct calculate client height when elementRef = null', () => {
        expect(getClientHeightPipe.transform(elRef7)).toEqual(0);
    });

    it('should be correct calculate client height for refs array', () => {
        expect(getClientHeightPipe.transform(elRefs)).toEqual(50);
    });
});
