import {GetFreeSizePipe} from '../../../virtual-table/pipes/get-free-size.pipe';

describe('[TEST] getFreeSizePipe', () => {
    const pipe = new GetFreeSizePipe();

    it('should be correct calculate FreeSize when occupiedPixels = 20', () => {
        expect(pipe.transform(20)).toBe('calc(100% - 20px)');
    });

    it('should be correct calculate FreeSize when occupiedPixels = 0', () => {
        expect(pipe.transform(0)).toBe('calc(100% - 0px)');
    });
});
