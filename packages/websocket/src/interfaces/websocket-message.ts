export interface WebsocketMessage<K, V> {
    type: K;
    data: V;
}
