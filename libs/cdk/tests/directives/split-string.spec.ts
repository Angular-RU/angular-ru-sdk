import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    ViewChild,
} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SplitString, SplitStringOptions} from '@angular-ru/cdk/directives';

describe('[TEST]: Trim Input', function () {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let inputElement: HTMLInputElement;
    let tdfInputElement: HTMLInputElement;
    let textAreaElement: HTMLTextAreaElement;

    @Component({
        selector: 'test',
        imports: [FormsModule, ReactiveFormsModule, SplitString],
        template: `
            <form [formGroup]="form">
                <textarea
                    #textAreaElement
                    formControlName="textarea"
                    splitString
                    type="text"
                    [splitOptions]="splitStringOptions"
                ></textarea>
                <input
                    #inputElement
                    formControlName="input"
                    splitString
                    type="text"
                    [splitOptions]="splitStringOptions"
                />
            </form>
            <input
                #tdfInputElement
                splitString
                type="text"
                [splitOptions]="splitStringOptions"
                [(ngModel)]="list"
            />
        `,
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
    class TestComponent {
        private readonly fb = inject(FormBuilder);

        @ViewChild('textAreaElement')
        public textAreaElement!: ElementRef<HTMLTextAreaElement>;

        @ViewChild('inputElement')
        public inputElement!: ElementRef<HTMLInputElement>;

        @ViewChild('tdfInputElement')
        public tdfInputElement!: ElementRef<HTMLInputElement>;

        public splitStringOptions?: Partial<SplitStringOptions>;
        public form = this.fb.group<{
            textarea: string | null;
            input: Array<number | string> | null;
        }>({
            textarea: null,
            input: null,
        });

        public list?: string[];
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, TestComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        inputElement = component.inputElement.nativeElement;
        tdfInputElement = component.tdfInputElement.nativeElement;
        textAreaElement = component.textAreaElement.nativeElement;
    });

    it('should intercept split and join form group value', async () => {
        component.form.patchValue({input: null});

        expect(inputElement.value).toBe('');

        component.form.patchValue({input: [1, 'hey']});

        expect(inputElement.value).toBe('1, hey');

        expect(tdfInputElement.value).toBe('');

        component.list = ['first', 'second'];
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tdfInputElement.value).toBe('first, second');

        tdfInputElement.value = 'third, fourth';
        tdfInputElement.dispatchEvent(new Event('input'));

        expect(component.list).toEqual(['third', 'fourth']);

        component.splitStringOptions = {joinWith: '/'};
        fixture.detectChanges();

        component.form.patchValue({input: ['on', 'off']});

        expect(inputElement.value).toBe('on/off');

        inputElement.value = ' ';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.form.value.input).toEqual([]);

        inputElement.value = 'one, two, three';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.form.value.input).toEqual(['one', 'two', 'three']);

        inputElement.value = '';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.form.value.input).toEqual([]);

        inputElement.value = 'four ,   five;six\nseven';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.form.value.input).toEqual(['four', 'five', 'sixseven']);

        textAreaElement.value = 'four ,   five;six\nseven';
        textAreaElement.dispatchEvent(new Event('input'));

        expect(component.form.value.textarea).toEqual(['four', 'five', 'six', 'seven']);

        component.splitStringOptions = {separator: ';'};
        fixture.detectChanges();

        inputElement.value = 'four ,   five;six\nseven';
        inputElement.dispatchEvent(new Event('input'));

        expect(component.form.value.input).toEqual(['four ,   five', 'sixseven']);

        textAreaElement.value = 'four ,   five;six\nseven';
        textAreaElement.dispatchEvent(new Event('input'));

        expect(component.form.value.textarea).toEqual(['four ,   five', 'six\nseven']);
    });
});
