import {Observable} from 'rxjs';

export interface WebsocketHandler<K> {
    readonly baseUrl: string;

    connect(path: string): void;

    onConnected(event?: Event): void;

    disconnect(event?: Event): void;

    onDisconnected(): void;

    on<T = void>(type: K): Observable<T>;

    single<T = void>(type: K): Observable<T>;

    sendMessage<T>(type: K, data: T): void;
}
