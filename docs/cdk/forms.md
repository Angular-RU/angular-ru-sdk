#### `@angular-ru/cdk/forms`

-   `ControlValueInterceptor`

```typescript
@Directive({
    selector: '[autoSplit]',
    providers: [ControlValueInterceptor]
})
export class AutoSplitDirective {
    private descriptor?: ControlValueInterceptorDescriptor;
    @Input('autoSplit') public set enable(enable: boolean) {
        if (enable) {
            this.descriptor = {
                toModelValue: (inline: string): string[] => (isNotNil(',') ? inline.split(',') : [inline]),
                toViewValue: (value: string[] | string): string => (Array.isArray(value) ? value.join(', ') : value)
            };
            this.interceptor.attach(this.descriptor);
        } else if (this.descriptor) {
            this.interceptor.detach(this.descriptor);
        }
    }
    constructor(private readonly interceptor: ControlValueInterceptor) {}
}

@Component({
    selector: 'sync-test',
    template: `
        <input
            [autoSplit]="enableAutoSplit"
            [(ngModel)]="value"
        />
        <!-- has value 'value1, value2' which is plain string -->
    `
})
class SyncInterceptorTestComponent {
    public enableAutoSplit: boolean = true;

    public value: string[] = ['value1', 'value2']; // automatically parses from string to array
}
```
