import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    AbstractWebsocketClient,
    BINARY,
    PLAIN_TEXT,
    WebsocketConfig,
    WebsocketMessage
} from '@angular-ru/cdk/websocket';

@Injectable()
class WebsocketSimpleParseClient extends AbstractWebsocketClient<any> {
    public get baseUrl(): string {
        return 'ws://';
    }

    protected override serialize(message: any): string {
        return JSON.stringify(message);
    }

    protected override deserialize(messageEvent: MessageEvent): WebsocketMessage<any> {
        return JSON.parse(messageEvent.data);
    }
}

@Injectable()
class WebsocketSerializeClient extends AbstractWebsocketClient<any> {
    public get baseUrl(): string {
        return 'ws://';
    }
}

describe('[TEST] Websocket client', (): void => {
    beforeEach(() => {
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback): number => {
            callback(0);

            return 0;
        });

        jest.spyOn(window, 'setTimeout').mockImplementation((callback: any): NodeJS.Timeout => {
            callback(0);

            return 0 as unknown as NodeJS.Timeout;
        });

        TestBed.configureTestingModule({
            providers: [
                WebsocketSimpleParseClient,
                WebsocketSerializeClient,
                { provide: WebsocketConfig, useValue: { reconnectionDelay: 1000 } }
            ]
        });
    });

    it('should connect and reconnect on error', () => {
        const client: WebsocketSimpleParseClient = TestBed.inject(WebsocketSimpleParseClient);
        const observer: jest.Mock = jest.fn();

        client.on<string>('message').subscribe(observer);

        const spyReconnect: jest.SpyInstance = jest.spyOn(client as 'reconnect');

        client.connect('null');

        let nativeSocket: WebSocket = (client as any).socket$._socket;
        const spyClose: jest.SpyInstance = jest.spyOn(nativeSocket, 'close');

        expect(nativeSocket).toBeInstanceOf(WebSocket);
        nativeSocket.dispatchEvent(new MessageEvent('open'));
        expect(nativeSocket.url).toBe('ws://null/');

        // sending legal message
        nativeSocket.dispatchEvent(
            new MessageEvent('message', {
                data: JSON.stringify({
                    type: 'message',
                    data: 'some_data'
                })
            })
        );
        expect(observer.mock.calls).toEqual([['some_data']]);
        expect(spyReconnect).toHaveBeenCalledTimes(0);
        expect(spyClose).toHaveBeenCalledTimes(0);

        // sending breaking message
        nativeSocket.dispatchEvent(new MessageEvent('message', { data: 'some_data' }));
        expect(observer.mock.calls).toEqual([['some_data']]);
        expect(spyReconnect).toHaveBeenCalledTimes(1);
        expect(spyClose).toHaveBeenCalledTimes(1);

        // checking if there is a new connection
        expect((client as any).socket$._socket).not.toBe(nativeSocket);
        nativeSocket = (client as any).socket$._socket;
        expect(nativeSocket).toBeInstanceOf(WebSocket);
        nativeSocket.dispatchEvent(new MessageEvent('open'));

        // sending legal message again
        nativeSocket.dispatchEvent(
            new MessageEvent('message', {
                data: JSON.stringify({
                    type: 'message',
                    data: 'some_another_data'
                })
            })
        );
        expect(observer.mock.calls).toEqual([['some_data'], ['some_another_data']]);
        expect(spyReconnect).toHaveBeenCalledTimes(1);
        expect(spyClose).toHaveBeenCalledTimes(1);
    });

    it('should distribute message types', () => {
        const client: WebsocketSerializeClient = TestBed.inject(WebsocketSerializeClient);
        const messageObserver: jest.Mock = jest.fn();
        const plainTextObserver: jest.Mock = jest.fn();
        const binaryObserver: jest.Mock = jest.fn();

        client.on<string>('message').subscribe(messageObserver);
        client.on<string>(PLAIN_TEXT).subscribe(plainTextObserver);
        client.on<string>(BINARY).subscribe(binaryObserver);

        const spyReconnect: jest.SpyInstance = jest.spyOn(client as 'reconnect');

        client.connect('null');

        const nativeSocket: WebSocket = (client as any).socket$._socket;
        const spyClose: jest.SpyInstance = jest.spyOn(nativeSocket, 'close');
        const spySend: jest.SpyInstance = jest.spyOn(nativeSocket, 'send').mockImplementation((): void => {
            // ...
        });

        expect(nativeSocket).toBeInstanceOf(WebSocket);
        nativeSocket.dispatchEvent(new MessageEvent('open'));
        expect(nativeSocket.url).toBe('ws://null/');
        Object.defineProperty(nativeSocket, 'readyState', { value: 1 });

        // sending json message
        const jsonData: string = JSON.stringify({
            type: 'message',
            data: 'some_data'
        });

        nativeSocket.dispatchEvent(new MessageEvent('message', { data: jsonData }));
        expect(messageObserver.mock.calls).toEqual([['some_data']]);
        expect(spyReconnect).toHaveBeenCalledTimes(0);
        expect(spyClose).toHaveBeenCalledTimes(0);

        // sending plain message
        nativeSocket.dispatchEvent(new MessageEvent('message', { data: 'some_data' }));
        expect(plainTextObserver.mock.calls).toEqual([['some_data']]);
        expect(spyReconnect).toHaveBeenCalledTimes(0);
        expect(spyClose).toHaveBeenCalledTimes(0);

        // sending binary message
        const binaryData = new ArrayBuffer(1);

        nativeSocket.dispatchEvent(new MessageEvent('message', { data: binaryData }));
        expect(binaryObserver.mock.calls[0][0]).toEqual(binaryData);
        expect(spyReconnect).toHaveBeenCalledTimes(0);
        expect(spyClose).toHaveBeenCalledTimes(0);

        const message = { type: 'outgoing', data: 'message' };

        client.sendMessage(message.type, message.data);
        expect(spySend.mock.calls).toEqual([[JSON.stringify(message)]]);

        client.sendMessage(PLAIN_TEXT, 'message');
        expect(spySend.mock.calls).toEqual([[JSON.stringify(message)], ['message']]);

        client.sendMessage(BINARY, binaryData);
        expect(spySend.mock.calls[2][0]).toEqual(binaryData);
    });
});
