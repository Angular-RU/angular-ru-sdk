import { FileSizePipe } from '@angular-ru/cdk/pipes';

describe('[TEST]: File Size Pipe', (): void => {
    let fileSizePipe: FileSizePipe;

    beforeEach((): void => {
        fileSizePipe = new FileSizePipe();
    });

    it('should correct transform file size', (): void => {
        let fileSize: number = 1100;

        expect(fileSizePipe.transform(fileSize)).toEqual('1.07 Kb');
        fileSize = 13;
        expect(fileSizePipe.transform(fileSize)).toEqual('13.00 bytes');
        fileSize = 2399033;
        expect(fileSizePipe.transform(fileSize)).toEqual('2.29 Mb');
        fileSize = 2399030030;
        expect(fileSizePipe.transform(fileSize)).toEqual('2.23 Gb');
        fileSize = 2399030030033;
        expect(fileSizePipe.transform(fileSize)).toEqual('2.18 Tb');
        fileSize = 2399030303030030;
        expect(fileSizePipe.transform(fileSize)).toEqual('2.13 Pb');
    });
});
