import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrimInputModule } from '@angular-ru/common/directives';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { Any } from '@angular-ru/common/typings';

describe('[TEST]: Trim Input', () => {
    let fixture: ComponentFixture<NgModelTestComponent> | null = null;
    let component: NgModelTestComponent | null = null;
    let debugElement: DebugElement | null = null;

    @Component({
        selector: 'test',
        template: ` <input matInput type="text" [(ngModel)]="value" trimInput mask="0000-0000-0000-0000" /> `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
    class NgModelTestComponent {
        public value: Any = 1234000022220000;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule, MatInputModule, TrimInputModule, NgxMaskModule.forRoot()],
            declarations: [NgModelTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgModelTestComponent);
        component = fixture.componentInstance;
        fixture.autoDetectChanges();
        debugElement = fixture?.debugElement.query(By.css('input'));
    });

    it('correct sync modelView with ngModel', () => {
        expect(component?.value).toEqual(1234000022220000);
        expect(debugElement!.nativeElement.value).toEqual('1234-0000-2222-0000');

        debugElement!.nativeElement.value = '\t  1234000033330000   ';
        debugElement!.triggerEventHandler('input', {
            target: debugElement!.nativeElement
        });
        debugElement!.triggerEventHandler('blur', {
            target: debugElement!.nativeElement
        });

        fixture!.detectChanges();

        expect(component?.value).toEqual(1234000033330000);
        expect(debugElement!.nativeElement.value).toEqual('1234-0000-3333-0000');
    });
});
