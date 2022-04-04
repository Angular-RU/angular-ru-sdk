import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { TrimInputModule } from '@angular-ru/cdk/directives';
import { Any, Nullable } from '@angular-ru/cdk/typings';
import { NgxMaskModule } from 'ngx-mask';

describe('[TEST]: Trim Input', () => {
    let fixture: Nullable<ComponentFixture<NgModelTestComponent>> = null;
    let component: Nullable<NgModelTestComponent> = null;
    let debugElement: Nullable<DebugElement> = null;

    @Component({
        selector: 'test',
        template: `
            <input matInput type="text" trimInput mask="0000-0000-0000-0000" [(ngModel)]="value" />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class NgModelTestComponent {
        public value: Any = 1234000022220000;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, MatInputModule, TrimInputModule, NgxMaskModule.forRoot()],
            providers: [{ provide: MATERIAL_SANITY_CHECKS, useValue: false }],
            declarations: [NgModelTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NgModelTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with ngModel', () => {
        expect(component?.value).toBe(1234000022220000);
        expect(debugElement.nativeElement.value).toBe('1234-0000-2222-0000');

        debugElement.nativeElement.value = '\t  1234000033330000   ';
        debugElement.triggerEventHandler('input', {
            target: debugElement.nativeElement
        });
        debugElement.triggerEventHandler('blur', {
            target: debugElement.nativeElement
        });

        fixture.detectChanges();

        expect(component?.value).toBe(1234000033330000);
        expect(debugElement.nativeElement.value).toBe('1234-0000-3333-0000');
    });
});
