import {CommonModule} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    signal,
    viewChild,
} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlValueInterceptor} from '@angular-ru/cdk/forms';

import {AutoSplitDirective, TrimDirective} from './helpers/sync-control-directives';

describe('sync control value interceptor', () => {
    let fixture: ComponentFixture<SyncInterceptorTestComponent>;
    let component: SyncInterceptorTestComponent;

    @Component({
        standalone: false,
        selector: 'sync-test',
        template: `
            @if (enableControl()) {
                <input
                    #ngModelInputElement
                    trim
                    [autoSplit]="enableAutoSplit()"
                    [(ngModel)]="value"
                />
            }
            <input
                #formControlInputElement
                autoSplit
                trim
                [formControl]="formControl"
            />
            <form [formGroup]="formGroup">
                <input
                    #formGroupControlA
                    autoSplit
                    formControlName="controlA"
                    trim
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
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class SyncInterceptorTestComponent {
        public readonly inputElementRef =
            viewChild.required<ElementRef<HTMLInputElement>>('ngModelInputElement');

        public readonly formControlInputElementRef = viewChild.required<
            ElementRef<HTMLInputElement>
        >('formControlInputElement');

        public readonly formGroupControlARef =
            viewChild.required<ElementRef<HTMLInputElement>>('formGroupControlA');

        public readonly formGroupControlBRef =
            viewChild.required<ElementRef<HTMLInputElement>>('formGroupControlB');

        public readonly formGroupControlCRef =
            viewChild.required<ElementRef<HTMLInputElement>>('formGroupControlC');

        public interceptor = viewChild.required('ngModelInputElement', {
            read: ControlValueInterceptor,
        });

        public enableAutoSplit = signal(true);
        public enableControl = signal(true);

        public value = signal<string[]>(['value1', 'value2']);
        public formControl = new FormControl(['valueA', 'valueB']);
        public formGroup = new FormGroup({
            controlA: new FormControl([
                'control_valueA',
                'control_valueB',
                'control_valueC',
            ]),
            controlB: new FormControl('text, control'),
            controlC: new FormControl('text_c, control_c'),
        });
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TrimDirective,
                AutoSplitDirective,
                SyncInterceptorTestComponent,
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
        }).compileComponents();
        fixture = TestBed.createComponent(SyncInterceptorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should trim and split view value on TDF until detach and work after reattach', fakeAsync(async () => {
        // interceptor is attached
        expect(component.inputElementRef().nativeElement.value).toBe('value1, value2');

        component.inputElementRef().nativeElement.value = '    value3,value4    ';
        component.inputElementRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.value()).toStrictEqual(['value3', 'value4']);

        component.value.set(['down1', 'down2']);
        fixture.detectChanges();
        component.inputElementRef().nativeElement.value = 'down1, down2';

        // detaching interceptor
        component.enableAutoSplit.set(false);
        fixture.detectChanges();

        component.inputElementRef().nativeElement.value = '    value5,value6    ';
        component.inputElementRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.value()).toBe('value5,value6');

        component.value.set(['down3', 'down4']);
        fixture.detectChanges();
        component.inputElementRef().nativeElement.value = 'down3,down4';

        // reattaching interceptor
        component.enableAutoSplit.set(true);
        fixture.detectChanges();

        component.inputElementRef().nativeElement.value = '    value7,value8    ';
        component.inputElementRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.value()).toEqual(['value7', 'value8']);

        component.value.set(['down5', 'down6']);
        fixture.detectChanges();
        component.inputElementRef().nativeElement.value = 'down5, down6';
    }));

    it('should trim and split view value on Reactive FormControl', fakeAsync(async () => {
        expect(component.formControlInputElementRef().nativeElement.value).toBe(
            'valueA, valueB',
        );

        component.formControlInputElementRef().nativeElement.value =
            '    valueC,valueD    ';

        component
            .formControlInputElementRef()
            .nativeElement.dispatchEvent(new Event('input'));

        expect(component.formControl.value).toEqual(['valueC', 'valueD']);

        // check on blur
        expect(component.formControlInputElementRef().nativeElement.value).toBe(
            '    valueC,valueD    ',
        );

        component
            .formControlInputElementRef()
            .nativeElement.dispatchEvent(new Event('blur'));

        expect(component.formControlInputElementRef().nativeElement.value).toBe(
            'valueC,valueD',
        );
        expect(component.formControl.value).toEqual(['valueC', 'valueD']);
    }));

    it('should trim and split view value on Reactive FormGroup', fakeAsync(async () => {
        expect(component.formGroupControlARef().nativeElement.value).toBe(
            'control_valueA, control_valueB, control_valueC',
        );
        expect(component.formGroupControlBRef().nativeElement.value).toBe(
            'text, control',
        );

        component.formGroupControlARef().nativeElement.value =
            '    control_valueD,control_valueE,control_valueF    ';
        component.formGroupControlARef().nativeElement.dispatchEvent(new Event('input'));

        component.formGroupControlBRef().nativeElement.value = '   text2, control2   ';
        component.formGroupControlBRef().nativeElement.dispatchEvent(new Event('input'));

        component.formGroupControlCRef().nativeElement.value =
            '   text_c1, control_c2   ';
        component.formGroupControlCRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.formGroup.value).toEqual({
            controlA: ['control_valueD', 'control_valueE', 'control_valueF'],
            controlB: '   text2, control2   ',
            controlC: 'text_c1, control_c2',
        });
    }));

    it('should trim and split until detach', fakeAsync(async () => {
        expect(component.inputElementRef().nativeElement.value).toBe('value1, value2');

        component.inputElementRef().nativeElement.value = '    value3,value4    ';
        component.inputElementRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.value()).toEqual(['value3', 'value4']);
    }));

    it('should unsubscribe after ngOnDestroy', () => {
        expect(component.inputElementRef().nativeElement.value).toBe('value1, value2');
        expect(component.interceptor().constructor).toBe(ControlValueInterceptor);

        component.interceptor().ngOnDestroy();

        // values does not pass
        component.inputElementRef().nativeElement.value = '    value3,value4    ';
        component.inputElementRef().nativeElement.dispatchEvent(new Event('input'));

        expect(component.value()).toBe('    value3,value4    ');

        // another value interceptor still works
        expect(component.formControlInputElementRef().nativeElement.value).toBe(
            'valueA, valueB',
        );

        component.formControlInputElementRef().nativeElement.value =
            '    valueC,valueD    ';
        component
            .formControlInputElementRef()
            .nativeElement.dispatchEvent(new Event('input'));

        expect(component.formControl.value).toEqual(['valueC', 'valueD']);
    });
});
