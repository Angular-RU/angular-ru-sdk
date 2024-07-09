import {Injectable} from '@angular/core';

@Injectable()
export class WebsocketConfig {
    public readonly reconnectionDelay: number = 2000;
    public readonly binaryType: BinaryType = 'arraybuffer';
}
