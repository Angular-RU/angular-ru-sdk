import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'getFreeSizePipe'
})
export class GetFreeSizePipePipe implements PipeTransform {
    public transform(occupiedPixels: number): string {
        return `calc(100% - ${occupiedPixels}px)`;
    }
}
