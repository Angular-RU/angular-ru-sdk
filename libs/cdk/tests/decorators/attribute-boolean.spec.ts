import {CommonModule} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    signal,
    ViewChild,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AttributeBoolean} from '@angular-ru/cdk/decorators';
import {InputBoolean} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';

describe('[TEST]: Attribute boolean', () => {
    let hostFixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    @Component({
        selector: 'child-component',
        template: '',
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class ChildComponent {
        @Input()
        @AttributeBoolean()
        public prop: InputBoolean;

        public hookCalls: boolean[] = [];
        public _propWithSetter?: string;

        public get propWithSetter(): InputBoolean {
            return isNotNil(this._propWithSetter)
                ? `${this._propWithSetter} - from getter`
                : undefined;
        }

        @Input()
        @AttributeBoolean()
        public set propWithSetter(value: InputBoolean) {
            this._propWithSetter = `propWithSetter: ${value}`;
        }

        @Input()
        @AttributeBoolean()
        public set hookProp(value: InputBoolean) {
            this.hookCalls.push(value as boolean);
        }
    }

    @Component({
        selector: 'host-component',
        imports: [ChildComponent],
        template: `
            <child-component
                #simpleProp
                prop
            ></child-component>
            <child-component #noProp></child-component>
            <child-component
                #emptyStringProp
                prop=""
            ></child-component>
            <child-component
                #filledStringProp
                prop="val"
            ></child-component>
            <child-component
                #falseStringProp
                prop="false"
            ></child-component>
            <child-component
                #dynamicProp
                [prop]="propValue()"
            ></child-component>
            <child-component
                #setterProp
                propWithSetter
            ></child-component>
            <child-component
                #hookProp
                hookProp
            ></child-component>
            <child-component
                #dynamicSetterProp
                [hookProp]="propValue()"
                [propWithSetter]="propValue()"
            ></child-component>
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class HostComponent {
        @ViewChild('simpleProp')
        declare public simplePropRef: ChildComponent;

        @ViewChild('noProp')
        declare public noPropRef: ChildComponent;

        @ViewChild('emptyStringProp')
        declare public emptyStringPropRef: ChildComponent;

        @ViewChild('filledStringProp')
        declare public filledStringPropRef: ChildComponent;

        @ViewChild('falseStringProp')
        declare public falseStringPropRef: ChildComponent;

        @ViewChild('dynamicProp')
        declare public dynamicPropRef: ChildComponent;

        @ViewChild('setterProp')
        declare public setterPropRef: ChildComponent;

        @ViewChild('hookProp')
        declare public hookPropRef: ChildComponent;

        @ViewChild('dynamicSetterProp')
        declare public dynamicSetterPropRef: ChildComponent;

        public propValue = signal<unknown>(false);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, HostComponent, ChildComponent],
        }).compileComponents();
        hostFixture = TestBed.createComponent(HostComponent);
        host = hostFixture.componentInstance;
    });

    it('should correct convert html boolean value', () => {
        hostFixture.detectChanges();

        expect(host.simplePropRef.prop).toBe(true);
        expect(host.simplePropRef.propWithSetter).toBeUndefined();
        expect(host.simplePropRef.hookCalls).toEqual([]);
        expect(host.noPropRef.prop).toBe(false);
        expect(host.emptyStringPropRef.prop).toBe(true);
        expect(host.filledStringPropRef.prop).toBe(true);
        expect(host.falseStringPropRef.prop).toBe(false);
        expect(host.setterPropRef._propWithSetter).toBe('propWithSetter: true');
        expect(host.setterPropRef.propWithSetter).toBe(
            'propWithSetter: true - from getter',
        );
        expect(host.setterPropRef.prop).toBe(false);
        expect(host.hookPropRef.hookCalls).toEqual([true]);

        const inputs = [false, true, '', ' ', 'val', 'false', {}, 0, undefined, null];
        const expectingValues = [
            false,
            true,
            true,
            true,
            true,
            false,
            true,
            false,
            false,
            false,
        ];
        const receivedValues: InputBoolean[] = inputs.map((input) => {
            host.propValue.set(input);
            hostFixture.detectChanges();

            return host.dynamicPropRef.prop;
        });

        expect(expectingValues).toEqual(receivedValues);
        expect(expectingValues).toEqual(host.dynamicSetterPropRef.hookCalls);
        expect(host.dynamicSetterPropRef._propWithSetter).toBe('propWithSetter: false');
        expect(host.dynamicSetterPropRef.propWithSetter).toBe(
            'propWithSetter: false - from getter',
        );
    });
});
