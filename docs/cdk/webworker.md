#### `@angular-ru/cdk/webworker`

- `WebWorkerThreadService` - Web workers allow you to run CPU-intensive computations in a background thread, freeing the
  main thread to update the user interface. If you find your application performs a lot of computations, such as
  generating CAD drawings or doing heavy geometrical calculations, using web workers can help increase your
  application's performance.

```typescript
@Component({
  // ...
  providers: [WebWorkerThreadService],
})
export class MyComponent {
  constructor(private readonly worker: WebWorkerThreadService) {}
}
```
