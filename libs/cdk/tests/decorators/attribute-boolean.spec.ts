import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';
import { isNotNil } from '@angular-ru/cdk/utils';

describe('[TEST]: Attribute boolean', () => {
    let hostFixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    @Component({
        selector: 'child-component',
        template: ''
    })
    class ChildComponent {
        @Input()
        @AttributeBoolean()
        public prop: InputBoolean;

        public hookCalls: boolean[] = [];
        public _propWithSetter?: string;

        public get propWithSetter(): InputBoolean {
            return isNotNil(this._propWithSetter) ? `${this._propWithSetter} - from getter` : undefined;
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

        template: `
            <child-component #simpleProp prop></child-component>
            <child-component #noProp></child-component>
            <child-component #emptyStringProp prop=""></child-component>
            <child-component #filledStringProp prop="val"></child-component>
            <child-component #falseStringProp prop="false"></child-component>
            <child-component #dynamicProp [prop]="propValue"></child-component>
            <child-component #setterProp propWithSetter></child-component>
            <child-component #hookProp hookProp></child-component>
            <child-component #dynamicSetterProp [hookProp]="propValue" [propWithSetter]="propValue"></child-component>
        `
    })
    class HostComponent {
        @ViewChild('simpleProp') public declare simplePropRef: ChildComponent;
        @ViewChild('noProp') public declare noPropRef: ChildComponent;
        @ViewChild('emptyStringProp') public declare emptyStringPropRef: ChildComponent;
        @ViewChild('filledStringProp') public declare filledStringPropRef: ChildComponent;
        @ViewChild('falseStringProp') public declare falseStringPropRef: ChildComponent;
        @ViewChild('dynamicProp') public declare dynamicPropRef: ChildComponent;
        @ViewChild('setterProp') public declare setterPropRef: ChildComponent;
        @ViewChild('hookProp') public declare hookPropRef: ChildComponent;
        @ViewChild('dynamicSetterProp') public declare dynamicSetterPropRef: ChildComponent;
        public propValue: any = false;
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [HostComponent, ChildComponent]
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
        expect(host.setterPropRef.propWithSetter).toBe('propWithSetter: true - from getter');
        expect(host.setterPropRef.prop).toBe(false);
        expect(host.hookPropRef.hookCalls).toEqual([true]);

        const inputs = [false, true, '', ' ', 'val', 'false', {}, 0, undefined, null];
        const expectingValues = [false, true, true, true, true, false, true, false, false, false];
        const receivedValues: InputBoolean[] = inputs.map((input) => {
            host.propValue = input;
            hostFixture.detectChanges();

            return host.dynamicPropRef.prop;
        });

        expect(expectingValues).toEqual(receivedValues);
        expect(expectingValues).toEqual(host.dynamicSetterPropRef.hookCalls);
        expect(host.dynamicSetterPropRef._propWithSetter).toBe('propWithSetter: false');
        expect(host.dynamicSetterPropRef.propWithSetter).toBe('propWithSetter: false - from getter');
    });
});
