import {ChangeDetectionStrategy, Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {BrowserModule, By} from '@angular/platform-browser';
import {TrimInputModule} from '@angular-ru/cdk/directives';
import {Nullable} from '@angular-ru/cdk/typings';
import {isNotNil} from '@angular-ru/cdk/utils';
import {NgxMaskDirective, provideEnvironmentNgxMask} from 'ngx-mask';

describe('[TEST]: Trim Input', () => {
    let fixture: Nullable<ComponentFixture<NgModelTestComponent>> = null;
    let component: Nullable<NgModelTestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        standalone: true,
        selector: 'test',
        imports: [NgxMaskDirective, MatInput, TrimInputModule, FormsModule],
        template: `
            <input
                mask="0000-0000-0000-0000"
                matInput
                trimInput
                type="text"
                [(ngModel)]="value"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class NgModelTestComponent {
        public value: any = 1234000022220000;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, TrimInputModule, NgModelTestComponent],
            providers: [provideEnvironmentNgxMask()],
        }).compileComponents();

        fixture = TestBed.createComponent(NgModelTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with ngModel', () => {
        expect(component?.value).toBe(1234000022220000);
        expect(debugElement?.nativeElement.value).toBe('1234-0000-2222-0000');

        if (isNotNil(debugElement)) {
            debugElement.nativeElement.value = '\t  1234000033330000   ';
        }

        debugElement?.triggerEventHandler('input', {
            target: debugElement?.nativeElement,
        });
        debugElement?.triggerEventHandler('blur', {
            target: debugElement.nativeElement,
        });

        fixture?.detectChanges();

        expect(component?.value).toBe(1234000033330000);
        expect(debugElement?.nativeElement.value).toBe('1234-0000-3333-0000');
    });
});
