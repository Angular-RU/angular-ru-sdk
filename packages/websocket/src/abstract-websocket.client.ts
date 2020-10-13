import { Any } from '@angular-ru/common/typings';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription, throwError } from 'rxjs';
import { catchError, filter, map, take, takeUntil } from 'rxjs/operators';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { WebsocketConfig } from './websocket.config';
import { WebsocketHandler, WebsocketMessage } from './websocket.interfaces';

@Injectable()
export abstract class AbstractWebsocketClient<K> implements WebsocketHandler<K>, OnDestroy {
    public connected$: ReplaySubject<Event> = new ReplaySubject();
    public disconnected$: ReplaySubject<Event> = new ReplaySubject();
    public destroy$: Subject<boolean> = new Subject<boolean>();
    protected readonly messages$: Subject<WebsocketMessage<K, Any>> = new Subject();
    private connected: boolean = false;
    private socket$!: WebSocketSubject<WebsocketMessage<K, Any>>;
    private subscription!: Subscription;
    private handlerPath!: string;

    protected constructor(private readonly wsConfig: WebsocketConfig, private readonly ngZone: NgZone) {}

    public get isConnected(): boolean {
        return this.connected;
    }

    public get isDisconnected(): boolean {
        return !this.connected;
    }

    public abstract get baseUrl(): string;

    public get connectionPath(): string {
        return `${this.baseUrl}${this.handlerPath}`;
    }

    private get webSocketSubjectConfig(): WebSocketSubjectConfig<Any> {
        return {
            url: this.connectionPath,
            openObserver: {
                next: (event: Event): void => {
                    this.connected = true;
                    this.connected$.next(event);
                    this.onConnected(event);
                }
            },
            closeObserver: {
                next: (event: Event): void => {
                    this.connected = false;
                    this.disconnected$.next(event);
                    this.onDisconnected(event);
                }
            }
        };
    }

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
        this.subscription?.unsubscribe();
        this.socket$?.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    public on<T = void>(type: K): Observable<T> {
        return this.messages$.pipe(
            filter((message: WebsocketMessage<K, T>): boolean => message.type === type),
            map((message: WebsocketMessage<K, T>): T => message.data),
            catchError((err: Error): Observable<never> => throwError(err)),
            takeUntil(this.destroy$)
        );
    }

    public single<T = void>(type: K): Observable<T> {
        return this.on<T>(type).pipe(take(1));
    }

    public sendMessage<T>(type: K, data: T): void {
        this.socket$.next({ type, data });
    }

    public ngOnDestroy(): void {
        this.disconnect();
    }

    private _connect(): void {
        this.socket$ = webSocket(this.webSocketSubjectConfig);
        this.subscription = this.socket$
            .pipe(
                catchError(
                    (err: Error): Observable<never> => {
                        this.reconnection(this.subscription);
                        return throwError(err);
                    }
                ),
                takeUntil(this.destroy$)
            )
            .subscribe((message: WebsocketMessage<K, Any>): void => {
                window.requestAnimationFrame((): void => this.messages$.next(message));
            });
    }

    private reconnection(subscription: Subscription): void {
        if (!subscription.closed) {
            subscription.unsubscribe();
        }

        this.ngZone.runOutsideAngular((): void => {
            window.setTimeout((): void => this._connect(), this.wsConfig.reconnectionDelay);
        });
    }
}
