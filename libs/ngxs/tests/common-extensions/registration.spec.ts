import { Component, Injectable, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Any } from '@angular-ru/cdk/typings';
import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { NgxsModule, Select, State, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

describe('check correct deep instance', () => {
    let component: AppComponent;
    let store: Store;
    let fixture: ComponentFixture<AppComponent>;

    interface IFormState {
        dirty?: boolean;
        model: Any;
    }

    class FormState {
        public dirty?: boolean = false;
        public model: Any = undefined;
    }

    interface IRegistrationStateModel {
        address: IFormState;
    }

    class RegistrationStateModel {
        public address: FormState = new FormState();
    }

    @StateRepository()
    @State<IRegistrationStateModel>({
        name: 'registration',
        defaults: new RegistrationStateModel()
    })
    @Injectable()
    class RegistrationState extends NgxsImmutableDataRepository<IRegistrationStateModel> {
        @Select((state: Any) => state.registration) public address$!: Observable<IFormState>;

        @DataAction()
        public addAddress(address: IFormState): Any {
            return this.ctx.setState(() => ({ address }));
        }
    }

    @Component({
        selector: 'my-app',
        template: ''
    })
    class AppComponent implements OnInit {
        public name = 'Angular + NGXS';
        public result: Any = null;

        constructor(private readonly registration: RegistrationState) {}

        public ngOnInit() {
            this.result = this.registration.addAddress({ dirty: true, model: { hello: 'world' } });
        }
    }

    beforeAll(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([RegistrationState], { developmentMode: true }),
                NgxsDataPluginModule.forRoot()
            ],
            declarations: [AppComponent]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
    });

    it('should be correct ngOnInit', () => {
        expect(component.name).toBe('Angular + NGXS');
        expect(store.snapshot()).toEqual({ registration: { address: { dirty: false } } });

        component.ngOnInit();

        expect(store.snapshot()).toEqual({ registration: { address: { dirty: true, model: { hello: 'world' } } } });
        expect(component.result).toBeUndefined();
    });
});
