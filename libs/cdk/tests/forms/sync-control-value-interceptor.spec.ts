import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlValueInterceptor } from '@angular-ru/cdk/forms';

import { AutoSplitDirective, TrimDirective } from './helpers/sync-control-directives';

describe('sync control value interceptor', () => {
    let fixture: ComponentFixture<SyncInterceptorTestComponent>;
    let component: SyncInterceptorTestComponent;

    @Component({
        selector: 'sync-test',
        template: `
            <input
                *ngIf="enableControl"
                #ngModelInputElement
                trim
                [autoSplit]="enableAutoSplit"
                [(ngModel)]="value"
            />
            <input
                #formControlInputElement
                trim
                autoSplit
                [formControl]="formControl"
            />
            <form [formGroup]="formGroup">
                <input
                    #formGroupControlA
                    formControlName="controlA"
                    trim
                    autoSplit
                />
                <input
                    #formGroupControlB
                    formControlName="controlB"
                />
                <input
                    #formGroupControlC
                    formControlName="controlC"
                    trim
                />
            </form>
        `
    })
    class SyncInterceptorTestComponent {
        @ViewChild('ngModelInputElement') public readonly inputElementRef!: ElementRef<HTMLInputElement>;
        @ViewChild('formControlInputElement') public readonly formControlInputElementRef!: ElementRef<HTMLInputElement>;
        @ViewChild('formGroupControlA') public readonly formGroupControlARef!: ElementRef<HTMLInputElement>;
        @ViewChild('formGroupControlB') public readonly formGroupControlBRef!: ElementRef<HTMLInputElement>;
        @ViewChild('formGroupControlC') public readonly formGroupControlCRef!: ElementRef<HTMLInputElement>;
        @ViewChild('ngModelInputElement', { read: ControlValueInterceptor })
        public interceptor!: ControlValueInterceptor;

        public enableAutoSplit: boolean = true;
        public enableControl: boolean = true;

        public value: string[] = ['value1', 'value2'];
        public formControl = new FormControl(['valueA', 'valueB']);
        public formGroup = new FormGroup({
            controlA: new FormControl(['control_valueA', 'control_valueB', 'control_valueC']),
            controlB: new FormControl('text, control'),
            controlC: new FormControl('text_c, control_c')
        });
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TrimDirective, AutoSplitDirective, SyncInterceptorTestComponent],
            imports: [CommonModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();
        fixture = TestBed.createComponent(SyncInterceptorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should trim and split view value on TDF until detach and work after reattach', fakeAsync(async () => {
        // interceptor is attached
        expect(component.inputElementRef.nativeElement.value).toBe('value1, value2');

        component.inputElementRef.nativeElement.value = '    value3,value4    ';
        component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.value).toEqual(['value3', 'value4']);
        component.value = ['down1', 'down2'];
        fixture.detectChanges();
        component.inputElementRef.nativeElement.value = 'down1, down2';

        // detaching interceptor
        component.enableAutoSplit = false;
        fixture.detectChanges();

        component.inputElementRef.nativeElement.value = '    value5,value6    ';
        component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.value).toBe('value5,value6');
        component.value = ['down3', 'down4'];
        fixture.detectChanges();
        component.inputElementRef.nativeElement.value = 'down3,down4';

        // reattaching interceptor
        component.enableAutoSplit = true;
        fixture.detectChanges();

        component.inputElementRef.nativeElement.value = '    value7,value8    ';
        component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.value).toEqual(['value7', 'value8']);
        component.value = ['down5', 'down6'];
        fixture.detectChanges();
        component.inputElementRef.nativeElement.value = 'down5, down6';
    }));

    it('should trim and split view value on Reactive FormControl', fakeAsync(async () => {
        expect(component.formControlInputElementRef.nativeElement.value).toBe('valueA, valueB');
        component.formControlInputElementRef.nativeElement.value = '    valueC,valueD    ';

        component.formControlInputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.formControl.value).toEqual(['valueC', 'valueD']);

        // check on blur
        expect(component.formControlInputElementRef.nativeElement.value).toBe('    valueC,valueD    ');
        component.formControlInputElementRef.nativeElement.dispatchEvent(new Event('blur'));
        expect(component.formControlInputElementRef.nativeElement.value).toBe('valueC,valueD');
        expect(component.formControl.value).toEqual(['valueC', 'valueD']);
    }));

    it('should trim and split view value on Reactive FormGroup', fakeAsync(async () => {
        expect(component.formGroupControlARef.nativeElement.value).toBe(
            'control_valueA, control_valueB, control_valueC'
        );
        expect(component.formGroupControlBRef.nativeElement.value).toBe('text, control');

        component.formGroupControlARef.nativeElement.value = '    control_valueD,control_valueE,control_valueF    ';
        component.formGroupControlARef.nativeElement.dispatchEvent(new Event('input'));

        component.formGroupControlBRef.nativeElement.value = '   text2, control2   ';
        component.formGroupControlBRef.nativeElement.dispatchEvent(new Event('input'));

        component.formGroupControlCRef.nativeElement.value = '   text_c1, control_c2   ';
        component.formGroupControlCRef.nativeElement.dispatchEvent(new Event('input'));

        expect(component.formGroup.value).toEqual({
            controlA: ['control_valueD', 'control_valueE', 'control_valueF'],
            controlB: '   text2, control2   ',
            controlC: 'text_c1, control_c2'
        });
    }));

    it('should trim and split until detach', fakeAsync(async () => {
        expect(component.inputElementRef.nativeElement.value).toBe('value1, value2');

        component.inputElementRef.nativeElement.value = '    value3,value4    ';
        component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));

        expect(component.value).toEqual(['value3', 'value4']);
    }));

    it('should unsubscribe after ngOnDestroy', () => {
        expect(component.inputElementRef.nativeElement.value).toBe('value1, value2');
        expect(component.interceptor.constructor).toBe(ControlValueInterceptor);

        component.interceptor.ngOnDestroy();

        // values does not pass
        component.inputElementRef.nativeElement.value = '    value3,value4    ';
        component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.value).toBe('    value3,value4    ');

        // another value interceptor still works
        expect(component.formControlInputElementRef.nativeElement.value).toBe('valueA, valueB');
        component.formControlInputElementRef.nativeElement.value = '    valueC,valueD    ';
        component.formControlInputElementRef.nativeElement.dispatchEvent(new Event('input'));
        expect(component.formControl.value).toEqual(['valueC', 'valueD']);
    });
});
