import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Nullable, PlainObject } from '@angular-ru/cdk/typings';
import { isFalsy, tryParseJson } from '@angular-ru/cdk/utils';
import { Observable, ReplaySubject, Subject, Subscription, throwError } from 'rxjs';
import { catchError, filter, map, take, takeUntil } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { WebsocketHandler } from '../interfaces/websocket-handler';
import { WebsocketMessage } from '../interfaces/websocket-message';
import { WebsocketConfig } from './websocket-config';

type WebSocketMessage = string | ArrayBuffer | Blob | ArrayBufferView;

export const PLAIN_TEXT: PlainObject = {};
export const BINARY: PlainObject = {};

@Injectable()
export abstract class AbstractWebsocketClient<K extends string | PlainObject>
    implements WebsocketHandler<K>, OnDestroy
{
    private connected: boolean = false;
    private socket$: Nullable<WebSocketSubject<WebsocketMessage<K, any>>>;
    private socketSubscription: Nullable<Subscription>;
    private handlerPath: Nullable<string>;
    protected readonly messages$: Subject<WebsocketMessage<K, any>> = new Subject();
    public connected$: ReplaySubject<Event> = new ReplaySubject(Number.POSITIVE_INFINITY);
    public disconnected$: ReplaySubject<Event> = new ReplaySubject(Number.POSITIVE_INFINITY);
    public destroy$: Subject<boolean> = new Subject<boolean>();

    protected constructor(private readonly wsConfig: WebsocketConfig, private readonly ngZone: NgZone) {}

    public get isConnected(): boolean {
        return this.connected;
    }

    public get isDisconnected(): boolean {
        return !this.connected;
    }

    public get connectionPath(): string {
        return `${this.baseUrl}${this.handlerPath}`;
    }

    private get webSocketSubjectConfig(): WebSocketSubjectConfig<any> {
        return {
            openObserver: { next: (event: Event): void => this.onOpenObserver(event) },
            closeObserver: { next: (event: Event): void => this.onCloseObserver(event) },
            serializer: (message: any): WebSocketMessage => this.serialize(message),
            deserializer: (event: MessageEvent): any => this.deserialize(event),
            url: this.connectionPath,
            binaryType: this.wsConfig.binaryType
        };
    }

    private static isArrayBuffer(value: any): value is ArrayBuffer | Blob {
        return value instanceof ArrayBuffer || value instanceof Blob;
    }

    public abstract get baseUrl(): string;

    public onConnected(_event?: Event): void {
        // noop
    }

    public onDisconnected(_event?: Event): void {
        // noop
    }

    public connect(path: string): void {
        this.handlerPath = path;
        this.ngZone.runOutsideAngular((): void => this._connect());
        this.destroy$ = new Subject<boolean>();
    }

    public disconnect(): void {
        this.socketSubscription?.unsubscribe();
        this.socket$?.complete();
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public on<T = void>(type: K): Observable<T> {
        return this.messages$.pipe(
            filter((message: WebsocketMessage<K, T>): boolean => message.type === type),
            map((message: WebsocketMessage<K, T>): T => message.data),
            catchError((error: unknown): Observable<never> => throwError((): Error => error as Error)),
            takeUntil(this.destroy$)
        );
    }

    public single<T = void>(type: K): Observable<T> {
        return this.on<T>(type).pipe(take(1));
    }

    public sendMessage<T>(type: K, data: T): void {
        this.socket$?.next({ type, data });
    }

    public ngOnDestroy(): void {
        this.disconnect();
    }

    protected serialize(message: WebsocketMessage<K, any>): WebSocketMessage {
        switch (message.type) {
            case BINARY:
            case PLAIN_TEXT:
                return message.data;
            default:
                return JSON.stringify(message);
        }
    }

    protected deserialize({ data }: MessageEvent): WebsocketMessage<any, any> {
        if (AbstractWebsocketClient.isArrayBuffer(data)) {
            return { type: BINARY, data };
        } else {
            return tryParseJson<WebsocketMessage<any, any>>(data) ?? { type: PLAIN_TEXT, data };
        }
    }

    private onOpenObserver(event: Event): void {
        this.connected = true;
        this.connected$.next(event);
        this.onConnected(event);
    }

    private onCloseObserver(event: Event): void {
        this.connected = false;
        this.disconnected$.next(event);
        this.onDisconnected(event);
    }

    private _connect(): void {
        this.socket$ = webSocket(this.webSocketSubjectConfig);
        this.socketSubscription = this.socket$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (message: WebsocketMessage<K, any>): void => {
                window.requestAnimationFrame((): void => this.messages$.next(message));
            },
            error: (): void => this.reconnect()
        });
    }

    private reconnect(): void {
        this.completeStoppedSocket();
        this.socketUnsubscribe();

        this.ngZone.runOutsideAngular((): void => {
            // eslint-disable-next-line no-restricted-properties
            window.setTimeout((): void => this._connect(), this.wsConfig.reconnectionDelay);
        });
    }

    private completeStoppedSocket(): void {
        // TODO: need replace isStopped
        // eslint-disable-next-line deprecation/deprecation
        if (isFalsy(this.socket$?.isStopped)) {
            this.socket$?.complete();
        }
    }

    private socketUnsubscribe(): void {
        if (isFalsy(this.socketSubscription?.closed)) {
            this.socketSubscription?.unsubscribe();
        }
    }
}
