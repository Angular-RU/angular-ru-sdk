#### `@angular-ru/common/decorators`

-   `AttributeBoolean`

```ts
import { AttributeBoolean } from '@angular-ru/common/decorators';
import { InputBoolean } from '@angular-ru/common/typings';

@Component({
    selector: 'child-component',
    template: ''
})
class ChildComponent {
    @AttributeBoolean() @Input() public prop1: InputBoolean; // === true
    @Input() public prop2: InputBoolean; // === '', while ('' == false)
    @AttributeBoolean() @Input() public prop3: InputBoolean; // === true
    @AttributeBoolean() @Input() public prop4: InputBoolean; // === true
    @AttributeBoolean() @Input() public prop5: InputBoolean; // === false

    private _prop6: string;
    @AttributeBoolean()
    @Input()
    public set prop6(value: InputBoolean) {
        this._prop6 = `prop6: ${value}`;
    }

    public get prop6(): InputBoolean {
        // === 'prop6: true - from getter'
        return this._prop6 ? `${this._prop6} - from getter` : undefined;
    }

    // order doesn't matter in all cases
    @Input()
    @AttributeBoolean()
    public set hookProp(value: InputBoolean) {
        this.handleProp(value);
    }

    public prop7Calls: boolean[] = []; // === [true]
    @AttributeBoolean()
    @Input()
    public set prop7(value: InputBoolean) {
        this.hookCalls.push(value as boolean);
    }
}

@Component({
    selector: 'host-component',
    template: ` <child-component
        prop1
        prop2
        [prop3]="someTruthy"
        [prop4]="emptyString"
        [prop5]="someAnotherFalsy"
        prop6
        prop7
    ></child-component>`
})
class HostComponent {
    public someTruthy: Any = {};
    public emptyString: string = '';
    public someAnotherFalsy: Any = null;
}
```
