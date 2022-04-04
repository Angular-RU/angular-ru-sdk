#### `@angular-ru/cdk/decorators`

-   `AttributeBoolean`

```typescript
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

@Component({
    selector: 'child-component',
    template: ''
})
class ChildComponent {
    @AttributeBoolean() @Input() public prop1: InputBoolean; // === true
    @Input() public prop2: InputBoolean; // === '', while ('' == false)
    @AttributeBoolean() @Input() public prop3: InputBoolean; // === false
    @AttributeBoolean() @Input() public prop4: InputBoolean; // === true
    @AttributeBoolean() @Input() public prop5: InputBoolean; // === true
    @AttributeBoolean() @Input() public prop6: InputBoolean; // === false

    private _prop7: string;
    @AttributeBoolean()
    @Input()
    public set prop7(value: InputBoolean) {
        this._prop6 = `prop7: ${value}`;
    }

    public get prop7(): InputBoolean {
        // === 'prop7: true - from getter'
        return this._prop7 ? `${this._prop7} - from getter` : undefined;
    }

    // order doesn't matter in all cases
    public prop8Calls: boolean[] = []; // === [true]
    @AttributeBoolean()
    @Input()
    public set prop8(value: InputBoolean) {
        this.hookCalls.push(value as boolean);
    }

    @AttributeBoolean() @Input() public prop9: InputBoolean; // === false
}

@Component({
    selector: 'host-component',
    template: `
        <child-component
            prop1
            prop2
            prop7
            prop8
            prop9="false"
            [prop3]="falseString"
            [prop4]="someAnotherTruthy"
            [prop5]="emptyString"
            [prop6]="someAnotherFalsy"
        ></child-component>
    `
})
class HostComponent {
    public falseString: string = 'false';
    public someAnotherTruthy: any = {};
    public emptyString: string = '';
    public someAnotherFalsy: any = null;
}
```

-   `BoundClass`

```typescript
@Injectable()
class B {
    public b: string = '2';
}

@BoundClass
@Injectable()
class A {
    public a: string = '1';

    constructor(public readonly b: B) {}

    public getA() {
        return this;
    }
}

TestBed.configureTestingModule({ providers: [A, B] });

const a = TestBed.inject(A);
const { getA } = a;

expect(a).toEqual({ a: '1', b: { b: '2' } });
expect(getA()).toEqual({ a: '1', b: { b: '2' } });
expect(getA() === a).toBeTruthy();
```
