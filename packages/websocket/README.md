## WebSocket service for your Angular app

#### First step

```ts
import { WebsocketModule } from '@angular-ru/websocket';

@NgModule({
    imports: [
        // ...
        WebsocketModule.forRoot()
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

#### Create your websocket client for your websocket controller

Example, if your websocket controller placed here `wss://my-server.com/orders`, then your websocket client will be:

-   `orders-webscoket.client.ts`

```ts
import { AbstractWebsocketClient } from '@angular-ru/websocket';

export const enum OrderEvent {
    ACCEPTED = 'ACCEPTED',
    DECLIENED = 'DECLIENED'
}

@Injectable()
export class OrdersWebsocketClient extends AbstractWebsocketClient<OrderEvent> {
    public get baseUrl(): string {
        return `wss://my-server.com/`;
    }

    public connect(): void {
        super.connect('orders');
    }
}
```

-   `orders.component.ts`

```ts
@Component({
    // ..,
    providers: [OrdersWebsocketClient]
})
export class OrdersComponent {
    constructor(private readonly ordersWsClient: OrdersWebsocketClient) {}

    public ngOnInit() {
        this.ordersWsClient.on<AcceptedModel>(OrderEvent.ACCEPTED).subscribe((event: AcceptedModel) => {
            // business logic
        });
    }
}
```
