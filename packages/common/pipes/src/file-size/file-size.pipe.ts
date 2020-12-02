import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
    private readonly units: string[] = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb'];
    private readonly commonPrecision: number = 2;
    private readonly byteSize: number = 1024;

    public transform(bytes: number = 0, precision: number = this.commonPrecision): string {
        let result: string;
        if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
            result = '?';
        } else {
            let unit: number = 0;

            while (bytes >= this.byteSize) {
                bytes /= this.byteSize;
                unit++;
            }

            result = `${bytes.toFixed(+precision)} ${this.units[unit]}`;
        }
        return result;
    }
}
