#### `@angular-ru/common/array`

-   `AttributeBoolean`

```ts
@Component({
    selector: 'child-component',
    template: ''
})
class ChildComponent {
    @AttributeBoolean() @Input() public prop1!: boolean | string; // === true
    @Input() public prop2?: boolean | string; // === '', while ('' == false)
    @AttributeBoolean() @Input() public prop3?: boolean | string; // === true
    @AttributeBoolean() @Input() public prop4?: boolean | string; // === true
    @AttributeBoolean() @Input() public prop5?: boolean | string; // === false
}

@Component({
    selector: 'host-component',
    template: ` <child-component
        prop1
        prop2
        [prop3]="someTruthy"
        [prop4]="emptyString"
        [prop5]="someAnotherFalsy"
    ></child-component>`
})
class HostComponent {
    public someTruthy: Any = {};
    public emptyString: string = '';
    public someAnotherFalsy: Any = null;
}
```
