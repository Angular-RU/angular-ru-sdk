import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttributeBoolean } from '@angular-ru/common/decorators';
import { Any } from '@angular-ru/common/typings';

describe('[TEST]: Attribute boolean', () => {
    let hostFixture: ComponentFixture<HostComponent>;
    let host: HostComponent;

    @Component({
        selector: 'child-component',
        template: ''
    })
    class ChildComponent {
        @AttributeBoolean() @Input() public prop!: boolean | string;
    }

    @Component({
        selector: 'host-component',
        template: `
            <child-component #simpleProp prop></child-component>
            <child-component #noProp></child-component>
            <child-component #emptyStringProp prop=""></child-component>
            <child-component #filledStringProp prop="val"></child-component>
            <child-component #dynamicProp [prop]="propValue"></child-component>
        `
    })
    class HostComponent {
        @ViewChild('simpleProp') public simplePropRef!: ChildComponent;
        @ViewChild('noProp') public noPropRef!: ChildComponent;
        @ViewChild('emptyStringProp') public emptyStringPropRef!: ChildComponent;
        @ViewChild('filledStringProp') public filledStringPropRef!: ChildComponent;
        @ViewChild('dynamicProp') public dynamicPropRef!: ChildComponent;
        public propValue: Any = false;
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
        expect(host.noPropRef.prop).toBe(false);
        expect(host.emptyStringPropRef.prop).toBe(true);
        expect(host.filledStringPropRef.prop).toBe(true);

        host.propValue = false;
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(false);

        host.propValue = true;
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(true);

        host.propValue = '';
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(true);

        host.propValue = 'val';
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(true);

        host.propValue = 0;
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(false);

        host.propValue = undefined;
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(false);

        host.propValue = null;
        hostFixture.detectChanges();
        expect(host.dynamicPropRef.prop).toBe(false);
    });
});
