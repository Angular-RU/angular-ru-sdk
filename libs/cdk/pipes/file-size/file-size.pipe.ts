import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: false, name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
    private readonly units: string[] = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb'];
    private readonly commonPrecision: number = 2;
    private readonly byteSize: number = 1024;

    public transform(bytes = 0, precision: number = this.commonPrecision): string {
        let result: string;
        let calculatedBytes: number = bytes;

        if (isNaN(parseFloat(String(calculatedBytes))) || !isFinite(calculatedBytes)) {
            result = '?';
        } else {
            let unit = 0;

            while (calculatedBytes >= this.byteSize) {
                calculatedBytes /= this.byteSize;
                unit++;
            }

            result = `${calculatedBytes.toFixed(Number(precision))} ${this.units[unit]}`;
        }

        return result;
    }
}
