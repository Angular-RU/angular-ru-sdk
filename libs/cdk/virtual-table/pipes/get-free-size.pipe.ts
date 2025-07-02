import {Pipe, PipeTransform} from '@angular/core';

@Pipe({standalone: false, name: 'getFreeSizePipe'})
export class GetFreeSizePipe implements PipeTransform {
    public transform(occupiedPixels: number): string {
        return `calc(100% - ${occupiedPixels}px)`;
    }
}
